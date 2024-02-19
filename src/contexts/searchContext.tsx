import React, { useContext, useState } from "react";


type SearchContextType = {
    destination: string,
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotelId: string,
    saveSearchedValue: (destination: string, checkIn: Date, checkOut: Date, adultCount: number,  childCount: number) => void;
}

const SearchContext = React.createContext<SearchContextType | undefined>(undefined);


type SearchContextProviderType = {
    children: React.ReactNode
}

export const SearchContextProvider = ({children}: SearchContextProviderType) => {

    const [destination, setDestination] = useState<string>(() => {
        return sessionStorage.getItem("destination") || "";
    });
    const [checkIn, setCheckIn] = useState<Date>(() => new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
    const [checkOut, setCheckOut] = useState<Date>(() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
    const [adultCount, setAdultCount] = useState<number>(() => parseInt(sessionStorage.getItem("adultCount") || "1"));
    const [childCount, setChildCount] = useState<number>(() => parseInt(sessionStorage.getItem("childCount") || "0")); 
    const [hotelId, setHotelId] = useState<string>(() => sessionStorage.getItem("hotelId") || "");

    const saveSearchedValue = (destination: string, checkIn: Date, checkOut: Date, adultCount: number,  childCount: number, hotelId?: string) => {
        setCheckIn(checkIn)
        setCheckOut(checkOut)
        setDestination(destination)
        setAdultCount(adultCount)
        setChildCount(childCount)
        if (hotelId) {
            setHotelId(hotelId)
        }

        sessionStorage.setItem("destination", destination);
        sessionStorage.setItem("checkIn", checkIn.toISOString());
        sessionStorage.setItem("checkOut", checkOut.toISOString());
        sessionStorage.setItem("adultCount", adultCount.toString());
        sessionStorage.setItem("childCount", childCount.toString());

        if (hotelId) {
            sessionStorage.setItem("hotelId", hotelId);
        }
    }
    return (
        <SearchContext.Provider value={{
            hotelId,
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount,
            saveSearchedValue,
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => {
    const context = useContext(SearchContext);
    return context as SearchContextType
}