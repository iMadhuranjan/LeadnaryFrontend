import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://api.leadnary.com/api/lead";

/* ───────────── Async Thunks ───────────── */

// Create a new lead
export const createLead = createAsyncThunk(
    "lead/create",
    async ({ name,
        email,
        phone,         // if you have it
        message,
        websiteUrl,
        subdomain,
        utmSource,
        utmMedium,
        utmCampaign,
        utmTerm,
        utmContent, }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${API}/capture`,
                {
                    name,
                    email,
                    phone,         // if you have it
                    message,
                    websiteUrl,
                    subdomain,
                    utmSource,
                    utmMedium,
                    utmCampaign,
                    utmTerm,
                    utmContent,
                },
                { withCredentials: true }
            );
            return data; // { success: true, leadId }
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);

// Fetch all leads for the logged-in user
export const fetchUserLeads = createAsyncThunk(
    "lead/fetchAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${API}/viewleads`,
                {},
                { withCredentials: true }
            );
            return data.leads; // array of leads
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);



/* ─── NEW ❶ update quality ─────────────────────────────── */
export const updateLeadQuality = createAsyncThunk(
    "lead/updateQuality",
    async ({ leadId, quality }, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(
                `${API}/update-quality`,
                { leadId, quality },
                { withCredentials: true }
            );
            return data.lead;                       // updated lead object
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);

/* ─── NEW ❷ delete lead ───────────────────────────────── */
export const deleteLead = createAsyncThunk(
    "lead/delete",
    async (leadId, { rejectWithValue }) => {
        try {
            await axios.delete(`${API}/${leadId}`, { withCredentials: true });
            return leadId;                          // just return id to remove from state
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);



/* ───────────── Slice ───────────── */

const initialState = {
    leads: [],
    creating: false,
    fetching: false,
    updating: false,
    deleting: false,
    createError: null,
    fetchError: null,
    updateError: null,
    deleteError: null,
    createSuccess: false,
};

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {
        resetCreateState(state) {
            state.creating = false;
            state.createError = null;
            state.createSuccess = false;
        }
    },
    extraReducers: (builder) => {
        builder
            /* Create lead */
            .addCase(createLead.pending, (state) => {
                state.creating = true;
                state.createError = null;
                state.createSuccess = false;
            })
            .addCase(createLead.fulfilled, (state) => {
                state.creating = false;
                state.createSuccess = true;
            })
            .addCase(createLead.rejected, (state, { payload }) => {
                state.creating = false;
                state.createError = payload?.message || "Failed to create lead.";
            })

            /* Fetch user leads */
            .addCase(fetchUserLeads.pending, (state) => {
                state.fetching = true;
                state.fetchError = null;
            })
            .addCase(fetchUserLeads.fulfilled, (state, { payload }) => {
                state.fetching = false;
                state.leads = payload;
            })
            .addCase(fetchUserLeads.rejected, (state, { payload }) => {
                state.fetching = false;
                state.fetchError = payload?.message || "Failed to fetch leads.";
            })
            .addCase(updateLeadQuality.pending, (s) => { s.updating = true; s.updateError = null; })
            .addCase(updateLeadQuality.fulfilled, (s, { payload }) => {
                s.updating = false;
                const idx = s.leads.findIndex((l) => l._id === payload._id);
                if (idx !== -1) s.leads[idx] = payload;
            })
            .addCase(updateLeadQuality.rejected, (s, { payload }) => { s.updating = false; s.updateError = payload?.message; })

            /* NEW delete lead */
            .addCase(deleteLead.pending, (s) => { s.deleting = true; s.deleteError = null; })
            .addCase(deleteLead.fulfilled, (s, { payload }) => {
                s.deleting = false;
                s.leads = s.leads.filter((l) => l._id !== payload);
            })
            .addCase(deleteLead.rejected, (s, { payload }) => { s.deleting = false; s.deleteError = payload?.message; })

    },
});

export const { resetCreateState } = leadSlice.actions;
export default leadSlice.reducer;
