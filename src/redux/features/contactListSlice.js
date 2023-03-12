import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://640b765265d3a01f981b8c76.mockapi.io/';

export const fetchContactList = createAsyncThunk(
  'contactList/fetchContactList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/contacts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const postContacts = createAsyncThunk(
  'contactList/postContacts',
  async (newContact, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/contacts`, newContact);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contactList/deleteContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const contactListSlice = createSlice({
  name: 'contactList',
  initialState: { contactList: [], isLoading: false, error: null },
  extraReducers: {
    [fetchContactList.pending]: state => {
      state.isLoading = true;
    },
    [fetchContactList.fulfilled]: (state, { payload }) => {
      state.contactList = payload;
      state.isLoading = false;
      state.error = null;
    },

    [fetchContactList.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [postContacts.pending]: state => {
      state.isLoading = true;
    },
    [postContacts.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.contactList.push(payload);
    },

    [postContacts.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
    [deleteContact.pending]: state => {
      state.isLoading = true;
    },
    [deleteContact.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      const index = state.contactList.findIndex(
        contact => contact.id === payload.id
      );
      state.contactList.splice(index, 1);
    },

    [deleteContact.rejected]: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

export const contactListSliceReducer = contactListSlice.reducer;

// selectors:
export const selectContactList = state => state.contactList.contactList;
export const selectIsLoading = state => state.contactList.isLoading;
export const selectError = state => state.contactList.error;
