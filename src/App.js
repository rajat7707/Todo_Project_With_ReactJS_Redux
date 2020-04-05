import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Userlist from './userComponent/Userlist';
import Todolist from './todoComponent/Todolist';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Header from './Header';

class App extends Component{

  state = {
    showRedirect : false,
  }
  componentWillMount(){ // Redirect to dafault route if user put an invalid URL
    if(window.location.pathname !== "/user" && window.location.pathname !== "/todos"){
      this.setState({showRedirect : true})
    }
  }

  render(){
    return(
      <BrowserRouter>
        <div className="container card">
          <Header />
          <div className  = "card-body">
  
            { this.state.showRedirect && <Redirect to = "/user" />}
            <Route path = "/user" exact  strict component = { Userlist } />
            <Route path = "/todos" exact  strict component = { Todolist } />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
