/*
================SETUP DỰ ÁN==================
CLIENT

CÀI ĐẶT VITE:
    - npm init vite@latest
    - project name: ./ (./ vì name đó mình đã tạo ra rồi)
    - Chọn framwork
    - npm install
    - npm run dev

CÀI ĐẶT TAILWIND:
    - npm install -D tailwindcss postcss autoprefixer
    - npx tailwindcss init -p

    @tailwind base;
    @tailwind components;
    @tailwind utilities;

SMART_CONTRACT

TẠO 1 PACKAGE EMPTY:
    - npm init -y

KHÁC BIỆT GIỮA JS vs JSX:
    - jsx chỉ có nghĩa là chúng ta sẽ viết mã jsx (react code) bên trong file đó, nó không tạo ra bất kỳ sự khác biệt nào

CÀI ĐẶT THƯ VIỆN:
    - npm install react-icons --save
    - npm install ethers

BACKEND PACKAGES:
    - npm install --save-dev hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers ethers
    - Tiếp theo: npx hardhat
    - Để kiểm tra tất cả chạy đúng: npx hardhat test

    - Trong folder contract tạo file solidity. Để deploy được nó thì trong folder scripts hãy chỉnh sửa thành deploy.js
    - Muốn deploy thì cần phải có phí gas, do phải trong metamask phải có tiền

SỬ DỤNG ALCHEMY.COM ĐỂ DEPLOY:
    - alchemy.com giúp chúng ta deploy blockchain smartcontract
    - Để deploy cần 3 cái:
        - 1 là config file (trong file config cần key của alchemy và private key của metamask, private này được chứa trong mảng accounts có thêm s đằng sau)
        - 2 là file solidity
        - 3 là file scripts deploy smart contract

    -> Sau đó sử dụng câu lệnh: npx hardhat run scripts/deploy.js --network rinkeby để chạy
    -> Sau khi chạy xong nó sẽ cho ra 1 address to:
        Transactions deployed to: 0xD5d96400d9fDEc48A615D1ba6DedE20a38593a67

    - Sau khi chạy xong nó không chỉ trả về address mà còn nhiều thứ khác nữa. Đó là trong folder artifacts -> contracts -> transactions -> transactions.json là abi

    - abi là giao diện nhị phân ứng dụng hợp đồng, đó là cách tiêu chuẩn để tương tác với các hợp đồng trong hệ sinh thái ethereum cả từ bên ngoài blockchain và cho các tương tác hợp đồng với hợp đồng, nó chứa mọi thông tin liên về smart contract
    - Sau đó chúng ta sẽ copy toàn bộ cái này sau đó vào client trong folder util tạo file transaction.json và dán vào

TẠO CONTEXT:
    - Khi sử dụng metamask, ngoài những cái khác nó còn cung cấp cho bạn đối tượng ethereum
    - window.ethereum trong console log giúp bạn handle mối quan hệ ethereum và blockchain (tất cả những cái này do chúng ta đã download metamask)

    - Tạo function để fetch contract. Để fetch contract cần 3 tham số (contractAddress, contractABI, và signer được tạo từ provider)

commonStylesWelcome.js:
    - const commonStyles = "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";

GẶP LỖI: Internal server error: Cannot find module '@tailwindcss/forms' Require stack:
    - Thì cài: npm install -D @tailwindcss/forms
*/