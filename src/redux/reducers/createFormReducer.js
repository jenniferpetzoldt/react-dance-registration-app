const createFormReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_WHOLE_DATE':
            return action.payload;
        case 'ADD_FORM':
            return action.payload;
        case 'CLEAR_FORM':
            return state = {};
        default:
            return state;
    }
};

export default createFormReducer;