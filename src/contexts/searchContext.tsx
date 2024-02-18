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

    const [destination, setDestination] = useState<string>("");
    const [checkIn, setCheckIn] = useState<Date>(new Date());
    const [checkOut, setCheckOut] = useState<Date>(new Date());
    const [adultCount, setAdultCount] = useState<number>(1);
    const [childCount, setChildCount] = useState<number>(0);
    const [hotelId, setHotelId] = useState<string>("");

    const saveSearchedValue = (destination: string, checkIn: Date, checkOut: Date, adultCount: number,  childCount: number, hotelId?: string) => {
        setCheckIn(checkIn)
        setCheckOut(checkOut)
        setDestination(destination)
        setAdultCount(adultCount)
        setChildCount(childCount)
        if (hotelId) {
            setHotelId(hotelId)
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