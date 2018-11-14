const express = require('express');
const router = express.Router();
const RateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const stringCapitalizeName = require('string-capitalize-name');

const User = require('../models/user');

// Attempt to limit spam post requests for inserting data
const minutes = 1;
const postLimiter = new RateLimit({
  windowMs: minutes * 60 * 1000, // milliseconds
  max: 100, // Limit each IP to 100 requests per windowMs 
  delayMs: 0, // Disable delaying - full speed until the max limit is reached 
  handler: (req, res) => {
    res.status(429).json({ success: false, msg: `You made too many requests. Please try again after ${minutes} minute.` });
  }
});

// READ (ONE) -- Users are the drivers listed in the table 
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such user.` });
    });
});

// READ (ALL)
router.get('/', (req, res) => {
  User.find({})
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// CREATE
router.post('/', postLimiter, (req, res) => {

  // Validate the age
  // let age = sanitizeAge(req.body.age);
  // if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
  // else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });

  let newUser = new User({
    truck_num: sanitizeTruck_num(req.body.truck_num),
    is_oos: sanitizeIs_oos(req.body.is_oos),
    repair_type: sanitizeRepair_type(req.body.repair_type),
    open_assign: sanitizeOpen_assign(req.body.open_assign),
    truck_type: sanitizeTruck_type(req.body.truck_type),
    driver_code: sanitizeDriver_code(req.body.driver_code),
    permit_type: sanitizePermit_type(req.body.permit_type),
    omni_serial: sanitizeOmni_serial(req.body.omni_serial),
    drivecam_serial: sanitizeDrivecam_serial(req.body.drivecam_serial)
  });

  newUser.save()
    .then((result) => {
      res.json({
        success: true,
        msg: `Successfully added!`,
        result: {
          _id: result._id,
          truck_num: result.truck_num,
          is_oos: result.is_oos,
          repair_type: result.repair_type,
          open_assign: result.open_assign,
          truck_type: result.truck_type,
          driver_code: result.driver_code,
          permit_type: result.permit_type,
          omni_serial: result.omni_serial,
          drivecam_serial: result.drivecam_serial
        }
      });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.truck_num) {
          res.status(400).json({ success: false, msg: err.errors.truck_num.message });
          return;
        }
        if (err.errors.is_oos) {
          res.status(400).json({ success: false, msg: err.errors.is_oos.message });
          return;
        }
        if (err.errors.repair_type) {
          res.status(400).json({ success: false, msg: err.errors.repair_type.message });
          return;
        }
        if (err.errors.open_assign) {
          res.status(400).json({ success: false, msg: err.errors.open_assign.message });
          return;
        }
        if (err.errors.truck_type) {
          res.status(400).json({ success: false, msg: err.errors.truck_type.message });
          return;
        }
        if (err.errors.driver_code) {
          res.status(400).json({ success: false, msg: err.errors.driver_code.message });
          return;
        }
        if (err.errors.permit_type) {
          res.status(400).json({ success: false, msg: err.errors.permit_type.message });
          return;
        }
        if(err.errors.omni_serial){
          res.status(400).json({success: false, msg: err.errors.omni_serial.message });
          return;
        }
        if(err.errors.drivecam_serial){
          res.status(400).json({success: false, msg: err.errors.drivecam_serial.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// UPDATE
router.put('/:id', (req, res) => {

  // Validate the age
  // let age = sanitizeAge(req.body.age);
  // if (age < 5 && age != '') return res.status(403).json({ success: false, msg: `You're too young for this.` });
  // else if (age > 130 && age != '') return res.status(403).json({ success: false, msg: `You're too old for this.` });

  let updatedUser = {
    truck_num: sanitizeTruck_num(req.body.truck_num),
    is_oos: sanitizeIs_oos(req.body.is_oos),
    repair_type: sanitizeRepair_type(req.body.repair_type),
    open_assign: sanitizeOpen_assign(req.body.open_assign),
    truck_type: sanitizeTruck_type(req.body.truck_type),
    driver_code: sanitizeDriver_code(req.body.driver_code),
    permit_type: sanitizePermit_type(req.body.permit_type),
    omni_serial: sanitizeOmni_serial(req.body.omni_serial),
    drivecam_serial: sanitizeDrivecam_serial(req.body.drivecam_serial)
  };

  User.findOneAndUpdate({ _id: req.params.id }, updatedUser, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      User.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              truck_num: newResult.truck_num,
              is_oos: newResult.is_oos,
              repair_type: newResult.repair_type,
              open_assign: newResult.open_assign,
              truck_type: newResult.truck_type,
              driver_code: newResult.driver_code,
              permit_type: newResult.permit_type,
              omni_serial: newResult.omni_serial,
              drivecam_serial: newResult.drivecam_serial
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.truck_num) {
          res.status(400).json({ success: false, msg: err.errors.truck_num.message });
          return;
        }
        if (err.errors.is_oos) {
          res.status(400).json({ success: false, msg: err.errors.is_oos.message });
          return;
        }
        if (err.errors.repair_type) {
          res.status(400).json({ success: false, msg: err.errors.repair_type.message });
          return;
        }
        if (err.errors.open_assign) {
          res.status(400).json({ success: false, msg: err.errors.open_assign.message });
          return;
        }
        if (err.errors.truck_type) {
          res.status(400).json({ success: false, msg: err.errors.truck_type.message });
          return;
        }
        if (err.errors.driver_code) {
          res.status(400).json({ success: false, msg: err.errors.driver_code.message });
          return;
        }
        if (err.errors.permit_type) {
          res.status(400).json({ success: false, msg: err.errors.permit_type.message });
          return;
        }
        if (err.errors.omni_serial) {
          res.status(400).json({success: false, msg: err.errors.omni_serial.message });
          return;
        }
        if (err.errors.drivecam_serial) {
          res.status(400).json({success: false, msg: err.errors.drivecam_serial.message });
          return;
        }
        // Show failed if all else fails for some reasons
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
      }
    });
});

// DELETE
router.delete('/:id', (req, res) => {

  User.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.json({
        success: true,
        msg: `It has been deleted.`,
        result: {
          _id: result._id,
          truck_num: result.truck_num,
          is_oos: result.is_oos,
          repair_type: result.repair_type,
          open_assign: result.open_assign,
          truck_type: result.truck_type,
          driver_code: result.driver_code,
          permit_type: result.permit_type,
          omni_serial: result.omni_serial,
          drivecam_serial: result.drivecam_serial
        }
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: 'Nothing to delete.' });
    });
});

module.exports = router;

// Minor sanitizing to be invoked before reaching the database
sanitizeTruck_num = (truck_num) => {
  // Return empty if truck_num is non-numeric
  // if (isNaN(truck_num) && truck_num != '') return '';
  // return (truck_num === '') ? truck_num : parseInt(truck_num);
  return truck_num;
}

sanitizeIs_oos = (is_oos) => {
  // Return empty if it's neither of the two
  // return (is_oos === 'IS' || is_oos === 'OOS') ? is_oos : '';
  return is_oos;
}

sanitizeRepair_type = (repair_type) => {
  //Capitalizes the repair_type information 
  // return stringCapitalizeName(repair_type);
  return repair_type;
}

sanitizeOpen_assign = (open_assign) => {
  // Return empty if it's neither of the assign qualities listed below
  // return (open_assign === 'Open' || open_assign === 'Assigned' || open_assign === 'Temp Assigned') ? open_assign : '';
  // return stringCapitalizeName(open_assign);
  return open_assign;

}

sanitizeTruck_type = (truck_type) => {
  // return (truck_type === 'HH' || truck_type === 'LTL' || truck_type === 'OD' || truck_type === 'IM' || truck_type === 'Van OTR' || truck_type === 'Van LOC') ? truck_type : '';
  return truck_type;
}

sanitizeDriver_code = (driver_code) => {
  // Experimenting with adding the parenthesis before and after the DRICOD. Also making them all upper case letters. 
  // return ( "(" & driver_code.toUpperCase() & ")" );

  // Seeing if removing the '()' from the field makes the field work. 
  // return driver_code.toUpperCase();
  return driver_code;
}

sanitizePermit_type = (permit_type) => {
  // List of options for permit_type, else blank
  // return (permit_type === 'Annual' || permit_type === '26 W Ramps' || permit_type === '32 Ramps' || permit_type === 'Overweight' || permit_type === '30 Day Width' || permit_type === '90 Day Width' || permit_type === 'Other' || permit_type === 'NA') ? permit_type : '';
  // return stringCapitalizeName(permit_type);
  return permit_type;
}

sanitizeOmni_serial = (omni_serial) => {
  return omni_serial;
}

sanitizeDrivecam_serial = (drivecam_serial) => {
  return drivecam_serial;
}


// sanitizeName = (name) => {
//   return stringCapitalizeName(name);
// }
// sanitizeEmail = (email) => {
//   return email.toLowerCase();
// }
// sanitizeAge = (age) => {
//   // Return empty if age is non-numeric
  // if (isNaN(age) && age != '') return '';
//   return (age === '') ? age : parseInt(age);
// }
// sanitizeGender = (gender) => {
//   // Return empty if it's neither of the two
//   return (gender === 'm' || gender === 'f') ? gender : '';
// }
