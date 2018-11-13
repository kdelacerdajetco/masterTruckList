import React, { Component } from 'react';
import { Message, Button, Form, Select } from 'semantic-ui-react';
import axios from 'axios';

// const genderOptions = [
//   { key: 'm', text: 'Male', value: 'm' },
//   { key: 'f', text: 'Female', value: 'f' },
//   { key: 'o', text: 'Do Not Disclose', value: 'o' }
// ]


// drop-down options below ** 

const truckTypeOptions = [
  {key: 'HH', text: 'HH', value: 'HH'},
  {key: 'LTL', text: 'LTL', value: 'LTL'},
  {key: 'OD', text: 'OD', value: 'OD'},
  {key: 'IM', text: 'IM', value: 'IM'},
  {key: 'Van OTR', text: 'Van OTR', value: 'Van OTR'},
  {key: 'Van LOC', text: 'Van LOC', value: 'Van LOC'}
];

const isOosOptions = [
  {key: 'IS', text: 'IS', value: 'IS'},
  {key: 'OOS', text: 'OOS', value: 'OOS'}
];

const permitTypeOptions = [
  {key: 'Annual', text: 'Annual', value:'Annual'},
  {key: '26 W Ramps', text: '26 W Ramps', value: '26 W Ramps'},
  {key: '32 Ramps', text: '32 Ramps', value: '32 Ramps'},
  {key: 'Overweight', text: 'Overweight', value: 'Overweight'},
  {key: '30 Day Width', text: '30 Day Width', value: '30 Day Width'},
  {key: '90 Day Width', text: '90 Day Width', value: '90 Day Width'},
  {key: 'Other', text: 'Other', value: 'Other'},
  {key: 'NA', text: 'Not Applicable', value: 'NA'}
];

const openAssignOptions =[
  {key: 'Open', text: 'Open', value: 'Open'},
  {key: 'Assigned', text: 'Assigned', value: 'Assigned'},
  {key: 'Temp Assigned', text: 'Temp Assigned', value: 'Temp Assigned'}
];



class FormUser extends Component {

  constructor(props) {
    super(props);
    
    this.state = {
      truck_num: '',
      is_oos: '',
      repair_type: '',
      open_assign: '',
      truck_type: '',
      driver_code: '',
      permit_type: '',
      omni_serial: '',
      drivecam_serial: '',
      formClassName: '',
      formSuccessMessage: '',
      formErrorMessage: ''
    }

    // testing alterting handleInputChange since I am unable to type into any field
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleTrucknumChange = this.handleTrucknumChange.bind(this);
    this.handleRepairtypeChange = this.handleRepairtypeChange.bind(this);
    this.handleDrivercodeChange = this.handleDrivercodeChange.bind(this);
    this.handleOmniserialChange = this.handleOmniserialChange.bind(this);
    this.handleDrivecamserialChange = this.handleDrivecamserialChange.bind(this);


    // this.handleSelectChange = this.handleSelectChange.bind(this);
    // testing multiple drop down select options. seeing if it takes and fixes the error of not being able to select drop-down for multiple things
    this.handleTrucktypeChange = this.handleTrucktypeChange.bind(this);
    this.handleIsoosChange = this.handleIsoosChange.bind(this);
    this.handlePermittypeChange = this.handlePermittypeChange.bind(this);
    this.handleOpenassignChange = this.handleOpenassignChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    // Fill in the form with the appropriate data if user id is provided
    if (this.props.userID) {
      axios.get(`${this.props.server}/api/users/${this.props.userID}`)
      .then((response) => {
        this.setState({
          truck_num: response.data.truck_num,
          is_oos: response.data.is_oos,
          // age: (response.data.age === null) ? '' : response.data.age,
          repair_type: response.data.repair_type,
          open_assign: response.data.open_assign,
          truck_type: response.data.truck_type,
          driver_code: response.data.driver_code,
          permit_type: response.data.permit_type,
          omni_serial: response.data.omni_serial,
          drivecam_serial: response.data.drivecam_serial
        });
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }

  // handleInputChange(e) {
  //   const target = e.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const truck_num = target.truck_num;

  //   this.setState({ [truck_num]: value });
  // }

  handleInputChange(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const truck_num = target.truck_num;

    this.setState({ [truck_num]: value });
  }

  // handleRepairtypeChange(e) {
  //   const target = e.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const repair_type = target.repair_type;

  //   this.setState({ [repair_type]: value });
  // }

  handleRepairtypeChange(e, data) {
    this.setState({ repair_type: data.value });
  }

  // handleDrivercodeChange(e) {
  //   const target = e.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const driver_code = target.driver_code;

  //   this.setState({ [driver_code]: value });
  // }

  handleDrivercodeChange(e, data) {
    this.setState({ driver_code: data.value });
  }

  // handleTrucknumChange(e) {
  //   const target = e.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const truck_num = target.truck_num;

  //   this.setState({ [truck_num]: value });
  // }

  // handleTrucknumChange(e) {
  //   const target = e.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.truck_num;

  //   this.setState({ [name]: value });
  // }

  handleTrucknumChange(e, data) {
    this.setState({ truck_num:data.value });
  }


  // handleSelectChange(e, data) {
    // this.setState({ is_oos: data.value });
    // this.setState({ open_assign: data.value });
    // this.setState({ truck_type: data.value });

    // this one works for only one
    // this.setState({ permit_type: data.value });


    // this.setState = {
    //   is_oos: data.value,
    //   open_assign: data.value,
    //   truck_type: data.value,
    //   permit_type: data.value
    // }
  // }

  handleTrucktypeChange(e, data) {
    this.setState({ truck_type: data.value });
  }

  handleIsoosChange(e, data) {
    this.setState({ is_oos: data.value });
  }

  handlePermittypeChange(e, data) {
    this.setState({ permit_type: data.value });
  }

  handleOpenassignChange(e, data) {
    this.setState({ open_assign: data.value });
  }

  handleOmniserialChange(e, data) {
    this.setState({ omni_serial: data.value });
  }

  handleDrivecamserialChange(e, data) {
    this.setState({ drivecam_serial: data.value });
  }

  handleSubmit(e) {
    // Prevent browser refresh
    e.preventDefault();

    const user = {
      truck_num: this.state.truck_num,
      is_oos: this.state.is_oos,
      repair_type: this.state.repair_type,
      open_assign: this.state.open_assign,
      truck_type: this.state.truck_type,
      driver_code: this.state.driver_code,
      permit_type: this.state.permit_type,
      omni_serial: this.state.omni_serial,
      drivecam_serial: this.state.drivecam_serial
    }

    // Acknowledge that if the user id is provided, we're updating via PUT
    // Otherwise, we're creating a new data via POST
    const method = this.props.userID ? 'put' : 'post';
    const params = this.props.userID ? this.props.userID : '';

    axios({
      method: method,
      responseType: 'json',
      url: `${this.props.server}/api/users/${params}`,
      data: user
    })
    .then((response) => {
      this.setState({
        formClassName: 'success',
        formSuccessMessage: response.data.msg
      });

      if (!this.props.userID) {
        this.setState({
          truck_num: '',
          is_oos: '',
          repair_type: '',
          open_assign: '',
          truck_type: '',
          driver_code: '',
          permit_type: '',
          omni_serial: '',
          drivecam_serial: ''
        });
        this.props.onUserAdded(response.data.result);
        this.props.socket.emit('add', response.data.result);
      }
      else {
        this.props.onUserUpdated(response.data.result);
        this.props.socket.emit('update', response.data.result);
      }
      
    })
    .catch((err) => {
      if (err.response) {
        if (err.response.data) {
          this.setState({
            formClassName: 'warning',
            formErrorMessage: err.response.data.msg
          });
        }
      }
      else {
        this.setState({
          formClassName: 'warning',
          formErrorMessage: 'Something went wrong. ' + err
        });
      }
    });
  }

  render() {

    const formClassName = this.state.formClassName;
    const formSuccessMessage = this.state.formSuccessMessage;
    const formErrorMessage = this.state.formErrorMessage;

    return (
      <Form className={formClassName} onSubmit={this.handleSubmit}>
        
        {/* <Form.Group widths ='equal'> */}
          <Form.Input
          label='Truck Number'
          type='number'
          placeholder='123'
          name='truck_num'
          maxLength='3'
          required value={this.state.truck_num}
          onChange={this.handleTrucknumChange}
          />
          <Form.Field
          control={Select}
          label='IS OOS'
          options={isOosOptions}
          placeholder='IS OOS'
          name='is_oos'
          value={this.state.is_oos}
          onChange={this.handleIsoosChange}
          />
          <Form.Input
          label='Repair Type'
          type='text'
          placeholder='Repair Type Optional'
          name='repair_type'
          maxLength='50'
          // required value={this.state.repair_type}
          value={this.state.repair_type}
          onChange={this.handleRepairtypeChange}
          />
          <Form.Field
          control={Select}
          label='Open/Assign'
          options={openAssignOptions}
          placeholder='Select'
          name='open_assign'
          value={this.state.open_assign}
          onChange={this.handleOpenassignChange}
          />
        {/* </Form.Group> */}
        {/* <Form.Group widths ='equal'> */}
          {/* Truck Type is visible when changing the options but it itself is unchangeable -- want */}
          {/* Truck Type -- Visible while adding trucks, but will not be visible while editing trucks */}
          <Form.Field
          control={Select}
          label='Truck Type'
          options={truckTypeOptions}
          placeholder='Truck Type'
          name='truck_type'
          value={this.state.truck_type}
          onChange={this.handleTrucktypeChange}
          />
          <Form.Input
          label='Driver Name'
          type='text'
          placeholder = 'Driver Name'
          name='driver_code'
          maxLength='100'
          // required value={this.state.driver_code}
          value={this.state.driver_code}
          onChange={this.handleDrivercodeChange}
          />
          <Form.Field
          control={Select}
          label='Permit Type'
          options={permitTypeOptions}
          placeholder='Permit Type'
          name='permit_type'
          value={this.state.permit_type}
          onChange={this.handlePermittypeChange}
          />
           <Form.Input
          label='Omni Serial'
          type='text'
          placeholder='123'
          name='omni_serial'
          maxLength='50'
          // required value={this.state.omni_serial}
          onChange={this.handleOmniserialChange}
          />
           <Form.Input
          label='Drive Cam Serial'
          type='text'
          placeholder='123'
          name='drivecam_serial'
          maxLength='50'
          // required value={this.state.drivecam_serial}
          onChange={this.handleDrivecamserialChange}
          />
          {/* log in using passport
          take information from passport to key into this field (most likely on FormUser.js) */}
          
        {/* </Form.Group> */}

        {/* <Form.Input
          label='Name'
          type='text'
          placeholder='Elon Musk'
          name='name'
          maxLength='40'
          required
          value={this.state.name}
          onChange={this.handleInputChange}
        />
        <Form.Input
          label='Email'
          type='email'
          placeholder='elonmusk@tesla.com'
          name='email'
          maxLength='40'
          required
          value={this.state.email}
          onChange={this.handleInputChange}
        />
        <Form.Group widths='equal'>
          <Form.Input
            label='Age'
            type='number'
            placeholder='18'
            min={5}
            max={130}
            name='age'
            value={this.state.age}
            onChange={this.handleInputChange}
          />
          <Form.Field
            control={Select}
            label='Gender'
            options={genderOptions}
            placeholder='Gender'
            value={this.state.gender}
            onChange={this.handleSelectChange}
          />
        </Form.Group> */}
        <Message
          success
          color='green'
          header='Nice one!'
          content={formSuccessMessage}
        />
        <Message
          warning
          color='yellow'
          header='Woah!'
          content={formErrorMessage}
        />
        <Button color={this.props.buttonColor} floated='right'>{this.props.buttonSubmitTitle}</Button>
        <br /><br /> {/* Yikes! Deal with Semantic UI React! */}
      </Form>
    );
  }
}

export default FormUser;
