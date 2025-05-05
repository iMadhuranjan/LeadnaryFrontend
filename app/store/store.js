import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice.js'
import pageSlice from './pageSlice.js'
import leadSlice from './leadSlice.js'
import analyticSlice from './analyticSlice.js'
import profileSlice from './profileSlice.js'
import supportSlice from './supportSlice.js'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        page: pageSlice,
        lead: leadSlice,
        analytic: analyticSlice,
        profile: profileSlice,
        support: supportSlice,
    }
})