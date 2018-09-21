const userInputReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_FORM_ID':
            return { ...state, formId: action.payload };
        case 'ADD_PERSONAL_INFO':
            return { ...state, userInfo: action.payload };
        case 'ADD_FIRST_HOUR':
            return { ...state, firstHour: action.payload };
        case 'ADD_SECOND_HOUR':
            return { ...state, secondHour: action.payload };
        case 'ADD_PAYMENT':
            return { ...state, payment: action.payload };
        default:
            return state;
    }
};

export default userInputReducer;