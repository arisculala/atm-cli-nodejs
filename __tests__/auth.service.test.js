const AuthService = require("../services/auth.service");

jest.mock("../models/user.model", () => {
  return jest.fn().mockImplementation((name, balance) => ({
    name,
    balance,
    addTransaction: jest.fn(),
  }));
});

jest.mock("../models/transaction.model");

describe("AuthService", () => {
  let authService;

  beforeEach(() => {
    authService = new AuthService();
  });

  test("should create a new user and log in", () => {
    const input = ["LOGIN", "JohnDoe"];
    const user = authService.login(input);

    expect(user).toBeDefined();
    expect(user.name).toBe("johndoe");
    expect(authService.currentUser).toBe(user);
  });

  test("should not allow login when already logged in", () => {
    const input = ["LOGIN", "User1"];
    authService.login(input);

    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    authService.login(["LOGIN", "User2"]);

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error: You are currently logged in as")
    );
    consoleSpy.mockRestore();
  });

  test("should log out successfully", () => {
    authService.login(["LOGIN", "User1"]);
    authService.logout();

    expect(authService.currentUser).toBe(null);
  });

  test("should show an error if logging out without being logged in", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    authService.logout();

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Error: No user is logged in")
    );
    consoleSpy.mockRestore();
  });

  test("should return false if not logged in", () => {
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();
    const result = authService.isLoggedIn();

    expect(result).toBe(false);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining("You must log in first"));
    consoleSpy.mockRestore();
  });

  test("should return true if logged in", () => {
    authService.login(["LOGIN", "User1"]);
    const result = authService.isLoggedIn();

    expect(result).toBe(true);
  });
});
