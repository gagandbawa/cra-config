const initialState = {
	isAuthenticated: false,
	user: {},
	loading: false,
};

export const rootReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'SET_CURRENT_USER':
			return {
				...state,
				user: action.payload,
			};
		default:
			return state;
	}
};
