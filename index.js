const readline = require("readline");
const ATMService = require("./services/atm.service");
const AuthService = require("./services/auth.service");

const authService = new AuthService();
let atmService = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function checkCommandLength(input, validLengths) {
  if (!validLengths.includes(input.length)) {
    console.log(`\nError: Invalid number of arguments for '${input[0]}' command.\n`);
    return false;
  }
  return true;
}

// display welcome message
console.log("\n==============================================================");
console.log("  Welcome to the ATM CLI. Type 'help' for available commands.  ");
console.log("==============================================================\n");

// show ATM CLI menu
const showMenu = () => {
  rl.setPrompt("$ ");
  rl.prompt();

  rl.on("line", (input) => {
    const args = input.trim().split(" ");
    const command = args[0].toUpperCase();

    switch (command) {
      case "HELP":
        console.log(`\n`);
        console.log("Usage: [command] [options]");
        console.log("Commands:");
        console.log("    exit                            To exit ATM CLI interface.");
        console.log("    help                            Display this help message.");
        console.log("    login [name]                    Logs in as this customer and creates the customer if not exist.");
        console.log("    logout                          Logs out of the current customer.");
        console.log("    deposit [amount]                Deposits this amount to the logged in customer.");
        console.log("    transfer [target] [amount]      Transfers this amount from the logged in customer to the target customer.");
        console.log("    withdraw [amount]               Withdraws this amount from the logged in customer.");
        console.log("    balance                         Display logged in customer balance.");
        console.log("    transactions [type_optional]    Display logged in customer transactions. If type_optional is given filter the transaction based on the type.");
        console.log("                                     - type_optional[login, logout, deposit, balance, withdraw, transfer, transactions]");
        console.log(`\n`);
        break;

      case "LOGIN":
        if (!checkCommandLength(args, [2])) break;
        const user = authService.login(args);
        if (user) {
          atmService = new ATMService(user, authService);
        }
        break;

      case "LOGOUT":
        if (!checkCommandLength(args, [1])) break;
        authService.logout(args);
        break;

      case "EXIT":
        if (!checkCommandLength(args, [1])) break;
        console.log("\nThank you for using ATM CLI. Goodbye!\n");
        rl.close();
        process.exit(0);
        break;

      case "DEPOSIT":
        if (!checkCommandLength(args, [2])) break;
        if (!authService.isLoggedIn()) {
          break;
        }
        atmService.deposit(args);
        break;

      case "BALANCE":
        if (!checkCommandLength(args, [1])) break;
        if (!authService.isLoggedIn()) {
          break;
        }
        atmService.checkBalance();
        break;

      case "WITHDRAW":
        if (!checkCommandLength(args, [2])) break;
        if (!authService.isLoggedIn()) {
          break;
        }
        atmService.withdraw(args);
        break;

      case "TRANSFER":
        if (!checkCommandLength(args, [3])) break;
        if (!authService.isLoggedIn()) {
          break;
        }
        atmService.transfer(args);
        break;

      case "TRANSACTIONS":
        if (!checkCommandLength(args, [1, 2])) break;
        if (!authService.isLoggedIn()) {
          break;
        }
        authService.currentUser.showTransactions(args[1]);
        break;

      default:
        console.log("\nUnknown command. Type 'help' for available commands.\n");
    }

    rl.prompt();
  });
};

// start the ATM CLI menu
showMenu();
