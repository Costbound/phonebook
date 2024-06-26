import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get("/contacts");
      return resp.data;
    } catch (err) {
      toast.error("Failed to get your contacts data!");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkAPI) => {
    try {
      const resp = await axios.post("/contacts", contact);
      toast.success(`Contact ${contact.name}successefully added`);
      return resp.data;
    } catch (err) {
      toast.error("Something going wrong! Please try again");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(`/contacts/${id}`);
      toast.success(`Contact ${resp.data.name} successfully removed`);
      return resp.data;
    } catch (err) {
      toast.error("Something going wrong! Please try again");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async ({ id, name, number }, thunkAPI) => {
    try {
      const resp = await axios.patch(`/contacts/${id}`, { name, number });
      const items = thunkAPI.getState().contacts.items;
      const oldName = items[items.findIndex((item) => item.id === id)].name;

      toast.success(`Contact ${oldName} successefully edited`);
      return resp.data;
    } catch (err) {
      toast.error("Something going wrong! Please try again");
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
