// Set the connection string based from the config vars of the production server
// To run locally use 'mongodb://localhost/mern-crud' instead of process.env.DB

module.exports = {
 db: process.env.DB
//  db: 'mongodb://localhost/masterTruckList'
};


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
//         "database": "employee_db",
//         "host":"localhost",
//         "dialect": "mysql",
//         "migrationStorage":"json"
//     }
// }