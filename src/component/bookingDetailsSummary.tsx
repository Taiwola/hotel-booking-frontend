import { HotelType } from "../../types";

type Props = {
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
    hotel: HotelType,
    numberOfNights: number
}


const BookingDetailsSummary = ({checkIn, checkOut, adultCount, childCount, hotel, numberOfNights} : Props) => {
    return (
        <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
            <h2 className="text-xl font-bold">Your Booking Details</h2>
            <div className="border-b py-2">
                Location: <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
            </div>
            <div className="flex justify-between">
                <div>
                    check In
                    <div className="font-bold">
                        {checkIn.toDateString()}
                    </div>
                </div>
                <div>
                    check Out
                    <div className="font-bold">
                        {checkOut.toDateString()}
                    </div>
                </div>
            </div>

            <div className="border-t border-b py-2">
                Total length of stay:
                <div className="font-bold">
                    {numberOfNights} nights
                </div>
            </div>

            <div>
                Guest 
                <div className="font-bold">
                    {adultCount} adult & {childCount} children
                </div>
            </div>
        </div>
    )
}


export default BookingDetailsSummary;