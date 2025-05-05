"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { authUser } from "./authSlice";

const AuthInitializer = () => {
    const dispatch = useDispatch();
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.startsWith("/dashboard") || pathname.startsWith("/login") || pathname.startsWith("/register")) {
            dispatch(authUser());
        }
    }, [dispatch, pathname]);

    return null;
};

const SliceProvider = ({ children }) => (
    <Provider store={store}>
        {children}
        <AuthInitializer />
    </Provider>
);

export default SliceProvider;
