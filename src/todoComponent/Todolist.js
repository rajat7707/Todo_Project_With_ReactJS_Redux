import React  from 'react';
import DatatablePage from '../commonComponent/info_list'
import Edituserpopup from '../commonComponent/Edituserpopup';
import Flashmessage from '../commonComponent/flashmessage';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

function Todolist(props) {

  props.todosData.map((value, index) => {
        value.action = <div className = "">
                            <NavLink to = "#" onClick={(e) => props.handleEdit(e, value, value.id)} className="textInline" title="Edit" >Edit</NavLink>
                             <b style = {{marginLeft : "20px"}}>|</b>
                            <NavLink to = "#" onClick={(e) => props.handleDelete(e, value.id)} className="textInline" title="Delete" style = {{marginLeft : "20px"}} >Delete</NavLink>
                        </div>
        return value;
  });

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick = {(e) => props.showPopUp(e, "TODO_POP")}>Create Todo</button><br /><br />
      { props.todoFlashMsg !== "" && props.todoFlashMsg !== undefined && <Flashmessage flashMsg={props.todoFlashMsg} type = {props.errorType} />}
      <DatatablePage type = "todosInfo" data = {props.todosData} />
      { props.userPopup && <Edituserpopup section = "ADD_TODO_POP" />}
    </div>
  );
}

const  mapStateToProps = (state) => {
    return {
      todoFlashMsg    : state.todoFlashMsg,
      errorType       : state.errorType,
      todosData       : state.todosData,
      userPopup       : state.userPopup,
    }
}

const  mapDispatchToProps = (dispatch) => {
    return {
      handleEdit    : (e, value, id) => dispatch({type : "EDIT", singleTodoData: value, id : id}),
      handleDelete  : (e, id) => dispatch({type : "DELETE", id: id, deleteType : "TODO"}),
      showPopUp     : (e, popType) => dispatch({type : "SHOW_POPUP", popType:popType}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todolist);

