import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'todo@browser',
  password: 'todo',
  database: 'todo_browser',
});

// const test_query = "DESCRIBE lists";
// db.query(test_query, function(error, results, fields) {
// });
// 
// db.promise().query(test_query).then(
//   function (results, fields) {
//     console.log(results);
//   }
// );

export { db };
