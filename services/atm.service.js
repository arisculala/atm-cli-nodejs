const Big = require("big.js");
const Transaction = require("../models/transaction.model");

class ATMService {
  constructor(user, authService) {
    this.user = user;
    this.authService = authService;
  }

  static TransactionType = Object.freeze({
    LOGIN: 'login',
    LOGOUT: 'logout',
    DEPOSIT: 'deposit',
    BALANCE: 'balance',
    WITHDRAW: 'withdraw',
    TRANSFER: 'transfer',
    TRANSACTIONS: 'transactions'
  });

  /**
   * Deposit amount to current logged in user
   * @param {*} input 
   * @returns 
   */
  deposit(input) {
    const amount = this.validateAmount(input[1]);
    if (!amount) return;

    this.user.balance = new Big(this.user.balance).plus(amount);

    console.log(`\nYour balance is $${this.user.balance}\n`);

    this.user.addTransaction(new Transaction(ATMService.TransactionType.DEPOSIT, amount));
  }

  /**
   * Display current logged in user balance
   */
  checkBalance() {
    console.log(`\nYour current balance is: $${this.user.balance}\n`);

    this.user.addTransaction(new Transaction(ATMService.TransactionType.BALANCE));
  }

  /**
   * Withdraw amount from current logged in user
   * @param {*} input 
   * @returns 
   */
  withdraw(input) {
    const amount = this.validateAmount(input[1]);
    if (!amount) return;

    if (amount.gt(this.user.balance)) {
      console.log(`\nInsufficient funds! Your current balance is $${this.user.balance}\n`);
      return;
    }

    this.user.balance = new Big(this.user.balance).minus(amount);
  
    console.log(`\nWithdrew $${amount}. New balance: $${this.user.balance}\n`);

    this.user.addTransaction(new Transaction(ATMService.TransactionType.WITHDRAW, amount));
  }

  /**
   * Transfer amount to specified recipient
   * @param {*} input 
   * @returns 
   */
  transfer(input) {
    const amount = this.validateAmount(input[1]);
    if (!amount) return;

    if (amount.gt(this.user.balance)) {
      console.log(`\nInsufficient funds for transfer! Your current balance is $${this.user.balance}\n`);
      return;
    }

    // check if recipient exist's
    const recipientName = input[2];
    let recipient = this.authService.users.find(
      (u) => u.name.toLowerCase() === recipientName.toLowerCase()
    );
    if (!recipient) {
        console.log(`\nError: Recipient '${recipientName}' does not exist.\n`);
        return;
    }

    this.user.balance = new Big(this.user.balance).minus(amount);
    recipient.balance = new Big(recipient.balance).plus(amount);

    console.log(`\nTransferred $${amount} to ${recipient.name}`);
    console.log(`Your balance is $${this.user.balance}\n`);

    this.user.addTransaction(new Transaction(ATMService.TransactionType.TRANSFER, amount, recipient.name));
    recipient.addTransaction(new Transaction(ATMService.TransactionType.DEPOSIT, amount, null, this.user.name));
  }

  /**
   * Validate amount input if valid
   * @param {*} inputAmount 
   * @returns 
   */
  validateAmount(inputAmount) {
    try {
        let amount = new Big(inputAmount);

        if (amount.lte(0)) {
            console.log("\nInvalid amount! Please enter a valid number greater than 0.\n");
            return null;
        }

        return amount;
    } catch (error) {
        console.log("\nError: Invalid amount! Please enter a valid number.\n");
        return null;
    }
  }
}

module.exports = ATMService;
