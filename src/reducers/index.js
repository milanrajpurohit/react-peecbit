/*********************************
 REDUCER MODULES INITIALISATION
 **********************************/
import storage from 'redux-persist/lib/storage';
import { persistReducer }from 'redux-persist';

// Initial States
let initialState = {
    loggedInUser: {},
    token: "",
    products: [],
    categories: [{ id: 1, name: "Mobile" }, { id: 2, name: "Fashion" }, { id: 3, name: "Household"}]
};

// Conditions to decide how to change state
const rootReducer = (state = initialState, action) => {

    switch(action.type) {
        case 'ADD_PRODUCT':
            return {...state, products: [state.products, action.product]};
        case 'LOGGED_IN_USER':
            return {...state, loggedInUser: action.loggedinuser };
        case 'TOKEN':
            return {...state, token: action.token };
        case 'EDIT_USERPROFILE':
            return state;
        case 'PRODUCT_LIST':
            return {...state, products: action.products };
        default:
            return state;
    }

};

// Persist Configuration
const persistConfig = {
    key: 'root',
    storage: storage,
    blacklist: []
};

export default persistReducer(persistConfig, rootReducer);

