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
    const transactionsToShow = filterType
        ? this.transactions.filter(transaction => transaction.type === filterType)
        : this.transactions;

    if (transactionsToShow.length === 0) {
        console.log("\nNo transactions found.\n");
        return;
    }

    // format transactions for table output
    const tableData = transactionsToShow.map(transaction => ({
      Type: transaction.type || "N/A",
      Amount: transaction.amount ? `$${transaction.amount}` : "-",
      Recipient: transaction.recipient || "-",
      Date: transaction.date ? new Date(transaction.date).toLocaleString() : new Date().toLocaleString()
    }));

    console.table(tableData);
  }
}

module.exports = User;
