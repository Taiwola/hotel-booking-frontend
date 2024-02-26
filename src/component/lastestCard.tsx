import { Link } from "react-router-dom";
import { HotelType } from "../../types";

type Props = {
    hotel: HotelType
}

const LastestDestinationCard = ({hotel} : Props) => {
    return (
        <Link className="relative cursor-pointer overflow-hidden rounded-md" to={`/details/${hotel._id}`}>
            <div className="h-[300px]">
                <img src={hotel.imageUrls[0]} className="w-full h-full object-cover object-center" alt={hotel.name} />

                <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
                    <span className="text-white font-bold tracking-tight text-3xl">{hotel.name}</span>
                </div>
            </div>
        </Link>
    )
}

export default LastestDestinationCard;