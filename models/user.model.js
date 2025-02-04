const Big = require("big.js");
const ATMService = require("../services/atm.service");

class User {
  constructor(name, initialBalance = new Big("0.0")) {
    this.name = name;
    this.balance = initialBalance;
    this.transactions = [];
  }

  addTransaction(transaction) {
    this.transactions.push(transaction);
  }

  showTransactions(filterType = null) {
    // filter the transactions by type if filterType is provided
    const transactionsToShow = filterType
    ? this.transactions.filter(transaction => transaction.type === filterType)
    : this.transactions;

    if (transactionsToShow.length === 0) {
      console.log("\nNo transactions found.\n");
      return;s
    }

    console.log("\n");
    console.log("All transactions:");
    transactionsToShow.forEach((transaction, index) => {
      let transactionDetails = `${index + 1}. Type: ${transaction.type}`;

      if ([ATMService.TransactionType.DEPOSIT, 
        ATMService.TransactionType.WITHDRAW, 
        ATMService.TransactionType.TRANSFER].includes(transaction.type))
      {
        transactionDetails += `, Amount: $${transaction.amount}`;
      }
  
      // If transfer transaction, show the recipient
      if (transaction.type === ATMService.TransactionType.TRANSFER && transaction.recipient) {
        transactionDetails += `, Recipient: ${transaction.recipient}`;
      }
  
      const transactionDate = transaction.date || new Date().toLocaleString(); // Use current date if not provided
      transactionDetails += `, Date: ${transactionDate}`;
  
      console.log(transactionDetails);
    });
    console.log("\n");
  }
}

module.exports = User;
