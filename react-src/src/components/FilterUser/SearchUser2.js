
import React, { Component } from 'react';

let users = this.props.users; // trying to put users in the global scope to see if that helps



class SearchUser2 extends Component {

constructor (props) {
    super(props);
    this.state = {
        // data: this.props.data,
      search: ''
    };

    this.handleSearch = this.handleSearch.bind(this);

}
    handleSearch(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const truck_num = target.truck_num;

        this.setState({search: event.target.value}); // this was originally the only thing here
        this.setState({ [truck_num]: value });

    }

  
    render() {
        // users = users.map((user) => 
        // {user.truck_num});
        

// new and not working below 
        //   let users = this.props.users;
        users = users.slice().filter(

            // users = users.slice().filter(

            (user) =>
            {return user.truck_num.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1}

                    )

// old below
        let filteredUsers = this.props.users.filter(
            (user) => {
                // return user.truck_num.indexOf(this.state.search) !== -1;
                return user.truck_num.toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1
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
              <input type="text"
            //    value={this.props.search} 
               value={query} 
               onKeyUp={this.handleSearch.bind(this)}/>
            </div>
          </div>
        )
      }
    }
    
    export default SearchUser2;