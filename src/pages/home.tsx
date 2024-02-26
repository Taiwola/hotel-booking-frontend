import { useQuery } from "react-query";
import * as apiClient from "../api-clients";
import LastestDestinationCard from "../component/lastestCard";

const Home = () => {
    const {data: hotels} = useQuery("FetchHotels", () => apiClient.FetchHotel())

    const topRowHotels = hotels?.slice(0, 2) || [];
    const bottomRow = hotels?.slice(2) || [];
    return (
        <div className="space-y-3">
            <h2 className="text-3xl font-bold">
                Lastest Destination
            </h2>
            <p>Most Recent Destination</p>
            <div className="grid gap-4">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                    {topRowHotels.map((hotel) => (
                        <LastestDestinationCard hotel={hotel} />
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-4">
                        {
                            bottomRow.map((hotel) => (
                                <LastestDestinationCard hotel={hotel} />
                            ))
                        }
                </div>
            </div>
        </div>
    )
}


export default Home;