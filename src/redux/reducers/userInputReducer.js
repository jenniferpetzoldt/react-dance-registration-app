const userInputReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_PERSONAL_INFO':
            return [...state, action.payload];
        case 'ADD_LESSONS':
            return[...state, action.payload];
        default:
            return state;
    }
};

export default userInputReducer;