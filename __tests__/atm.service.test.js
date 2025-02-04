const Big = require("big.js");
const ATMService = require("../services/atm.service");
const Transaction = require("../models/transaction.model");

jest.mock("../models/transaction.model", () => {
  return jest.fn().mockImplementation((type, amount, recipient = null) => ({
    type,
    amount,
    recipient,
  }));
});

describe("ATMService", () => {
  let atmService;
  let mockUser;
  let mockAuthService;

  beforeEach(() => {
    mockUser = {
      name: "JohnDoe",
      balance: new Big(100), // Initial balance
      addTransaction: jest.fn(),
    };

    mockAuthService = {
      users: [{ name: "JaneDoe", balance: new Big(50), addTransaction: jest.fn() }],
    };

    atmService = new ATMService(mockUser, mockAuthService);
  });

  test("should deposit money correctly", () => {
    atmService.deposit(["DEPOSIT", "50"]);
    expect(mockUser.balance.eq(new Big(150))).toBe(true);
    expect(mockUser.addTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ type: ATMService.TransactionType.DEPOSIT, amount: new Big(50) })
    );
  });

  test("should not deposit invalid amounts", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    atmService.deposit(["DEPOSIT", "-10"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Invalid amount!"));

    atmService.deposit(["DEPOSIT", "abc"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Error: Invalid amount!"));

    consoleSpy.mockRestore();
  });

  test("should withdraw money correctly", () => {
    atmService.withdraw(["WITHDRAW", "40"]);
    expect(mockUser.balance.eq(new Big(60))).toBe(true);
    expect(mockUser.addTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ type: ATMService.TransactionType.WITHDRAW, amount: new Big(40) })
    );
  });

  test("should not withdraw more than the balance", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    atmService.withdraw(["WITHDRAW", "200"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Insufficient funds"));

    consoleSpy.mockRestore();
  });

  test("should check balance correctly", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    
    atmService.checkBalance();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Your current balance is: $100"));

    expect(mockUser.addTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ type: ATMService.TransactionType.BALANCE })
    );

    consoleSpy.mockRestore();
  });

  test("should transfer money to an existing user", () => {
    atmService.transfer(["TRANSFER", "30", "JaneDoe"]);
    
    expect(mockUser.balance.eq(new Big(70))).toBe(true);
    expect(mockAuthService.users[0].balance.eq(new Big(80))).toBe(true);
    
    expect(mockUser.addTransaction).toHaveBeenCalledWith(
      expect.objectContaining({ type: ATMService.TransactionType.TRANSFER, amount: new Big(30), recipient: "JaneDoe" })
    );
  });

  test("should not transfer money to a non-existing user", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    atmService.transfer(["TRANSFER", "20", "NonExistentUser"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Error: Recipient 'NonExistentUser' does not exist."));

    consoleSpy.mockRestore();
  });

  test("should not transfer more than available balance", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    atmService.transfer(["TRANSFER", "150", "JaneDoe"]);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("Insufficient funds for transfer"));

    consoleSpy.mockRestore();
  });

  test("should validate amount correctly", () => {
    expect(atmService.validateAmount("50").eq(new Big(50))).toBe(true);
    expect(atmService.validateAmount("0")).toBeNull();
    expect(atmService.validateAmount("-10")).toBeNull();
    expect(atmService.validateAmount("abc")).toBeNull();
  });
});
