const initState = {};

const propertyReducer = (state = initState, action) => {
	switch (action.type) {
		case 'CREATE_PROPERTY':
			console.log('property created', action.id);
			return {
				...state,
				action: action
			};
		case 'CREATE_PROPERTY_ERROR':
			console.log('ERROR', action.err);
			return state;
		case 'LOAD_PROPERTY':
			console.log('property loaded', action.property);
			return {
				...state,
				initialValues: action.data
			};
		default:
			return state;
	}
};

export default propertyReducer;
