import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

import ModalUser from '../ModalUser/ModalUser';
import ModalConfirmDelete from '../ModalConfirmDelete/ModalConfirmDelete';

class TableUser extends Component {

  render() {

    let users = this.props.users;

    users = users.map((user) => 
      <Table.Row key={user._id}>
        <Table.Cell>{user.truck_num}</Table.Cell>
        <Table.Cell>{user.is_oos}</Table.Cell>
        <Table.Cell>{user.repair_type}</Table.Cell>
        <Table.Cell>{user.open_assign}</Table.Cell>
        <Table.Cell>{user.truck_type}</Table.Cell>
        <Table.Cell>{user.driver_code}</Table.Cell>
        <Table.Cell>{user.permit_type}</Table.Cell>
        <Table.Cell>{user.user_initial}</Table.Cell>
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
    users =  [...users].reverse();

    return (
      <Table singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Truck Number</Table.HeaderCell>
            <Table.HeaderCell>IS/OOS</Table.HeaderCell>
            <Table.HeaderCell>Repair Type</Table.HeaderCell>
            <Table.HeaderCell>Open/Assigned</Table.HeaderCell>
            <Table.HeaderCell>Truck Type</Table.HeaderCell>
            <Table.HeaderCell>Driver Code</Table.HeaderCell>
            <Table.HeaderCell>Permit Type</Table.HeaderCell>
            <Table.HeaderCell>User Initial</Table.HeaderCell>
            <Table.HeaderCell>Actions</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users}
        </Table.Body>
      </Table>
    );
  }
}

export default TableUser;
