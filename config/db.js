// Set the connection string based from the config vars of the production server
// To run locally use 'mongodb://localhost/mern-crud' instead of process.env.DB
//  var db;

module.exports = {
 db: process.env.DB
//  db: 'mongodb://localhost/mastertrucklist'
};

// mongodb.MongoClient.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test", function (err, client) {
//   if (err) {
//     console.log(err);
//     process.exit(1);
//   }

// {
//     "development": {
//         "username":"root",
//         "password":"Jetco123!?",
//         "database": "employee_db",
//         "host": "localhost",
//         "dialect": "mysql",
//         "migrationStorage": "json"
//     },
//     "test": {
//         "username":"root",
//         "password":"Jetco123!?",
//         "database": "employee_db",
//         "host": "localhost",
//         "dialect": "mysql",
//         "migrationStorage":"json"

//     },
//     "production": {
//         "username":"root",
//         "password":"Jetco123!?",
//         "database": "users",
//         "host":"localhost",
//         "dialect": "mysql",
//         "migrationStorage":"json"
//     }
// }