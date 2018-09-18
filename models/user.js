const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

// was nameValidator
const truck_num_validator = [
  validate({
    validator: 'isLength',
    arguments: [0, 5],
    message: 'Truck number must not exceed {ARGS[1]} characters.'
  })
];

const is_oos_validator = [
  validate({
    validator: 'isLength',
    arguments: [0,10],
    message: 'IS OOS must not exceed {ARGS[1]} characters.'
  })
]

// const emailValidator = [
//   validate({
//     validator: 'isLength',
//     arguments: [0, 40],
//     message: 'Email must not exceed {ARGS[1]} characters.'
//   }),
//   validate({
//     validator: 'isEmail',
//     message: 'Email must be valid.'
//   })
// ];

const repair_type_validator = [
  validate({
    validator: 'isLength',
    arguments: [0,50],
    message: 'repair_type must not exceed {ARGS[1]} characters.'
  })  
];

const open_assign_validator = [
  validate({
    validator: 'isLength',
    arguments: [0,50],
    message: 'open_assign must not exceed {ARGS[1]} characters.'
  })
];

const truck_type_validator = [
  validate({
    validator: 'isLength',
    arguments: [0,5],
    message: 'truck_type must not exceed {ARGS[1]} characters.'
  })
];

const driver_code_validator = [
  validate({
    validator: 'isLength',
    arguments: [0,8],
    message: 'Driver Code should not exceed {ARGS[1]} characters.'
  })
];

// const driver_first_validator = [
//   validate({
//     validator: 'isLength',
//     arguments: [0,20],
//     message: 'Driver first name should not exceed {ARGS[1]} characters.'
//   })
// ];

// const driver_last_validator = [
//   validate({
//     validator: 'isLength',
//     arguments: [0,20],
//     message: 'Driver last name should not exceed {ARGS[1]} characters.'
//   })
// ];

const permit_type_validator = [
  validate({
    validator: 'isLength',
    arguments: [0,50],
    message: 'Permit Type should not exceed {ARGS[1]} characters.'
  })
];

const user_initial_validator = [
  validate({
    validator: 'isLength',
    arguments: [0,3],
    message: 'User Initals should not exceed {ARGS[1]} characters.'
  })
]

// Define the database model
const UserSchema = new mongoose.Schema({
  // was name. now is truck_num. 
  truck_num: {
    type: Number,
    required: [true, 'truck_num is required.'],
    // was nameValidator
    validate: truck_num_validator
  },
  // was email. now is_oos
  is_oos: {
    type: String,
    required: [true, 'IS_OOS is required.'],
    unique: true,
    validate: is_oos_validator
  },
  repair_type: {
    type: String,
    required: [false],
    validate: repair_type_validator

  },
  open_assign: {
    type: String,
    validate: open_assign_validator
  },
  truck_type: {
    type: String,
    validate: truck_type_validator
  },
  driver_code :{
    type: String,
    required: [true, 'Driver Code is required'],
    validate: driver_code_validator
  },
  // driver_first: {
  //   type: String,
  //   validate: driver_first_validator
  // },
  // driver_last: {
  //   type: String,
  //   validate: driver_last_validator
  permit_type: {
    type: String,
    required: [false],
    validate: permit_type_validator
  },
  user_initial: {
    type: String,
    required: [true, 'User Initals are required.'],
    validate: user_initial_validator
  }

});

// Use the unique validator plugin
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const User = module.exports = mongoose.model('user', UserSchema);
