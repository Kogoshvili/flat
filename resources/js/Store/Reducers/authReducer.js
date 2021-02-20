const initState = {
	authError: null
};

const authReducer = (state = initState, action) => {
	switch (action.type) {
		case 'LOGIN_ERROR':
			console.log('LOGGIN ERROR');
			return {
				...state,
				authError: 'Login failed'
			};
		case 'LOGIN_SUCCESS':
			console.log('LOGGIN SECCESS');
			return {
				...state,
				authError: null
			};
		case 'SIGNOUT_SUCCESS':
			console.log('SIGNOUT');
			return {
				state
			};
		case 'SIGNUP_SUCCESS':
			console.log('singup sucess');
			return {
				...state,
				authError: null
			};
		case 'SIGNUP_ERROR':
			console.log('SIGNUP ERROR');
			return {
				...state,
				authError: action.err
			};
		case 'LOAD_SUCCESS':
			console.log('LOAD_SUCCESS', action);
			return {
				...state,
				data: action.info
			};
		case 'EDIT_SUCCESS':
			console.log('EDIT_SUCCESS');

			return {
				...state
			};
		default:
			return {
				...state
			};
	}
};

export default authReducer;
