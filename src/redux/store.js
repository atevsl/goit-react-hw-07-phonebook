import { configureStore } from '@reduxjs/toolkit';
import { contactListSliceReducer } from '../redux/features/contactListSlice';
import { filterSliceReducer } from './features/filterSlice';

export const store = configureStore({
  reducer: {
    contactList: contactListSliceReducer,
    filter: filterSliceReducer,
  },
});
