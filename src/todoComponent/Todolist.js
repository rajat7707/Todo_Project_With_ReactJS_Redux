import React  from 'react';
import DatatableComponent from '../commonComponent/info_list'
import Edituserpopup from '../commonComponent/Edituserpopup';
import Flashmessage from '../commonComponent/flashmessage';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

export default function Todolist() {
  
  // Used to Map the state same like mapStateToProps in class component :-
  const selector = useSelector( (state) => {
      return {
          todoFlashMsg    : state.todoFlashMsg,
          errorType       : state.errorType,
          todosData       : state.todosData,
          userPopup       : state.userPopup, 
      }
  });
  
  // Used to dispatch action same like mapDispatchToProps in class component :-
  const dispatchAction = useDispatch();

  selector.todosData.map((value, index) => {
        value.action = <div className = "">
                            <NavLink to = "#" onClick={((e) => dispatchAction({type : "EDIT", singleTodoData: value, id : value.id}))} className="textInline" title="Edit" >Edit</NavLink>
                             <b style = {{marginLeft : "20px"}}>|</b>
                            <NavLink to = "#" onClick={((e) => dispatchAction({type : "DELETE", id: value.id, deleteType : "TODO"}))} className="textInline" title="Delete" style = {{marginLeft : "20px"}} >Delete</NavLink>
                        </div>
        return value;
  });

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick = {((e) => dispatchAction({type : "SHOW_POPUP", popType:"TODO_POP"}))}>Create Todo</button><br /><br />
      { selector.todoFlashMsg !== "" && selector.todoFlashMsg !== undefined && <Flashmessage flashMsg={selector.todoFlashMsg} type = {selector.errorType} />}
      <DatatableComponent type = "todosInfo" data = {selector.todosData} />
      { selector.userPopup && <Edituserpopup section = "ADD_TODO_POP" />}
    </div>
  );
}
