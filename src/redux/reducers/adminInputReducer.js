const adminInputReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ATTEND_MONTH_ID':
            return { ...state, formId: action.payload };
        case 'ADD_NEW_DANCER':
            return {...state, newDancer: action.payload}
        default:
            return state;
    }
};

export default adminInputReducer;