import React from 'react';
import DatatablePage from '../commonComponent/info_list';
import Edituserpopup from '../commonComponent/Edituserpopup';
import Flashmessage from '../commonComponent/flashmessage';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function Userlist(props) {

  props.usersData.map((value, index) => {
      value.action = 
            <div className = "">
                <NavLink to = "#" onClick={(e) => props.handleEdit(e, value, value.id)} className="textInline" title="Edit" >Edit</NavLink>
                 <b style = {{marginLeft : "20px"}}>|</b>
                <NavLink to = "#" onClick={(e) => props.handleDelete(e, value.id)} className="textInline" title="Delete" style = {{marginLeft : "20px"}} >Delete</NavLink>
            </div>

      return value;
  });

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick = {(e) => props.showPopUp(e, "USER_POP")}>Create User</button><br /><br />
      { props.flashMsg !== "" && props.flashMsg !== undefined && <Flashmessage flashMsg={props.flashMsg} type = {props.errorType} />}
      <DatatablePage type = "userInfo" data = {props.usersData} />
      { props.userPopup && <Edituserpopup section = "ADD_USER_POP" />}
    </div>
  );
}

const  mapStateToProps = (state) => {
    return {
      flashMsg        : state.flashMsg,
      errorType       : state.errorType,
      usersData       : state.usersData,
      userPopup       : state.userPopup,
    }
}

const  mapDispatchToProps = (dispatch) => {
    return {
      handleEdit    : (e, value, id) => dispatch({type : "EDIT", singleUserData: value, id : id}),
      handleDelete  : (e, id) => dispatch({type : "DELETE", id: id, deleteType : "USER"}),
      showPopUp     : (e, popType) => dispatch({type : "SHOW_POPUP", popType:popType}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Userlist);
