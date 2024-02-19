import { useQuery } from "react-query";
import * as apiClient from "../api-clients";
import BookingForm from "../forms/bookingForm/bookingForm";
import { useSearchContext } from "../contexts/searchContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../component/bookingDetailsSummary";

const Booking = () => {
    const search = useSearchContext();
    const {hotelId} = useParams();


    const [numberOfNights, setNumberOfNights] = useState<number>(0);


    useEffect(() => {
        if (search.checkIn && search.checkOut) {
            const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime())  / (1000 * 60 * 60 * 24);
            setNumberOfNights(Math.ceil(nights))
        }

        
    }, [search.checkIn, search.checkOut]);


    const {data: paymentIntent} = useQuery("CreatePaymentIntent", () => apiClient.CreatePaymentIntent(hotelId as string, numberOfNights.toString()), {
        enabled: !!hotelId && numberOfNights > 0
    })

    const {data: hotel} = useQuery("FetchUserById", () => apiClient.fetchHotelById(hotelId as string), {
        enabled: !!hotelId
    })
    const {data: currentUser} = useQuery("FetchCurrentUser", apiClient.FetchCurrentUser);

    if (!hotel) {
        return <></>
    }

    return (
        <div className="grid gap-4 md:grid-cols-[1fr_2fr]">
            <BookingDetailsSummary
            checkIn={search.checkIn} 
            checkOut={search.checkOut}
            adultCount={search.adultCount}
            childCount={search.childCount}
            numberOfNights={numberOfNights}
            hotel={hotel}
            />
            {currentUser && paymentIntent && <BookingForm currentUser={currentUser} paymentIntent={paymentIntent}/>}
        </div>
    )
};


export default Booking;