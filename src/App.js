import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Userlist from './userComponent/Userlist';
import Todolist from './todoComponent/Todolist';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './Header';

class App extends Component{

  render(){
    return(
      <BrowserRouter>
        <div className="container card">
          <Header />
          <div className  = "card-body">
            <Route path = "/" exact  strict component = { Userlist } />
            <Route path = "/todos" exact  strict component = { Todolist } />
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
