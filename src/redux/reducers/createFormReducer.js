const createFormReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_WHOLE_DATE':
            return {...state, date: action.payload};
        case 'ADD_MONTH':
            return {...state, month: action.payload};
        case 'ADD_YEAR':
            return {...state, year: action.payload};
        case 'ADD_FORM':
            return action.payload;
        case 'CLEAR_FORM':
            return state = {};
        default:
            return state;
    }
};

export default createFormReducer;