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