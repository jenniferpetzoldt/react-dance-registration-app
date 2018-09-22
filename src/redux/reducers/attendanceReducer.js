const attendanceReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_ATTEND_MONTHS':
            return action.payload;
        default:
            return state;
    }
};

export default attendanceReducer;