import React, { Component } from 'react';
import { connect } from 'react-redux';

class Usermodel extends Component{

	state = {
		show : false,
		name : (this.props?.singleUserData?.name)   ? this.props.singleUserData.name  : "",
		email: (this.props?.singleUserData?.email) ? this.props.singleUserData.email : "",
	}

	handleInput = (e, type) => {
		
		if(type === "addUser" ){
			if(e.target.name === "email"){
				e.target.value = e.target.value.toLowerCase().trim(); // Email To Lower Case
			}else{
				e.target.value = e.target.value.replace(/[0-9]/g, '').charAt(0).toUpperCase() + e.target.value.slice(1); // Disallow numbers
			}
		}
		
		this.setState({[e.target.name] : e.target.value});
		this.props.handleInput(e, type);
	}

	render(){
		return (
			<div>
				<div className="form-group">
				  <label htmlFor="usr">Name<span style = {{color : "red"}}>*</span></label>
				  <input type="text" className="form-control" id="usr" name = "name" value = {this.state.name} onChange = {(e) => this.handleInput(e, "addUser")} />
				</div>

				<div className="form-group">
				  <label htmlFor="email">Email<span style = {{color : "red"}}>*</span></label>
				  <input type="text" className="form-control" id="email"  name = "email"  value = {this.state.email} onChange = {(e) => this.handleInput(e, "addUser")} />
				</div>
			</div>
		)
	}
}

const  mapStateToProps = (state) => {
    return {
    	singleUserData : state.singleUserData,
    }
}

const  mapDispatchToProps = (dispatch) => {
    return {
    	handleInput : (e, addType) => dispatch({type : "HANDLE_INPUT", inputField : e, addType : addType})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Usermodel);

