import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://api.leadnary.com/api/page";


export const createLandingPage = createAsyncThunk(
  "page/create",
  async ({ template, data, subdomain }, { rejectWithValue }) => {
    try {
      const { data: res } = await axios.post(
        `${API}/create`,
        { template, data, subdomain },
        { withCredentials: true }
      );
      return res;                                  // { success, page, … }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const updateLandingPage = createAsyncThunk(
  "page/update",
  async ({ template, data, subdomain }, { rejectWithValue }) => {
    try {
      const { data: res } = await axios.put(
        `${API}/edit`,
        { template, data, subdomain },
        { withCredentials: true }
      );
      return res;                                  // { success, page }
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const getLandingPageData = createAsyncThunk(
  "page/getOne",                                   // ← one single, canonical name
  async ({ subdomain }, { rejectWithValue }) => {
    try {
      const { data: res } = await axios.post(
        `${API}/getdata`,
        { subdomain },
        { withCredentials: true }
      );
      return res.page;                             // { template, data, subdomain } | null
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const toggleLandingPage = createAsyncThunk(
  "page/toggle",
  async ({ subdomain, active }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        "https://api.leadnary.com/api/page/toggle",
        { subdomain, active },
        { withCredentials: true }
      );
      return data.page;                       // updated doc
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

export const fetchMyPages = createAsyncThunk(
  "pageList/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        "https://api.leadnary.com/api/page/mine",
        { withCredentials: true }
      );                             // data.pages = [...]
      return data.pages;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: err.message });
    }
  }
);

/* ───────────── slice ───────────── */

const initialState = {
  landingPage: null,
  loading: false,
  error: null,
  pages: [],
  leads: [],
  status: { count: 0, limit: 0, remaining: 0 },
};

const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {},
  extraReducers: (b) =>
    b
      .addCase(createLandingPage.pending, (st) => { st.loading = true; st.error = null; })
      .addCase(createLandingPage.fulfilled, (st, { payload }) => {
        st.loading = false;
        st.landingPage = payload.page;
        st.status = { count: payload.count, limit: payload.limit, remaining: payload.remaining };
      })
      .addCase(createLandingPage.rejected, (st, { payload }) => {
        st.loading = false; st.error = payload;
      })

      /* update */
      .addCase(updateLandingPage.pending, (st) => { st.loading = true; st.error = null; })
      .addCase(updateLandingPage.fulfilled, (st, { payload }) => {
        st.loading = false; st.landingPage = payload.page;
      })
      .addCase(updateLandingPage.rejected, (st, { payload }) => {
        st.loading = false; st.error = payload;
      })

      /* fetch one */
      .addCase(getLandingPageData.pending, (st) => { st.loading = true; st.error = null; })
      .addCase(getLandingPageData.fulfilled, (st, { payload }) => {
        st.loading = false; st.landingPage = payload;
      })
      .addCase(getLandingPageData.rejected, (st, { payload }) => {
        st.loading = false; st.error = payload;
      })
      .addCase(toggleLandingPage.fulfilled, (st, { payload }) => {
        if (st.landingPage && st.landingPage._id === payload._id) {
          st.landingPage.active = payload.active;
        }
      })
      .addCase(fetchMyPages.pending, (st) => { st.loading = true; st.error = null; })
      .addCase(fetchMyPages.fulfilled, (st, { payload }) => { st.loading = false; st.pages = payload; })
      .addCase(fetchMyPages.rejected, (st, { payload }) => { st.loading = false; st.error = payload; })
});

export default pageSlice.reducer;
