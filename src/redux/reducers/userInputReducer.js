const userInputReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_PERSONAL_INFO':
            return { ...state, personalInfo: action.payload };
        case 'ADD_LESSONS':
            return { ...state, lessons: action.payload };
        case 'ADD_PAYMENT':
            return { ...state, payment: action.payload };
        default:
            return state;
    }
};

export default userInputReducer;