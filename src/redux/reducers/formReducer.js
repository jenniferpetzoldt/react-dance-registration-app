const formReducer = (state = [], action) => {
    switch (action.type) {
        case 'UPDATE_FORM_MONTHS':
            return action.payload;
        case 'SET_FORM_DATA':
            return action.payload;
        default:
            return state;
    }
};


export default formReducer;