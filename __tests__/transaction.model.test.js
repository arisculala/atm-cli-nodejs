const Transaction = require("../models/transaction.model");

describe("Transaction Model", () => {
  test("should create a transaction with type and amount", () => {
    const transaction = new Transaction("deposit", 100);

    expect(transaction.type).toBe("deposit");
    expect(transaction.amount).toBe(100);
    expect(transaction.recipient).toBe(null);
    expect(transaction.sender).toBe(null);
    expect(new Date(transaction.date)).toBeInstanceOf(Date);
  });

  test("should create a transaction with recipient", () => {
    const transaction = new Transaction("transfer", 50, "JaneDoe");

    expect(transaction.type).toBe("transfer");
    expect(transaction.amount).toBe(50);
    expect(transaction.recipient).toBe("JaneDoe");
    expect(transaction.sender).toBe(null);
    expect(new Date(transaction.date)).toBeInstanceOf(Date);
  });

  test("should create a transaction with sender and recipient", () => {
    const transaction = new Transaction("transfer", 75, "JaneDoe", "JohnDoe");

    expect(transaction.type).toBe("transfer");
    expect(transaction.amount).toBe(75);
    expect(transaction.recipient).toBe("JaneDoe");
    expect(transaction.sender).toBe("JohnDoe");
    expect(new Date(transaction.date)).toBeInstanceOf(Date);
  });

  test("should create a transaction with default values", () => {
    const transaction = new Transaction("withdraw");

    expect(transaction.type).toBe("withdraw");
    expect(transaction.amount).toBe(0);
    expect(transaction.recipient).toBe(null);
    expect(transaction.sender).toBe(null);
    expect(new Date(transaction.date)).toBeInstanceOf(Date);
  });
});
