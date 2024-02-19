import { SignInForm } from "./pages/login";
import { RegisterFormData } from "./pages/register";
import {HotelSearchResponse, HotelType, PaymentResponse, SearchParams, UserType} from "../types"
import { BookingFormData } from "./forms/bookingForm/bookingForm";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const FetchCurrentUser = async (): Promise<UserType> => {
    const response = await fetch(`${API_BASE_URL}/api/users/me`, {
        credentials: "include"
    });

    if (!response.ok) {
        throw new Error("Error Fetching user")
    };

    return response.json();
}


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


export const addMyHotel = async (hotelForm: FormData):Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        method: "POST",
        credentials: "include",
        body: hotelForm
    });

    if (!response.ok) {
        throw new Error("Failed to add hotel")
    }

    return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
        credentials: "include",
    });

    if (!response.ok) {
        throw new Error("Error fetching hotels");
    }

    return response.json();
}


export const fetchMyHotelsById = async (Id: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/my-hotels/${Id}`, {
        credentials: "include",
        method: "GET"
    });

    if (!response.ok) {
        throw new Error("Error fetching hotel");
    }

    return response.json()
}


export const updateByHotelId = async (formData: FormData) => {
    const res = await fetch(`${API_BASE_URL}/api/my-hotels/${formData.get("Id")}`, {
        method: "PUT",
        credentials: "include",
        body: formData
    });

    if (!res.ok) {
        throw new Error("Failed to update")
    };

    return res.json();
}

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
    const queryParams = new URLSearchParams();
    queryParams.append("destination", searchParams.destination || "");
    queryParams.append("checkIn", searchParams.checkIn || "");
    queryParams.append("checkOut", searchParams.checkOut || "");
    queryParams.append("childCount", searchParams.childCount || "");
    queryParams.append("adultCount", searchParams.adultCount || "");
    queryParams.append("page", searchParams.page || "");

    queryParams.append("maxPrice", searchParams.maxPrice || "");
    queryParams.append("sortOptions", searchParams.sortOptions || "");

    searchParams.facilities?.forEach((facility) => queryParams.append("facilities", facility));
    searchParams.types?.forEach((type) => queryParams.append("types", type));
    searchParams.stars?.forEach((star) => queryParams.append("stars", star));

    const res = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`, {
         method: 'GET',
         credentials: "include",
    });

    if (!res.ok) {
        throw new Error("Error fetching function");
    }

    return res.json();
}

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`)

    if (!response.ok) {
        throw new Error("Error fetching hotel")
    };

    return response.json();
}

export const CreatePaymentIntent = async(hotelId: string, numberOfNights: string): Promise<PaymentResponse> => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify({numberOfNights}),
        headers: {
            "Content-Type": "application/json"
        }
    });

    if (!response.ok) {
        throw new Error("Error fetching payment intent")
    }

    return response.json();
}

export const createRoomBooking = async(formData: BookingFormData) => {
    const response = await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        throw new Error("Error booking a room")
    }

    return response.json();
}