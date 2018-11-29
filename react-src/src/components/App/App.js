import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import TableUser from '../TableUser/TableUser';
import ModalUser from '../ModalUser/ModalUser';

import logo from '../../siteLogo.png';
// import shirts from '../../shirts.png';
import './App.css';

// import FormUser from '../FormUser/FormUser.js';
import SearchUser from '../FilterUser/SearchUser.js';
import { Table } from 'semantic-ui-react';



class App extends Component {

  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';
    this.socket = io.connect(this.server);

    this.state = {
      users: [],
      online: 0
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchUsers();
    this.socket.on('visitor enters', data => this.setState({ online: data }));
    this.socket.on('visitor exits', data => this.setState({ online: data }));
    this.socket.on('add', data => this.handleUserAdded(data));
    this.socket.on('update', data => this.handleUserUpdated(data));
    this.socket.on('delete', data => this.handleUserDeleted(data));
  }

  // Fetch data from the back-end
  fetchUsers() {
    axios.get(`${this.server}/api/users/`)
    .then((response) => {
      this.setState({ users: response.data });
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleUserAdded(user) {
    let users = this.state.users.slice();
    users.push(user);
    this.setState({ users: users });
  }

  handleUserUpdated(user) {
    let users = this.state.users.slice();
    for (let i = 0, n = users.length; i < n; i++) {
      if (users[i]._id === user._id) {
        users[i].truck_num = user.truck_num;
        users[i].is_oos = user.is_oos;
        users[i].repair_type = user.repair_type;
        users[i].open_assign = user.open_assign;
        users[i].truck_type = user.truck_type;
        users[i].driver_code = user.driver_code;
        users[i].permit_type = user.permit_type;
        users[i].omni_serial = user.omni_serial;
        users[i].drivecam_serial = user.drivecam_serial;

        // users[i].email = user.email;
        // users[i].age = user.age;
        // users[i].gender = user.gender;
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(u => { return u._id !== user._id; });
    this.setState({ users: users });
  }

  // work on this! only two lines of code left to figure out before filtering is functional 11.28.2018
  // added TableUser.js import at the top of this page in hopes that Table.HeaderCell or Table.Body will work. 
 // 11.28.18 -- Last update to the below -- Console is still reading the includes line as undefined. Maybe do the trick right above where the user id is noted; u.id
  searchUsers(query){
    console.log("Our App knows the query: " + query);
    let users = this.state.users.filter((query) =>
    {
      // return TableUser.Table.HeaderCell.includes(query) || TableUser.Table.Body.includes(query)
      return Table.HeaderCell.includes(query) || Table.Body.includes(query)
      // return Table.HeaderCell.includes(query) || Table.Body.includes(query)
      // return Table.HeaderCell.includes(query) || Table.Body.includes(query)

    });
    console.log(users)
    this.setState({users: users})
  }

  render() {

    let online = this.state.online;
    let verb = (online <= 1) ? 'is' : 'are'; // linking verb, if you'd prefer
    let noun = (online <= 1) ? 'person' : 'people';

    return (
      <div>
        <div className='App'>
          <div className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            {/* <h1 className='App-intro'>Master Truck List</h1> */}

            <p><br></br>
              Update trucks based on the variables below. 
            </p>
            {/* <p>A simple records system using MongoDB, Express.js, React.js, and Node.js with real-time Create, Read, Update, and Delete operations using Socket.io.</p>
            <p>REST API was implemented on the back-end. Semantic UI React was used for the UI.</p>
            <p>
              <a className='social-link' href='https://github.com/cefjoeii' target='_blank' rel='noopener noreferrer'>GitHub</a> &bull; <a className='social-link' href='https://linkedin.com/in/cefjoeii' target='_blank' rel='noopener noreferrer'>LinkedIn</a> &bull; <a className='social-link' href='https://twitter.com/cefjoeii' target='_blank' rel='noopener noreferrer'>Twitter</a>
            </p>
            <a className='shirts' href='https://www.teepublic.com/user/codeweario' target='_blank' rel='noopener noreferrer'>
              <img src={shirts} alt='Programmer Shirts' /> 
              <span>Ad</span>
            </a> */}
          </div>
        </div>
        <Container>
          <ModalUser
            headerTitle='Add Driver'
            buttonTriggerTitle='Add Driver'
            buttonSubmitTitle='Add'
            buttonColor='green'
            onUserAdded={this.handleUserAdded}
            server={this.server}
            socket={this.socket}
          />
          <em id='online'>{`${online} ${noun} ${verb} online.`}</em>
          <SearchUser 
            searchUsers={this.searchUsers.bind(this)}
          />
          <TableUser
            onUserUpdated={this.handleUserUpdated}
            onUserDeleted={this.handleUserDeleted}
            users={this.state.users}
            server={this.server}
            socket={this.socket}
          />
        </Container>
        <br/>
      </div>
    );
  }
}

export default App;
