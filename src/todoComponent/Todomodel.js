import React, { Component } from 'react';
import { connect } from 'react-redux';

class Todomodel extends Component{state
	state = {
		show : false,
		date : (this.props?.singleTodoData?.date)   ? this.props.singleTodoData.date  : "",
		time : (this.props?.singleTodoData?.time)    ? this.props.singleTodoData.time 	  : "",
	}

	handleInput = (e, type) => {
		this.setState({[e.target.name] : e.target.value});
		this.props.handleInput(e, type);
	}


	render(){
		return (
			<div>
				<div className="form-group">
				  <label htmlFor="date">Date<span style = {{color : "red"}}>*</span></label>
				  <input type="date" className="form-control" id="date"  name = "date" value = {this.state.date} onChange = {(e) => this.handleInput(e, "addTodo")} />
				</div>

				<div className="form-group">
				  <label htmlFor="time">Time<span style = {{color : "red"}}>*</span></label>
				  <input type="time" className="form-control" id="time"  name = "time"  value = {this.state.time} onChange = {(e) => this.handleInput(e, "addTodo")} />
				</div>
			</div>
		)

	}
}


const mapStateToProps = (state) => {
	return {
    	singleTodoData : state.singleTodoData,
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
    	handleInput : (e, addType) => dispatch({type : "HANDLE_INPUT", inputField : e, addType : addType})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todomodel);

