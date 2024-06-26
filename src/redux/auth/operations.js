import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

axios.defaults.baseURL = "https://connections-api.herokuapp.com";
axios.defaults.headers.common["Content-Type"] = "application/json";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};

export const register = createAsyncThunk(
  "auth/register",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/signup", credentials);
      setAuthHeader(res.data.token);
      toast.success("You are logged in!");
      return res.data;
    } catch (err) {
      toast.error(
        err.response.status === 400
          ? "This email already registered or entered data is not valid"
          : err.message
      );
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post("/users/login", credentials);
      setAuthHeader(res.data.token);
      toast.success("You are logged in!");
      return res.data;
    } catch (err) {
      toast.error(
        err.response.status === 400
          ? "User not founded or password is incorrect"
          : err.message
      );
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await axios.post("/users/logout");
    clearAuthHeader();
    toast("You are logged out!");
    return res.data;
  } catch (err) {
    toast.error(err.message);
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    const persistedToken = thunkAPI.getState().auth.token;
    try {
      setAuthHeader(persistedToken);
      const res = await axios.get("/users/current");
      toast.success("You are logged in!");

      return res.data;
    } catch (err) {
      clearAuthHeader();
      return thunkAPI.rejectWithValue(err.message);
    }
  },
  {
    condition(_, thunkAPI) {
      const persistedToken = thunkAPI.getState().auth.token;
      return persistedToken !== null;
    },
  }
);
