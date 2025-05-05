import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://api.leadnary.com/api/analytic";

// ───────────── Thunks ─────────────

// Optional: Call this from client side on visit
export const collectAnalytics = createAsyncThunk(
    "analytics/collect",
    async ({ siteId, sessionId, referrer, deviceType }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(`${API}/collectanalytic`, {
                siteId, sessionId, referrer, deviceType,
            });
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);

// Dashboard: get analytics summary for a siteId
export const getAnalyticsSummary = createAsyncThunk(
    "analytics/summary",
    async ({ siteId }, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API}/getanalytic`, {
                params: { siteId },
                withCredentials: true,
            });
            return { siteId, summary: data };
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);

// ───────────── Slice ─────────────

const analyticsSlice = createSlice({
    name: "analytics",
    initialState: { summary: { sites: {} }, loading: false },


    reducers: {},
    extraReducers: (b) =>
        b
            .addCase(getAnalyticsSummary.pending, state => { state.loading = true; })
            .addCase(getAnalyticsSummary.fulfilled, (state, action) => {
                state.loading = false;
                state.summary = action.payload.summary;
            })
            .addCase(getAnalyticsSummary.rejected, state => { state.loading = false; })
});

export default analyticsSlice.reducer;
