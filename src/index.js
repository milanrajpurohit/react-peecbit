/************************************************
 REACT AND REDUX DEPENDENT MODULES INITIALISATION
 *************************************************/
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import rootReducer from './reducers/index';
import { BrowserRouter, Route } from "react-router-dom";
import LogIn from './components/LogIn';
import CreateProduct from './components/CreateProduct';
import Product from './components/Product';
import './App.css';

// Persistent Configuration
const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
};

// To show all redux store states in the redux dev tool
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Persistor Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store for Application and Persistor
const store = createStore(persistedReducer, composeEnhancers(
    applyMiddleware(thunk)
));
const persistor = persistStore(store);

// Routing and Provide store to every component
ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={LogIn} />
                    <Route path="/login" component={LogIn} />
                    <Route path="/products" component={Product} />
                    <Route path="/createProduct" component={CreateProduct} />
                </div>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById("root")
)