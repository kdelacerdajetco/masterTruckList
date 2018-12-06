// // second test
// <div id ="searchUserParent">
// <div className='container'>
//  {/* <FormUser handleSubmit={ this.handleSubmit.bind(this) }/>  */}
// <SearchUser />
//  {/* <TableUser 
//           handleUserDeleted={this.handleUserDeleted.bind(this)}
//           handleUserAdded={this.handleUserAdded.bind(this)}
//           handleUserUpdated={this.handleUserUpdated.bind(this)}/>  */}

// </div></div>
// // end second test -- 


// BEGIN RIGHT UNDER RENDER & RETURN ( ...)

<div className='container'>
<FormUser onUserAdded={this.onUserAdded.bind(this)}/>
        {/* <CreateIdeaForm saveIdea={ this.storeIdea.bind(this) }/> */}
        <SearchUser />
        {/* In the first trial, I am not going to include listing the current state of the users as this is already listed (perhaps) */}
        {/* Second test -- maybe put this under Table singleline in TableUser.js */}
        <Table onUserDeleted={this.onUserDeleted.bind(this)}
                onUserUpdated={this.onUserUpdated.bind(this)}
                />
        {/* <IdeaList ideas={this.state.ideas}
                  destroy={this.destroyIdea.bind(this)}
                  updateTitle={this.updateTitle.bind(this)}
                  updateBody={this.updateBody.bind(this)}/> */}
      </div>

// END OF THE SEARCH FUNCTIONING 

<div className='container'>
<FormUser handleUserAdded={this.handleUserAdded.bind(this)}/>
        {/* <CreateIdeaForm saveIdea={ this.storeIdea.bind(this) }/> */}
        <SearchUser />
        {/* In the first trial, I am not going to include listing the current state of the users as this is already listed (perhaps) */}
        {/* Second test -- maybe put this under Table singleline in TableUser.js */}
        <Table onUserDeleted={this.onUserDeleted.bind(this)}
                onUserUpdated={this.onUserUpdated.bind(this)}
                />
        {/* <IdeaList ideas={this.state.ideas}
                  destroy={this.destroyIdea.bind(this)}
                  updateTitle={this.updateTitle.bind(this)}
                  updateBody={this.updateBody.bind(this)}/> */}
      </div>




let users = this.state.fetchUsers.filter((user) =>
{
        return user.TableUser.Body.includes(query)
});
this.setSTate({users:users})



handleUserDeleted(user) {
        let users = this.state.users.slice();
       users.filter(user => { 
         return user.data.includes(query)
        });
        this.setState({ 
          users: users 
        });
      }

      users[i].is_oos = user.is_oos;
      users[i].repair_type = user.repair_type;
      users[i].open_assign = user.open_assign;
      users[i].truck_type = user.truck_type;
      users[i].driver_code = user.driver_code;
      users[i].permit_type = user.permit_type;
      users[i].omni_serial = user.omni_serial;
      users[i].drivecam_serial = user.drivecam_serial;

      
    
    // ==================
// let users = this.state.users.filter((user) =>
//     return user.data.includes(query)
//     console.log(users);
//     console.log(data);
//     this.setState({users: users});
// ==================

    // console.log("Our App knows the query: " + query);
    // users is not a function 
    // users(query);
    // let users = this.state.users.slice();
    // users = this.state.users.slice();
    // users = users.filter((users)  =>
    // let users = this.state.users.filter((query) =>
    // let tbody = this.state.TableUser;
    // let users = this.state.users.filter((user) =>
    // var users = users.filter((u => { return u._id !== user._id})
    // let users = users.filter((u => { return u._id !== user._id}) 
    // let user = this.state.user.filter((users) =>
    // let user = this.state.user.filter((users) =>
      // return TableUser.Table.HeaderCell.includes(query) || TableUser.Table.Body.includes(query)
      // return TableUser.HeaderCell.includes(query) || TableUser.Body.includes(query)
      // return Table.HeaderCell.includes(query) || Table.Body.includes(query)
      // return Table.HeaderCell.includes(query) || Table.Body.includes(query)
      // return Table.HeaderCell.includes(query) || Table.Body.includes(query)
      // closer... (right below)
      // return users.TableUser.Table.Body.includes(query
      // return user.includes(query)
      //the bottom is the closet to the solution. however, 'users' is not correct.
      // return users.body.includes(query)
      //most likely not the one below 
      // return users.user.includes(query)
    // console.log(users);
    // console.log(user);
    // console.log(handleUserUpdated);
