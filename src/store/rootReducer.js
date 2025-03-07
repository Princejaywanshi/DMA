import { combineReducers } from '@reduxjs/toolkit';

// Import all reducers here
import counterReducer from '../slices/counterSlice';
import usersReducer from '../slices/usersSlice';
import appReducer from '../slices/appSlice';
import userLogin from '../slices/loginUser';
import ShowLoader from '../slices/loaderSlice';

// Combine all reducers into a single state object
const rootReducer = combineReducers({
  // counter: counterReducer,
  // userLogin: userLogin,
  // users: usersReducer,
  app: appReducer,
  // ShowLoader: ShowLoader,
});

export default rootReducer;

