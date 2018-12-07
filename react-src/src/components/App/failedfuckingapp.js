import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import axios from 'axios';
import io from 'socket.io-client';

import TableUser from '../TableUser/TableUser';
import ModalUser from '../ModalUser/ModalUser';

import logo from '../../siteLogo.png';
// import shirts from '../../shirts.png';
import './App.css';
// import SearchUser2 from '../FilterUser/SearchUser2';

// import FormUser from '../FormUser/FormUser.js';
// import SearchUser2 from '../FilterUser/SearchUser2.js';
// import { Table } from 'semantic-ui-react';



class App extends Component {

  constructor() {
    super();

    this.server = process.env.REACT_APP_API_URL || '';
    this.socket = io.connect(this.server);

    this.state = {
      users: [],
      online: 0,
      search: ''
      // allUsers: []
    }

    this.fetchUsers = this.fetchUsers.bind(this);
    this.handleUserAdded = this.handleUserAdded.bind(this);
    this.handleUserUpdated = this.handleUserUpdated.bind(this);
    this.handleUserDeleted = this.handleUserDeleted.bind(this);
    
    this.handleSearch = this.handleSearch.bind(this);

    // this.searchUsers = this.searchUsers.bind(this);
  }

  // Place socket.io code inside here
  componentDidMount() {
    this.fetchUsers();
    this.socket.on('visitor enters', data => this.setState({ online: data }));
    this.socket.on('visitor exits', data => this.setState({ online: data }));
    this.socket.on('add', data => this.handleUserAdded(data));
    this.socket.on('update', data => this.handleUserUpdated(data));
    this.socket.on('delete', data => this.handleUserDeleted(data));

    this.socket.on('filter', data => this.handleSearch(data));
  }



  // Fetch data from the back-end
  fetchUsers() {
    axios.get(`${this.server}/api/users/`)
    .then((response) => {
      this.setState({ users: response.data });
      // this.setState({ users: response.data, allUsers: response.data });


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
        break; // Stop this loop, we found it!
      }
    }
    this.setState({ users: users });
  }

  handleUserDeleted(user) {
    let users = this.state.users.slice();
    users = users.filter(u => { return u._id !== user._id; });
    this.setState({ 
      users: users 
    });
  }

//  searchUsers(query){
//   let users = this.state.allUsers.filter((user) => {
//          return user.truck_num.includes(query) || user.is_oos.includes(query) || user.repair_type.includes(query) || user.open_assign.includes(query) || user.truck_type.includes(query) || user.driver_code.includes(query) || user.permit_type.includes(query) || user.omni_serial.includes(query) || user.drivecam_serial.includes(query)
//         });
//         this.setState({ users: users  });
//  }

  handleSearch(event) {
    let users = this.state.users.slice();

    this.setState({search: event.target.value.substr(0,20)});
  }

  render() {

    let online = this.state.online;
    let verb = (online <= 1) ? 'is' : 'are'; // linking verb, if you'd prefer
    let noun = (online <= 1) ? 'person' : 'people';

    // new idea below ================
    let filteredUsers = this.props.users.filter(
      (user) => {
          return user.truck_num.indexOf(this.state.search) !== -1;
      }
  );
    // new idea above ================

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
          <div className="row">
          <div className="input-field">
              <label>Search: </label>
              <ul>
                  {filteredUsers.map((user)=> {
                      return <user user = {user} key={user.id}/>
                  })}
              </ul>
              <input type="text" value={this.state.search} onKeyUp={this.handleSearch.bind(this)}             server={this.server}
            socket={this.socket}/>
            </div>
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
          {/* <SearchUser2
              // onKeyUp={this.handleSearch.bind(this)}
              onKeyUp={this.handleSearch}
              server={this.props.server}
              socket={this.props.socket}
            /> */}
             <div className="row">
            <div className="input-field">
              <label>Search: </label>
              <ul>
                  {filteredUsers.map((user)=> {
                      return <user user = {user} key={user.id}/>
                  })}
              </ul>
              <input type="text" value={this.state.search} onKeyUp={this.handleSearch.bind(this)} server={this.server}
            socket={this.socket}/>
            </div>
          </div>
          <TableUser
            onUserUpdated={this.handleUserUpdated}
            onUserDeleted={this.handleUserDeleted}
              // onUserFiltered={this.searchUsers}
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
