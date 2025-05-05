import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ─────────────── Thunk: Raise Ticket ───────────────

export const raiseTicket = createAsyncThunk(
    "support/raiseTicket",
    async ({ subject, message }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "https://api.leadnary.com/api/support/contact",
                { subject, message },
                { withCredentials: true }
            );
            return data.ticket;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Ticket submission failed" });
        }
    }
);


export const getMyTickets = createAsyncThunk(
    "support/getMyTickets",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(
                "https://api.leadnary.com/api/support/my-tickets",
                { withCredentials: true }
            );
            return data.tickets;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: "Failed to fetch tickets" });
        }
    }
);



// ─────────────── Slice ───────────────

const supportSlice = createSlice({
    name: "support",
    initialState: {
        ticket: null,
        loading: false,
        error: null,
        success: null,
        tickets: [],

    },
    reducers: {
        resetSupportState: (state) => {
            state.ticket = null;
            state.loading = false;
            state.error = null;
            state.success = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(raiseTicket.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(raiseTicket.fulfilled, (state, action) => {
                state.loading = false;
                state.ticket = action.payload;
                state.success = "Support ticket submitted successfully";
            })
            .addCase(raiseTicket.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to submit ticket";
            })
            .addCase(getMyTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMyTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.tickets = action.payload;
            })
            .addCase(getMyTickets.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Could not load tickets";
            });
        ;
    },
});

export const { resetSupportState } = supportSlice.actions;
export default supportSlice.reducer;
