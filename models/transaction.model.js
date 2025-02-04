class Transaction {
  constructor(type, amount = 0, recipient = null, sender = null) {
    this.type = type;
    this.amount = amount;
    this.recipient = recipient;
    this.sender = sender;
    this.date = new Date().toISOString();
  }
}

module.exports = Transaction;