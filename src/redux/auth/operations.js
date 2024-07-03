import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

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
      const { data: res } = await axios.post("/auth/register", credentials);

      if (res.data.token) {
        setAuthHeader(res.data.token);
      }

      toast.success(
        res.data.token ? "You are logged in!" : "Accaunt successfully created!"
      );

      return res.data;
    } catch (err) {
      console.log(err);
      toast.error(
        err.response.status === 409 ? "This email already in use!" : err.message
      );
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logIn = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const { data: res } = await axios.post("/auth/login", credentials, {
        withCredentials: true,
      });
      setAuthHeader(res.data.token);
      toast.success("You are logged in!");
      return res.data;
    } catch (err) {
      toast.error(
        err.response.status === 401
          ? "User not founded or password is incorrect"
          : err.message
      );
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const { data: res } = await axios.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    );
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
    try {
      const { data: res } = await axios.post(
        "/auth/refresh",
        {},
        { withCredentials: true }
      );

      setAuthHeader(res.data.token);
      toast.success("You are logged in!");

      return res.data;
    } catch (err) {
      // clearAuthHeader();
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
