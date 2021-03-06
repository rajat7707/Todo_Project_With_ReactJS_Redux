import React from 'react';
import DatatableComponent from '../commonComponent/info_list';
import Edituserpopup from '../commonComponent/Edituserpopup';
import Flashmessage from '../commonComponent/flashmessage';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function Userlist() {

  // Used to Map the state same like mapStateToProps in class component :-
  const selector = useSelector( (state) => {
      return {
          flashMsg        : state.flashMsg,
          errorType       : state.errorType,
          usersData       : state.usersData,
          userPopup       : state.userPopup, 
      }
  });
  
  // Used to dispatch action same like mapDispatchToProps in class component :-
  const dispatchAction = useDispatch();

  selector.usersData.map((value, index) => {
      value.action = 
            <div className = "">
                <NavLink to = "#" onClick={((e) => dispatchAction({type : "EDIT", singleUserData: value, id : value.id}))} className="textInline" title="Edit" >Edit</NavLink>
                 <b style = {{marginLeft : "20px"}}>|</b>
                <NavLink to = "#" onClick={((e) => dispatchAction({type : "DELETE", id : value.id, deleteType : "USER"}))} className="textInline" title="Delete" style = {{marginLeft : "20px"}} >Delete</NavLink>
            </div>

      return value;
  });

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick = {((e) => dispatchAction({type : "SHOW_POPUP", popType: "USER_POP"}))}>Create User</button><br /><br />
      { selector.flashMsg !== "" && selector.flashMsg !== undefined && <Flashmessage flashMsg={selector.flashMsg} type = {selector.errorType} />}
      <DatatableComponent type = "userInfo" data = {selector.usersData} />
      { selector.userPopup && <Edituserpopup section = "ADD_USER_POP" />}
    </div>
  );
}
