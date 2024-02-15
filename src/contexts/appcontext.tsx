import React, { useContext, useState } from "react";
import Toast from "../component/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-clients"

type ToastMessage = {
    message: string,
    type: "SUCCESS" | "ERROR";
}

type AppContext = {
    showToast: (toastMessage: ToastMessage) => void;
    isLoggedIn: boolean;
}

const AppContext = React.createContext<AppContext | undefined>(undefined);


export const AppContextProvider = ({children}: {children: React.ReactNode}) => {
    const [toast, setToast] = useState<ToastMessage | undefined>(undefined);
    const {isError} = useQuery("validateToken", apiClient.validateToken, {
        retry: false
    });

    const showToast = (toastMessage: ToastMessage) => {
        setToast(toastMessage);
    };

    return (
        <AppContext.Provider value={{
            showToast: showToast,
            isLoggedIn: !isError
        }}> 
            {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />)}
            {children}
        </AppContext.Provider>
    )
}


export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext
}