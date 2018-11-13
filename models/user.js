const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const validate = require('mongoose-validator');

// was nameValidator
const truck_num_validator = [
  validate({
    validator: 'isLength',
    arguments: [0, 3],
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
    arguments: [0,100],
    message: 'Driver Name should not exceed {ARGS[1]} characters.'
  })
];

const permit_type_validator = [
  validate({
    validator: 'isLength',
    arguments: [0,50],
    message: 'Permit Type should not exceed {ARGS[1]} characters.'
  })
];

const omni_serial = [
  validate({
    validator: 'isLength',
    arguments: [0,100],
    message: 'Omni Serial should not exceed {ARGS[1]} characters.'
  })
];

const drivecam_serial = [
  validate({
    validator: 'isLength',
    arguments: [0,100],
    message: 'Drive Cam Serial should not exceed {ARGS[1]} characters.'
  })
];

// Define the database model
const UserSchema = new mongoose.Schema({
  // was name. now is truck_num. 
  truck_num: {
    type: Number,
    // required: [true, 'truck_num is required.'],
    // was nameValidator
    // validate: truck_num_validator
  },
  // was email. now is_oos
  is_oos: {
    type: String,
    // required: [true, 'IS_OOS is required.'],
    // unique: true,
    // validate: is_oos_validator
  },
  repair_type: {
    type: String,
    // required: [false],
    // validate: repair_type_validator

  },
  open_assign: {
    type: String,
    // validate: open_assign_validator
  },
  truck_type: {
    type: String,
    // validate: truck_type_validator
  },
  driver_code :{
    type: String,
    // required: [true, 'Driver Code is required'],
    // validate: driver_code_validator
  },
  permit_type: {
    type: String,
    // required: [false],
    // validate: permit_type_validator
  },
  omni_serial :{
    type: String,
  },
  drivecam_serial :{
    type: String,
  }

});

// Use the unique validator plugin
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const User = module.exports = mongoose.model('user', UserSchema);
