const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");
const ATMService = require("./atm.service");

class AuthService {
  constructor() {
    this.users = [];
    this.currentUser = null;
  }

  /**
   * User login
   * @param {*} username 
   * @returns 
   */
  login(input) {
    if (this.currentUser != null) {
      console.log("\nError: You are currently logged in as " + this.currentUser.name + "\n");
      return;
    }

    const username = input[1];

    let user = this.users.find((u) => u.name.toLowerCase() === username.toLowerCase());
    if (user == null) {
      user = new User(username.toLowerCase(), 0);
      this.users.push(user);
    }

    this.currentUser = user;
    console.log(`\nHello, ${user.name}!`);
    console.log(`Your balance is $${user.balance}\n`);

    this.currentUser.addTransaction(new Transaction(ATMService.TransactionType.LOGIN, 0));

    return user;
  }

  /**
   * User logout
   */
  logout(input) {
    if (!this.currentUser) {
      console.log("\nError: No user is logged in. Please log in first.\n");
      return;
    }

    console.log(`\nGoodbye, ${this.currentUser.name}!\n`);

    this.currentUser.addTransaction(new Transaction(ATMService.TransactionType.LOGOUT, 0));

    this.currentUser = null;

    return;
  }

  /**
   * Check if user logged in
   */
  isLoggedIn() {
    if (!this.currentUser) {
      console.log("\nYou must log in first!\n");
      return false;
    }
    return true;
  }
}

module.exports = AuthService;
