import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-clients"
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/guestInfoForm/guestInfoForm";

const Details = () => {

    const {hotelId} = useParams()

    const { data: hotel } = useQuery("FetchHotelById", () => apiClient.fetchHotelById(hotelId || ""), {
        enabled: !!hotelId
    })

    if (!hotel) {
        return <> </>
    }

    return (
        <div className="space-y-6">
            <div>
                <span className="flex">{Array.from({length: hotel.starRating}).map(() => (
                    <AiFillStar className="fill-yellow-400" />
                ))}</span>
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {hotel.imageUrls.map((url) => (
                        <div className="h-[300px]">
                            <img src={url} alt={hotel.name} className="rounded-md w-full h-full object-cover object-center" />
                        </div>
                    ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                        {hotel.facilities.map((facility) => (
                            <div className="border border-slate-300 rounded-sm p-3">
                                {facility}
                            </div>
                        ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
                      <div className="whitespace-pre-line">
                            {hotel.description}
                      </div>

                      <div className="h-fit">
                            <GuestInfoForm pricePerNight={hotel.pricePerNight} hotelId={hotelId as string} />
                      </div>
            </div>
        </div>
    )
};


export default Details;