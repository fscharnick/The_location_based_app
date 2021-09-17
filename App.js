import React from "react";
import { enableScreens } from "react-native-screens";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import postReducer from "./store/post-reducer";
import authReducer from "./store/auth-reducer";
import ReduxThunk from "redux-thunk";

import MainNavigator from "./Navigation/MainNavigator";

enableScreens();

const rootReducer = combineReducers({
  posts: postReducer,
  auth: authReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
