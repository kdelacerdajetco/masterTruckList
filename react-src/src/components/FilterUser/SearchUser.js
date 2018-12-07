import React, { Component } from 'react';
import axios from 'axios';

// import { Message, Button, Form, Select } from 'semantic-ui-react';


class SearchUser extends Component {

  //=============
  constructor(props){
   super(props);

  this.handleSearch = this.handleSearch.bind(this);

 }  
 
 //=============


  handleSearch(event) {
    // console.log("The search is being handled...")
    // console.log(event.target.value)

    let params = event.target.value
    // below works... but /api/users/whatever i type doesn't pull anything 
    // let params = e.target.value 
    // let params = e.target.getArribute('data-userID');
    axios({
      method: 'filter',
      responseType: 'json',
      url: `${this.props.server}/api/users/${params}`,
    })
    .then((response) => {
      this.props.SearchUsers(response.data.result);
      this.props.socket.emit('filter', response.data.result);
    })
    .catch((err) => {
      throw err;
    })

    // original below! 
    // this.props.searchUsers(event.target.value)
    // original above! 
  }

  render() {
    return (
      <div className="row">
        <div className="input-field">
          <label>Search: </label>
          <input type="text" onKeyUp={this.handleSearch.bind(this)}/>
        </div>
      </div>
    )
  }
}

export default SearchUser;