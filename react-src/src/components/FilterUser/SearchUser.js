import React, { Component } from 'react';
// import { Message, Button, Form, Select } from 'semantic-ui-react';


class SearchUser extends Component {

  handleSearch(event) {
    // console.log("The search is being handled...")
    // console.log(event.target.value)
    this.props.searchUsers(event.target.value)
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