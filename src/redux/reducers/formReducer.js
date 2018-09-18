const formReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_FORM':
            return action.payload;
        default:
            return state;
    }
};

export default formReducer;