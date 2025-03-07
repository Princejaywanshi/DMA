import { configureStore } from '@reduxjs/toolkit';
import appReducer from '../slices/appSlice'; // Import your appSlice reducer

const store = configureStore({
  reducer: {
    app: appReducer, // Add your reducers here
  },
  
});
console.log('Redux Store:', store.getState());
export default store;
