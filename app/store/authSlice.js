"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  token: null,
};

export const registerUser = createAsyncThunk(
  "/auth/register",

  async ({ username, email, password }) => {
    try {
      const result = await axios.post(
        `https://api.leadnary.com/api/auth/register`,
        { username, email, password },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const VerifyOtp = createAsyncThunk(
  "/verify/otp",
  async ({ email, code }) => {
    try {
      const result = await axios.post(
        `https://api.leadnary.com/api/auth/verify`,
        { email, code },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      return error?.response?.data;
    }
  }
);

export const resendOtp = createAsyncThunk("/resend/otp", async ({ email }) => {
  try {
    const result = await axios.post(
      `https://api.leadnary.com/api/auth/otp`,
      { email },
      { withCredentials: true }
    );
    return result.data;
  } catch (error) {
    return error?.response?.data;
  }
});

export const loginUser = createAsyncThunk(
  "/auth/login",
  async ({ email, password }) => {
    try {
      const result = await axios.post(
        `https://api.leadnary.com/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      return error?.response?.data;
    }
  });

export const ForgetPassword = createAsyncThunk('/forget-password', async ({ email, code }) => {
  try {
    const result = await axios.post(
      `https://api.leadnary.com/api/auth/forget`,
      { email, code },
      { withCredentials: true }
    );
    return result.data;
  } catch (error) {
    return error?.response?.data;
  }
});

export const authUser = createAsyncThunk("/auth/user", async () => {
  try {
    const result = await axios.get(
      "https://api.leadnary.com/api/auth/authuser",
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
    return result?.data;
  } catch (error) {
    return error.response?.data;
  }
});

export const logoutUser = createAsyncThunk("/auth/logout", async () => {
  try {
    const result = await axios.get(
      "https://api.leadnary.com/api/auth/logout",
      {
        withCredentials: true,
        headers: {
          "Cache-Control": "no-cache",
        },
      }
    );
     return result?.data;
  }
  catch (error) {
    return error?.response?.data;
  }
});


// authSlice.js  –  thunk
export const setUserSubdomain = createAsyncThunk(
  "/user/setSubdomain",
  async (subdomain, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        "https://api.leadnary.com/api/auth/subdomain",
        { subdomain },
        { withCredentials: true }
      );
      return res.data;           // {success, msg, subdomains}
    } catch (err) {
      // always return string
      const msg =
        err?.response?.data?.msg ||
        err?.response?.data?.message ||
        "Something went wrong";
      return rejectWithValue(msg);
    }
  }
);


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },


  extraReducers: (builder) =>
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(VerifyOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(VerifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = action.payload.user;
      })
      .addCase(VerifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        //  state.user = {
        //   ...action.payload.user,
        //   subdomains: action.payload.user.subdomains || []
        // }
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(ForgetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(ForgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(ForgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      }).addCase(authUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = action?.payload?.success;
        state.user = action?.payload?.success ? action?.payload?.user : null;
      })
      .addCase(authUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(setUserSubdomain.pending, (state) => {
        state.loading = true;
      })
      .addCase(setUserSubdomain.fulfilled, (state, action) => {
        state.loading = false;
        if (state.user && action.payload?.subdomains) {
          state.user.subdomains = action.payload.subdomains;
        }
      })
      .addCase(setUserSubdomain.rejected, (state, action) => {
        state.loading = false;
      })
});

export default authSlice.reducer;

export const { setUser } = authSlice.actions;
