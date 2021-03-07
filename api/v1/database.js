//For secure connection:
// const fs = require('fs');
require('dotenv').config('../../env');
const fs = require('fs');
const { Pool } = require("pg");


// Configure the database connection.
const config = {
  user: process.env.db_user,
  password: process.env.db_password,
  host: process.env.db_host,
  database: process.env.db_database,
  port: 26257,
  ssl: {
    ca: fs.readFileSync('certs/ca.crt')
        .toString()
  }
}

// Create a connection pool

const pool = new Pool(config);


pool.connect(err => {
    if (err) {
      console.error('connection error', err.stack)
    } else {
      console.log('connected')
    }
  })
  
  
  module.exports.pool = pool;


// Create a connection pool

// const pool = new Pool(config);

// Wrapper for a transaction.  This automatically re-calls the operation with
// the client as an argument as long as the database server asks for
// the transaction to be retried.

// async function retryTxn(n, max, client, operation, callback) {
//   await client.query("BEGIN;");
//   while (true) {
//     n++;
//     if (n === max) {
//       throw new Error("Max retry count reached.");
//     }
//     try {
//       await operation(client, callback);
//       await client.query("COMMIT;");
//       return;
//     } catch (err) {
//       if (err.code !== "40001") {
//         return callback(err);
//       } else {
//         console.log("Transaction failed. Retrying transaction.");
//         console.log(err.message);
//         await client.query("ROLLBACK;", () => {
//           console.log("Rolling back transaction.");
//         });
//         await new Promise((r) => setTimeout(r, 2 ** n * 1000));
//       }
//     }
//   }
// }

// // This function is called within the first transaction. It creates a table and inserts some initial values.

// async function initTable(client, callback) {
//   await client.query(
//     "CREATE TABLE IF NOT EXISTS sealevel (id INT PRIMARY KEY, multiplier NUMERIC NOT NULL, current_year INT);",
//     callback
//   );
//   await client.query(
//     "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, username VARCHAR(40) NOT NULL, password VARCHAR(40) NOT NULL, location VARCHAR(40) DEFAULT 'Vancouver', points INT DEFAULT 0);",
//     callback
//   );
  // await client.query(
  //   "INSERT INTO sealevel (id, multiplier, current_year) VALUES (1, 3.3, 2020);",
  //   callback
  // );
  //   await client.query(
  //   "INSERT INTO users (username, password) VALUES ('test','test123');",
  //   callback
  // );
  // await client.query("SELECT id, multiplier FROM sealevel;", callback);
  // await client.query(
  //     "SELECT * FROM users",
  //     callback
  //   );
// }

// async function transferFunds(client, callback) {
//   const from = 1;
//   const to = 2;
//   const amount = 100;
//   const selectFromBalanceStatement = "SELECT balance FROM accounts WHERE id = $1 ;";
//   const selectFromValues = [from];
//   await client.query(selectFromBalanceStatement, selectFromValues, (err, res) => {
//     if (err) {
//       return callback(err);
//     } else if (res.rows.length === 0) {
//       console.log("account not found in table");
//       return callback(err);
//     }
//     var acctBal = res.rows[0].balance;
//     if (acctBal < amount) {
//       return callback(new Error("insufficient funds"));
//     }
//   });

//   const updateFromBalanceStatement = "UPDATE accounts SET balance = balance - $1 WHERE id = $2 ;";
//   const updateFromValues = [amount, from];
//   await client.query(updateFromBalanceStatement, updateFromValues, callback);

//   const updateToBalanceStatement = "UPDATE accounts SET balance = balance + $1 WHERE id = $2 ;";
//   const updateToValues = [amount, to];
//   await client.query(updateToBalanceStatement, updateToValues, callback);

//   const selectBalanceStatement = "SELECT id, balance FROM accounts;";
//   await client.query(selectBalanceStatement, callback);
// }

// Run the transactions in the connection pool

// (async () => {
// //   // Connect to database
//   const client = await pool.connect();

// //   // Callback
//   function cb(err, res) {
//     if (err) throw err;

//     if (res.rows.length > 0) {
//       console.log("New entries:");
//       res.rows.forEach((row) => {
//         console.log(row);
//       });
//     }
//   }

  // Initialize table in transaction retry wrapper
  // console.log("Initializing table...");
  // await retryTxn(0, 15, client, initTable, cb);

//   // Transfer funds in transaction retry wrapper
//   console.log("Transferring funds...");
//   await retryTxn(0, 15, client, transferFunds, cb);

// //   // Exit program
//   process.exit();
// })().catch((err) => console.log(err.stack));