import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Usermodel from '../userComponent/Usermodel' ;
import Todomodel from '../todoComponent/Todomodel' ;
import { connect } from 'react-redux';

class Edituserpopup extends Component{

	state = {
		addType : this.props.section
	}
	
	render(){
		return (
	
		    <Modal show={this.props.show} onHide={this.props.handleClose}>
		        <Modal.Header closeButton>
		          <Modal.Title>Modal heading</Modal.Title>
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
    	singleUserData : state.singleUserData
    }
}

const  mapDispatchToProps = (dispatch) => {
    return {
    	handleClose : () => dispatch({type : "CLOSE_POP"}),
    	addData : (e, addType) => dispatch({type : "ADD_USER", addType: addType}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Edituserpopup);