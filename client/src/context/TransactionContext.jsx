import React from "react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import { contractABI, contractAddress } from "../utils/constants";

export const TransactionContext = React.createContext();

const { ethereum } = window;

// function to fetch our ethereum
const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
    );
    // Đây là 3 tham số cần để fetch contract
    // contractAddress: khi deploy the project
    // contractABI: json file
    // signer được tạo từ provider

    return transactionContract;
};

export const TransactionProvider = ({ children }) => {
    //
    const [currentAccount, setCurrentAccount] = useState("");

    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyword: "",
        message: "",
    });
    //
    const [isLoading, setIsLoading] = useState(false);
    //
    const [transactionCount, setTransactionCount] = useState(
        localStorage.getItem("transactionCount")
    );
    //
    const [transactions, setTransactions] = useState([])

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    };

    const getAllTransactions = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");
            const transactionContract = getEthereumContract();

            const availableTransactions = await transactionContract.getAllTransactions()

            const structuredTransactions = availableTransactions.map((transaction, index) => ({

                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
                message: transaction.message,
                keyword: transaction.keyword,
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))
            console.log(structuredTransactions);

            setTransactions(structuredTransactions);
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                getAllTransactions();
            } else {
                console.log("No accounts found");
            }
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");
            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
            });

            setCurrentAccount(accounts[0]);
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    };

    const checkIfTransactionsExist = async () => {
        try {
            const transactionContract = getEthereumContract();

            const transactionCount = await transactionContract.getTransactionCount();

            window.localStorage.setItem("transactionCount", transactionCount)

        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    }

    const sendTransaction = async () => {
        try {
            if (!ethereum) return alert("Please install Metamask");

            // get the data from the form
            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();

            // Dùng biến transactionContract để call những hàm có liên quan đến contract
            // Gửi giao dịch đầu tiên qua blockchain
            // Tất cả các value được gửi dưới dạng hexa, cho nên phải quy đổi ra (hexa to decimal)
            // Cả value gửi đi cũng phải chuyển sang gwei

            const parseAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [
                    {
                        from: currentAccount,
                        to: addressTo,
                        gas: "0x5208", // 21000 gwei // hex
                        value: parseAmount._hex,
                    },
                ],
            });
            // Đây chỉ là send ethereum từ address này sang address khác. Chúng ta phải add nó vào block chain nữa, để lưu trữ những transaction đã xảy ra
            const transactionHash = await transactionContract.addToBlockchain(
                addressTo,
                parseAmount,
                message,
                keyword
            );

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);

            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionCount();

            setTransactionCount(transactionCount.toNumber());
            window.location.reload();
        } catch (error) {
            console.log(error);
            throw new Error("No ethereum object.");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected();
        checkIfTransactionsExist();
        return () => { };
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                formData,
                handleChange,
                sendTransaction,
                isLoading,
                transactions
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
};
