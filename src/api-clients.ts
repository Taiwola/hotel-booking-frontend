import { SignInForm } from "./pages/login";
import { RegisterFormData } from "./pages/register";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/users/register`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    });

    const res = await response.json();

    if (!response.ok) {
        throw new Error(res.message);
    }
};

export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error("Token invalid");
    }

    return response.json();
}

export const signIn = async (formDataType: SignInForm) => {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formDataType)
    });

    const body = await response.json();

    if (!response.ok) {
        throw new Error(body.message)
    }

    return body;
}

export const signOut = async () => {
    const res = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        credentials: "include",
        method: "POST"
    });

    if (!res.ok) {
        throw new Error("Error during signing out");
    }
}