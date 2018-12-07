
import React, { Component } from 'react';
import TableUser from '../TableUser/TableUser';
// import axios from 'axios';


class SearchUser2 extends Component {

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
        let filteredUsers = this.props.users.filter(
            (user) => {
                return user.truck_num.indexOf(this.state.search) !== -1;
            }
        );
        return (
          <div className="row">
            <div className="input-field">
              <label>Search: </label>
              <ul>
                  {filteredUsers.map((user)=> {
                      return <user user = {user} key={user.id}/>
                  })}
              </ul>
              <input type="text" value={this.state.search} onKeyUp={this.handleSearch.bind(this)}/>
            </div>
          </div>
        )
      }
    }
    
    export default SearchUser2;

//     <SearchUser2
//     userID={user._id}
//     handleSearch={this.handleSearch.bind(this)}
//     server={this.props.server}
//     socket={this.props.socket}
//   />