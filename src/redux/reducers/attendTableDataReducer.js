const attendTableDataReducer = (state = [], action) => {
    switch (action.type) {
        case 'ADD_ATTEND_DATA':
            return action.payload;
        default:
            return state;
    }
};

export default attendTableDataReducer;