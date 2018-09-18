const formReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_FORM':
            return action.payload;
        case 'CLEAR_FORM':
            return state = {};
        default:
            return state;
    }
};

export default formReducer;