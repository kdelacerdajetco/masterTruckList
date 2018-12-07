import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import ModalUser from '../ModalUser/ModalUser';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

class TableUser extends Component {
  
  constructor () {
    super();
    this.state = {
      search: ''
    };
  }
    handleSearch(event) {
      this.setState({search: event.target.value.substr(0,20)});
    }

  render() {

    let users = this.props.users;
    let filteredUsers = this.props.users.filter(
      (user) => {
          return user.truck_num.indexOf(this.state.search) !== -1;
      }
  );
    users = users.map((user) => 

      <Table.Row key={user._id}>
        <Table.Cell>{user.truck_num}</Table.Cell>
        <Table.Cell>{user.is_oos}</Table.Cell>
        <Table.Cell>{user.repair_type}</Table.Cell>
        <Table.Cell>{user.open_assign}</Table.Cell>
        <Table.Cell>{user.truck_type}</Table.Cell>
        <Table.Cell>{user.driver_code}</Table.Cell>
        <Table.Cell>{user.permit_type}</Table.Cell>
        <Table.Cell>{user.omni_serial}</Table.Cell>
        <Table.Cell>{user.drivecam_serial}</Table.Cell>
        <Table.Cell>
          <ModalUser
            headerTitle='Edit User'
            buttonTriggerTitle='Edit'
            buttonSubmitTitle='Save'
            buttonColor='blue'
            userID={user._id}
            onUserUpdated={this.props.onUserUpdated}
            server={this.props.server}
            socket={this.props.socket}
          />
          <ModalConfirmDelete
            headerTitle='Delete User'
            buttonTriggerTitle='Delete'
            buttonColor='black'
            user={user}
            onUserDeleted={this.props.onUserDeleted}
            server={this.props.server}
            socket={this.props.socket}
          />
        </Table.Cell>
      </Table.Row>
    );

    // Make every new user appear on top of the list
    // users =  [...users].reverse();
    users =  [...users];
   

    return (
      

      <Table singleLine>

          
          <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Truck Number</Table.HeaderCell>
            <Table.HeaderCell>IS/OOS</Table.HeaderCell>
            <Table.HeaderCell>Repair Type</Table.HeaderCell>
            <Table.HeaderCell>Open/Assigned</Table.HeaderCell>
            <Table.HeaderCell>Truck Type</Table.HeaderCell>
            <Table.HeaderCell>Driver Name</Table.HeaderCell>
            <Table.HeaderCell>Permit Type</Table.HeaderCell>
            <Table.HeaderCell>Omni Serial</Table.HeaderCell>
            <Table.HeaderCell>Drive Cam Serial</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
        <div className="row">
      <div className="input-field">
        <label>Search: </label>
        <ul>
            {filteredUsers.map((user)=> {
                return <users user = {user} key={user.id}/>
            })}
        </ul>
        <input type="text" value={this.state.search} onKeyUp={this.handleSearch.bind(this)}/>
      </div>
    </div>    
          {users}
        </Table.Body>
      </Table>
    );
  }
}

export default TableUser;
