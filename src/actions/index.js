/************************************************
 ACTION AND ACTION CREATORS DEFINATIONS FOR REDUX
 *************************************************/
import { SET_LOGIN_ERROR, SET_LOGIN_PENDING, SET_LOGIN_SUCCESS, TOKEN, LOGGED_IN_USER, ADD_PRODUCT, PRODUCT_LIST, } from '../constants';

// Dispatch an Action Before Login
export const setLoginPending = (isLoginPending) => {

    const action = {
        type: SET_LOGIN_PENDING,
        isLoginPending
    };

    return action;
}

// Dispatch an Action After Login
export const setLoginSuccess = (isLoginSuccess) => {

    const action = {
        type: SET_LOGIN_SUCCESS,
        isLoginSuccess
    }

    return action;
}

// Dispatch an Action In Case Of Error While Login
export const setLoginError = (loginError) => {

    const action = {
        type: SET_LOGIN_ERROR,
        loginError
    }

    return action;
}

// Dispatch an Action To Set Token After Login
export const token = (token) => {

    const action = {
        type: TOKEN,
        token
    }

    return action;
}

// Dispatch an Action After Login To Save LoggedInUser
export const loggedInUser = (loggedinuser) => {

    const action = {
        type: LOGGED_IN_USER,
        loggedinuser
    }

    return action;
}

// Dispatch an Action To Save Product
export const addProduct = (product) => {

    const action = {
        type: ADD_PRODUCT,
        product
    }

    return action;
}

// Dispatch an Action To Save List of Products
export const productsList = (products) => {

    const action = {
        type: PRODUCT_LIST,
        products
    }

    return action;
}
