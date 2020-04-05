import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component{

  render(){
    return(
      <nav className="navbar navbar-expand-lg navbar-light bg-light card-header">
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" exact to = "/todos" activeStyle = {{color : "blue"}} >Todos</NavLink>
            <NavLink className="nav-item nav-link" exact to = "/user"  activeStyle = {{color : "blue"}}  >Users</NavLink>
          </div>           
      </nav>
    )
  }
}

export default Header;
