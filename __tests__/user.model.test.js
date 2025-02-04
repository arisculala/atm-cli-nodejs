const Big = require("big.js");
const User = require("../models/user.model");
const ATMService = require("../services/atm.service");

jest.mock("../services/atm.service", () => ({
  TransactionType: {
    LOGIN: "login",
    LOGOUT: "logout",
    DEPOSIT: "deposit",
    BALANCE: "balance",
    WITHDRAW: "withdraw",
    TRANSFER: "transfer",
    TRANSACTIONS: "transactions",
  },
}));

describe("User Model", () => {
  let user;

  beforeEach(() => {
    user = new User("JohnDoe", new Big("100.0"));
  });

  test("should create a user with initial balance", () => {
    expect(user.name).toBe("JohnDoe");
    expect(user.balance.eq(new Big("100.0"))).toBe(true);
    expect(user.transactions).toEqual([]);
  });

  test("should add a transaction", () => {
    const mockTransaction = { type: ATMService.TransactionType.DEPOSIT, amount: new Big("50") };
    user.addTransaction(mockTransaction);

    expect(user.transactions.length).toBe(1);
    expect(user.transactions[0]).toEqual(mockTransaction);
  });

  test("should show all transactions", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    user.addTransaction({ type: ATMService.TransactionType.DEPOSIT, amount: new Big("50"), date: "2025-02-04" });
    user.addTransaction({ type: ATMService.TransactionType.WITHDRAW, amount: new Big("30"), date: "2025-02-05" });

    user.showTransactions();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("All transactions:"));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Type: deposit, Amount: $50"));
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Type: withdraw, Amount: $30"));

    consoleSpy.mockRestore();
  });

  test("should filter transactions by type", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    user.addTransaction({ type: ATMService.TransactionType.DEPOSIT, amount: new Big("50") });
    user.addTransaction({ type: ATMService.TransactionType.WITHDRAW, amount: new Big("30") });

    user.showTransactions(ATMService.TransactionType.DEPOSIT);

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Type: deposit, Amount: $50"));
    expect(consoleSpy).not.toHaveBeenCalledWith(expect.stringContaining("Type: withdraw"));

    consoleSpy.mockRestore();
  });

  test("should show no transactions message if no transactions found", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    user.showTransactions();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("No transactions found."));

    consoleSpy.mockRestore();
  });

  test("should show transfer transactions with recipient", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    user.addTransaction({ type: ATMService.TransactionType.TRANSFER, amount: new Big("20"), recipient: "JaneDoe" });

    user.showTransactions();

    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Type: transfer, Amount: $20, Recipient: JaneDoe"));

    consoleSpy.mockRestore();
  });
});
