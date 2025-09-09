const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',      // where MySQL is running
  user: 'root',           // your MySQL username
  password: 'admin@786',  // your MySQL password
  database: 'vighe'       // your database name
});

connection.connect((err) => {
  if (err) {
    console.error('❌ MySQL Connection Failed: ' + err.stack);
    return;
  }
  console.log('✅ MySQL Connected as ID ' + connection.threadId);
});

module.exports = connection;
