# ATM CLI SIMULATOR

This is a Command Line Interface (CLI) that simulates an interaction with an ATM (Automated Teller Machine) for a retail bank.

## 🚀 Features

- User authentication (Login & Logout)
- Deposit, Withdraw, and Transfer funds
- Check account balance
- View transaction history with filtering options

## 📌 Prerequisites

Ensure you have the following installed:

- Node.js (latest LTS version recommended)

## 📥 Installation

- Clone the repository

```bash
git clone https://github.com/arisculala/atm-cli-nodejs.git
cd atm-cli-nodejs
```

- Install dependencies

```bash
npm install
```

## ▶️ How to Run

- Run the following command to start the ATM CLI:

```bash
npm run start
```

You will see a welcome message and a prompt ($) for entering commands.

## 📌 How to Run Tests

This project uses Jest for unit testing. Follow these steps to run the tests:

- If you haven’t installed dependencies yet, run:

```bash
npm install
```

- To execute all tests, run:

```bash
npm test

OR

npm run test
```

## 📝 Usage Guide

Available Commands
| Command | Description |
| -------------------------- | -------------------------- |
| login [name] | Logs in as a user (creates an account if it doesn’t exist). |
| logout | Logs out of the current session. |
| deposit [amount] | Deposits money into the logged-in account. |
| withdraw [amount] | Withdraws money from the account. |
| transfer [target] [amount] | Transfers money to another user. |
| balance | Displays the current balance. |
| transactions [type_optional] | Shows transaction history (optional filter: deposit, withdraw, transfer, etc.). |
| exit | Exits the ATM CLI. |
| help | Displays available commands. |

## 📌 Example Usage

```bash
==============================================================
  Welcome to the ATM CLI. Type 'help' for available commands.
==============================================================

$ login jhon

Hello, jhon!
Your balance is $0

$ deposit 1000

Your balance is $1000

$ withdraw 99

Withdrew $99. New balance: $901

$ logout

Goodbye, jhon!

$ login mary

Hello, mary!
Your balance is $0

$ logout

Goodbye, mary!
```

## 📂 Project Structure

```bash
atm-cli-nodejs/
│── __tests__/
│   ├── atm.service.test.js
│   ├── auth.service.test.js
│   ├── transaction.model.test.js
│   ├── user.model.test.js
│── models/
│   ├── user.model.js
│   ├── transaction.model.js
│── services/
│   ├── atm.service.js
│   ├── auth.service.js
│── index.js
│── README.md
│── package.json
```

## 📜 License

This project is open-source and available under the MIT License.
