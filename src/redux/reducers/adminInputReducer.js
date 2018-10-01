const adminInputReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ATTEND_MONTH_ID':
            return action.payload;
        case 'ADD_ID_TO_UPDATE':
        return {...state, regId: action.payload};
        default:
            return state;
    }
};

export default adminInputReducer;