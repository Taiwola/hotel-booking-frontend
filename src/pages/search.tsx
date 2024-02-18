import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/searchContext";
import * as apiClient from "../api-clients"
import { useState } from "react";
import SearchResultCard from "../component/searchResultCard";
import Pagination from "../component/pagination";
import StarRatingFilter from "../component/starRating";
import HotelTypeFilter from "../component/hotelTypes";
import FacilitiesFilter from "../component/facilitiesFilter";
import PriceFilter from "./priceFilter";

const Search = () => {
    const search = useSearchContext();
    const [page, setPage] = useState<number>(1);
    const [selectedStars, setSelectedStars] = useState<string[]>([]);
    const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
    const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
    const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
    const [sortOptions, setSortOptions] = useState<string>("");

    const searchParams = {
        destination: search.destination,
        checkIn: search.checkIn.toISOString(),
        checkOut: search.checkOut.toISOString(),
        adultCount: search.adultCount.toString(), 
        childCount: search.childCount.toString(), 
        page: page.toString(),
        stars: selectedStars,
        types: selectedHotelTypes,
        facilities: selectedFacilities,
        maxPrice: selectedPrice?.toString(),
        sortOptions
    };

    console.log(sortOptions);

    const {data: hotelData} = useQuery(["searchHotels", searchParams], () => apiClient.searchHotels(searchParams));

    const handleStarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const starRating = e.target.value;
        setSelectedStars((prev) => e.target.checked ? [...prev, starRating] : prev.filter((star) => star !== starRating) )
    }

    const handleHotelTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const hotelType = e.target.value;
        setSelectedHotelTypes((prev) => e.target.checked ? [...prev, hotelType] : prev.filter((type) => type !== hotelType))
    }

    const handleFacilitiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const facility = e.target.value;
        setSelectedFacilities((prev) => e.target.checked ? [...prev, facility] : prev.filter((type) => type !== facility))
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
            <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
                <div className="space-y-5">
                        <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter By:</h3>
                </div>

                <StarRatingFilter selectedStars={selectedStars} onStarChange={handleStarChange}/>
                <HotelTypeFilter 
                selectedHotelTypes={selectedHotelTypes}
                onTypesChange={handleHotelTypeChange}
                />
                <FacilitiesFilter
                selectedFacilities={selectedFacilities}
                onFacilitiesChange={handleFacilitiesChange}
                />
                <PriceFilter
                selectedPrice={selectedPrice}
                onPriceChange={((value?:number) => setSelectedPrice(value))}
                />
            </div>

            <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">
                        {hotelData?.response.pagination?.total} hotels found
                        {search.destination ? ` in ${search.destination}` : ""} 
                    </span>
                    <select className="p-2 border rounded-md" value={sortOptions} onChange={(e) => setSortOptions(e.target.value)}>
                            <option value="">sort</option>
                            <option value="starRating">Star Rating</option>
                            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
                            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
                    </select>
                </div>
                {hotelData?.response.data.map((hotel) => (
                    <SearchResultCard hotel={hotel} />
                ))}

                <div>
                    <Pagination page={hotelData?.response.pagination.page || 1} pages={hotelData?.response.pagination.pages || 1}  onPageChange={(page) => setPage(page)} />
                </div>
            </div>
        </div>
    )
}

export default Search;