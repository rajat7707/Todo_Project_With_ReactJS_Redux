import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Usermodel from '../userComponent/Usermodel' ;
import Todomodel from '../todoComponent/Todomodel' ;
import { connect } from 'react-redux';

class Edituserpopup extends Component{

	state = {
		addType : this.props.section,
		heading : "",
	}

	UNSAFE_componentWillMount(){
		if(this.props.section === "ADD_TODO_POP" && this.props.singleTodoData.time !== "" && this.props.singleTodoData !== undefined){
			this.setState({heading : "Edit Todo"}) ;
		}else if(this.props.section === "ADD_TODO_POP"){
			this.setState({heading : "Add Todo"}) ;
		}else if(this.props.section === "ADD_USER_POP" && this.props.singleUserData.email !== "" && this.props.singleUserData !== undefined){
			this.setState({heading : "Edit User"}) ;
		}else if(this.props.section === "ADD_USER_POP"){
			this.setState({heading : "Add User"}) ;
		}	
	}
	
	
	render(){
		return (
	
		    <Modal show={this.props.show} onHide={this.props.handleClose}>
		        <Modal.Header closeButton>
		          <Modal.Title>{this.state.heading}</Modal.Title>
		        </Modal.Header>

		        <Modal.Body>
			        { this.props.showUserSection  && <Usermodel /> }
			        { this.props.showTodosSection && <Todomodel />}
		        </Modal.Body>

		        <Modal.Footer>
		          <Button variant="secondary" onClick={this.props.handleClose}>
		            Close
		          </Button>
		          <Button variant="primary" onClick={ (e) => this.props.addData(e, this.state.addType)}>
		            Save Changes
		          </Button>
		        </Modal.Footer>
		     </Modal>
		)
	}
}

const  mapStateToProps = (state) => {
    return {
    	showUserSection : state.showUserSection,
    	showTodosSection : state.showTodosSection,
    	show : state.show,
    	singleUserData : state.singleUserData,
    	singleTodoData : state.singleTodoData
    }
}

const  mapDispatchToProps = (dispatch) => {
    return {
    	handleClose : () => dispatch({type : "CLOSE_POP"}),
    	addData : (e, addType) => dispatch({type : "ADD_USER", addType: addType}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edituserpopup);
