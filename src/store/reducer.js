
const initialState = {
	todosData : [{id : Math.random(), date : "2021-02-03", time: "14:01"}],
	singleTodoData : {id : 0, date : "", time: ""},
	userPopup : false,
	flashMsg : "",
	errorType : "bg-success",
	usersData : [{id : Math.random(), name : "Rajat", email: "rajat.srivastava7707@gmail.com"}],
	singleUserData : {id : 0, name : "", email: ""},
	showTodosSection : false,
	showUserSection : false,
	show : false,
	todoFlashMsg : ""
}

const reducer = (state = initialState , action) => {

	let  newState = {...state} ;

	if(action.type === "EDIT"){
		let userSection = false ;
		let todoSection = false ;
		(action.singleUserData) ? userSection = true  : userSection = false ;
		(action.singleTodoData) ? todoSection = true  : todoSection = false ;

		return  {
			newState,
			singleUserData 	 : action.singleUserData,
			show 			 : true,
			userPopup 		 : true,
			showUserSection  : userSection,
			showTodosSection : todoSection,
			usersData		 : newState.usersData,	
			singleTodoData   : action.singleTodoData,
			todosData		 : newState.todosData,
		}
	}

	if(action.type === "ADD_USER" && action.addType === "ADD_USER_POP"){

		if(newState?.singleUserData){
			if(newState.singleUserData.email === "" || newState.singleUserData.name === ""){
				console.log(newState.singleUserData);
				console.log(newState.usersData);
				return  {
					newState,
					usersData : newState.usersData,
					todosData : newState.todosData,
					flashMsg : `Fields Can not be Blank. Please fill all required fields`,
		        	errorType : "bg-danger" ,
				}
			}
		}

		// Check If Email already Exist:-
		let status = newState.usersData.some( (val) => {
            if(val.email === newState.singleUserData.email && val.id !== newState.singleUserData.id){
              return true ;
            }
        });

        if(status){
              return  {
				newState,
				usersData : newState.usersData,
				todosData : newState.todosData,
				flashMsg : `User already exist with `+newState.singleUserData.email+` email. Please try an unique email.`,
	        	errorType : "bg-danger" ,
			}
        }
        // End Of Check If Email already Exist:-

		if(newState.singleUserData.id !== 0){ // Edit  User
			let updatedData = newState.usersData.filter( (val) => {
				if( val.id === newState.singleUserData.id ){				
					val = newState.singleUserData ;
				}
				return val;
			});
			return  {
				newState,
				usersData : updatedData,
				todosData : newState.todosData,
				flashMsg : `User with email ` +newState.singleUserData.email+ ` Update successfully.`,
	        	errorType : "bg-success" ,
			}
		}else{  // Add User
			newState.singleUserData.id = Math.random();
			return  {
				newState,
				usersData : newState.usersData.concat([newState.singleUserData]),
				todosData : newState.todosData,
				flashMsg : `User with email ` +newState.singleUserData.email+ ` add successfully.`,
	        	errorType : "bg-success" ,
			}
		}			
	}else if(action.type === "ADD_USER" && action.addType === "ADD_TODO_POP"){


		if(newState?.singleTodoData){
			console.log(newState.singleTodoData);
			if(newState.singleTodoData.date === "" || newState.singleTodoData.time === ""){
				return  {
					newState,
					usersData : newState.usersData,
					todosData : newState.todosData,
					todoFlashMsg : `Fields Can not be Blank. Please fill all required fields`,
		        	errorType : "bg-danger" ,
				}
			}
		}

		if(newState.singleTodoData.id !== 0){ // Edit TOdo
			let updatedData = newState.todosData.filter( (val) => {
				if( val.id === newState.singleTodoData.id ){				
					val = newState.singleTodoData ;
				}
				return val;
			});
			return  {
				newState,
				usersData : newState.usersData,
				todosData : updatedData,
				todoFlashMsg : `Todo with date ` +newState.singleTodoData.date+ ` Update successfully.`,
	        	errorType : "bg-success" ,
			}
		}else{ // Add TOdo
			newState.singleTodoData.id = Math.random();
			return  {
				newState,
				usersData : newState.usersData,
				todosData : newState.todosData.concat([newState.singleTodoData]),
				todoFlashMsg : `Todo with date ` +newState.singleTodoData.date+ ` add successfully.`,
	        	errorType : "bg-success" ,
			}
		}	
	}


	if(action.type === "HANDLE_INPUT" && action.addType === "addUser" ){   // Handle Users inputs

		if(newState?.singleUserData?.id !== 0){
			newState.usersData.filter( (val) => {
				if( val.id === newState.singleUserData.id ){
				
					if(action.addType === "addUser" ){
						if(action.inputField.target.name === "email"){

							// If the email section is blank set it to initial state
							if(action.inputField.target.value === "" || action.inputField.target.value === undefined){
								newState.singleUserData.email = action.email ;
							}else{
								newState.singleUserData.email = action.inputField.target.value ;
							}
							
							return{
								newState,
								singleUserData : newState.singleUserData,
							}

						}else if(action.inputField.target.name === "name"){ // If the name section is blank set it to initial state

							if(action.inputField.target.value === "" || action.inputField.target.value === undefined){
								newState.singleUserData.name = action.name ;
							}else{
								newState.singleUserData.name = action.inputField.target.value ;
							}

							return{
								newState,
								singleUserData : newState.singleUserData,
							}
						}
					}
				}
			});
		}

		if(newState.singleUserData.id === 0){
			if(action.addType === "addUser" ){
				if(action.inputField.target.name === "email"){
					newState.singleUserData.email = action.inputField.target.value ;
				}else if(action.inputField.target.name === "name"){
					newState.singleUserData.name = action.inputField.target.value ;
				}
			}
		}	
	}

	if(action.type === "HANDLE_INPUT" && action.addType === "addTodo" ){  // Handle  TODO inputs
		if(newState?.singleTodoData?.id !== 0){
			newState.todosData.filter( (val) => {
				if( val.id === newState.singleTodoData.id ){

					if(action.addType === "addTodo" ){
						if(action.inputField.target.name === "date"){

							// If the date section is blank set it to initial state
							if(action.inputField.target.value === "" || action.inputField.target.value === undefined){
								newState.singleTodoData.date = action.date ;
							}else{
								newState.singleTodoData.date = action.inputField.target.value ;
							}

							return{
								newState,
								singleTodoData : newState.singleTodoData,
							}

						}else if(action.inputField.target.name === "time"){ // If the time section is blank set it to initial state

							if(action.inputField.target.value === "" || action.inputField.target.value === undefined){
								newState.singleTodoData.time = action.time ;
							}else{
								newState.singleTodoData.time = action.inputField.target.value ;
							}

							return{
								newState,
								singleTodoData : newState.singleTodoData,
							}
						}
					}
				}
			});
		}

		if(newState.singleTodoData.id === 0){
			if(action.addType === "addTodo" ){
				if(action.inputField.target.name === "date"){
					newState.singleTodoData.date = action.inputField.target.value ;
				}else if(action.inputField.target.name === "time"){
					newState.singleTodoData.time = action.inputField.target.value ;
				}
			}
		}	
	}

	if(action.type === "DELETE"){ // Delete
	    if (window.confirm("Are you sure. You Want to delete this record?")) {

	    	if(action.deleteType === "USER"){ // Delete User
	    		newState.usersData = newState.usersData.filter(value => value.id !== action.id);
	    		newState.flashMsg = "User's Record deleted successfully.";
	    	}else if(action.deleteType === "TODO"){ // Delete Todo
	    		newState.todosData = newState.todosData.filter(value => value.id !== action.id);
	    		newState.todoFlashMsg = "Todo's Record deleted successfully.";
	    	}
	        newState.errorType = "bg-danger" ;
	    }
	}

	if(action.type === "SHOW_POPUP"){ // Open Popup

		let userSection = false ;
		let todoSection = false ;
		(action.popType === "USER_POP") ? userSection = true  : userSection = false ;
		(action.popType === "TODO_POP") ? todoSection = true  : todoSection = false ;
		return {
			newState,
			userPopup 		: true ,
			show 			: true ,
			showUserSection : userSection ,
			showTodosSection: todoSection ,
			singleUserData  : {id : 0, name : "", email: ""},
			singleTodoData  : {id : 0, date : "", time: ""},
			usersData 		: newState.usersData,
			todosData 		: newState.todosData,
		}
	}

	if(action.type === "CLOSE_POP"){ // Close Popup
		return {
			newState,
			userPopup : false ,
			show : false ,
			showUserSection : false ,
			singleUserData : {id : 0, name : "", email: ""},
			singleTodoData  : {id : 0, date : "", time: ""},
			usersData : newState.usersData,
			todosData : newState.todosData,
			flashMsg : ""
		}
	}

	return  newState ;
}

export default reducer ;
