const adminInputReducer = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_ATTEND_MONTH_ID':
            return action.payload;
        default:
            return state;
    }
};

export default adminInputReducer;