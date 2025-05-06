// store/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://api.leadnary.com/api/user";

// ────────── Async Thunks ──────────

// Fetch user profile
export const getProfile = createAsyncThunk(
    "profile/get",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API}/getprofile`, {
                withCredentials: true,
            });
            return data.profile;
        } catch (err) {
            console.error("getProfile error:", err); // <== ADD THIS
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);


// Update user profile
export const updateProfile = createAsyncThunk(
    "profile/update",
    async (updates, { rejectWithValue }) => {
        try {
            const { data } = await axios.put(`${API}/updateprofile`, updates, {
                withCredentials: true,
            });
            return data.user;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);

export const getPlanInfo = createAsyncThunk(
    "profile/getPlan",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await axios.get(`${API}/getuserplan`, {
                withCredentials: true,
            });
            return data;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);


export const verifyPayment = createAsyncThunk(
    "profile/verifyPayment",
    async ({ razorpay_payment_id, planType }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                "https://api.leadnary.com/api/payment/verify-payment",
                { razorpay_payment_id, planType },
                { withCredentials: true }
            );
            return data; // assuming it returns { success: true }
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);

// Change user password
export const changePassword = createAsyncThunk(
    "profile/changePassword",
    async ({ oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const { data } = await axios.post(
                `${API}/changepassword`,
                { oldPassword, newPassword },
                { withCredentials: true }
            );
            return data.message;
        } catch (err) {
            return rejectWithValue(err.response?.data || { message: err.message });
        }
    }
);


// ────────── Slice ──────────

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        loading: false,
        error: null,
        success: null,
        plan: null,
        planExpiresAt: null,
        planActive: false,
    },
    reducers: {
        resetStatus: (state) => {
            state.success = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
             })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(updateProfile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.profile = action.payload;
                state.success = "Profile updated successfully";
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(changePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(verifyPayment.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyPayment.fulfilled, (state, action) => {
                state.loading = false;
                state.success = "Plan upgraded successfully";
            })
            .addCase(verifyPayment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Verification failed";
            })

            .addCase(changePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload || "Password changed successfully";
            })
            .addCase(changePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.error || "Failed to change password";
            })
            .addCase(getPlanInfo.fulfilled, (state, action) => {
                state.plan = action.payload.plan;
                state.planExpiresAt = action.payload.planExpiresAt;
                state.planActive = action.payload.subscriptionActive;
            });
    },
});

export const { resetStatus } = profileSlice.actions;
export default profileSlice.reducer;
