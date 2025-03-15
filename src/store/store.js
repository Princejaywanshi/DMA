import { configureStore } from '@reduxjs/toolkit';
import appReducer from "../slices/appSlice"
import  userReducer  from '../slices/userSlice';
const store = configureStore({
  reducer: {
    app: appReducer, // Add your reducers here
    user: userReducer ,
  },
  
});
console.log('Redux Store:', store.getState());
export default store;
