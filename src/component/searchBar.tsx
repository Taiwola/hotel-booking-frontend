import { FormEvent, useState } from "react";
import {useNavigate} from "react-router-dom"
import { useSearchContext } from "../contexts/searchContext"
import {  MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const SearchBar = () => {
    const search = useSearchContext();
    const [destination, setDestination] = useState<string>(search.destination)
    const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
    const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
    const [childCount, setChildCount] = useState<number>(search.childCount);
    const [adultCount, setAdultCount] = useState<number>(search.adultCount);

    const navigate = useNavigate()

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        search.saveSearchedValue(
            destination,
            checkIn,
            checkOut,
            adultCount,
            childCount
        );

        navigate("/search");
    }

    const minDate = new Date();
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    return (
        <form onSubmit={handleSubmit} className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
            <div className="flex flex-row items-center flex-1 bg-white p-2">
                <MdTravelExplore size={24} className="mr-2" />
                <input
                type="text"
                placeholder="Where are you going" 
                className="text-md w-full focus:outline-none" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value) } 
                />
            </div>

            <div className="flex bg-white gap-2 px-2 py-1">
                <label htmlFor="" className="items-center flex">
                    Adults:
                    <input 
                    type="number"
                    min={1}
                    max={20}
                    value={adultCount} 
                    onChange={(e) => setAdultCount(parseInt(e.target.value))}
                    className="w-full p-1 focus:outline-none font-bold"
                    />
                </label>

                <label htmlFor="" className="items-center flex">
                    Children:
                    <input 
                    type="number"
                    min={0}
                    max={20}
                    value={childCount} 
                    onChange={(e) => setChildCount(parseInt(e.target.value))}
                    className="w-full p-1 focus:outline-none font-bold"
                    />
                </label>
            </div>

            <div>
                <DatePicker selected={checkIn} onChange={(date) => setCheckIn(date as Date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} 
                placeholderText="Check-in-date"
                className="min-w-full bg-white focus:outline-none cursor-pointer"
                wrapperClassName="min-w-full"
                />
            </div>

            <div>
                <DatePicker selected={checkOut} onChange={(date) => setCheckOut(date as Date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} 
                placeholderText="Check-in-date"
                className="min-w-full bg-white focus:outline-none cursor-pointer"
                wrapperClassName="min-w-full"
                />
            </div>

            <div className="flex gap-1">
                <button className="w-2/3 bg-blue-500 text-white h-full p-2 font-bold text-xl hover:bg-blue-600">Search</button>
                <button className="w-2/3 bg-red-500 text-white h-full p-2 font-bold text-xl hover:bg-red-600">Clear</button>
            </div>
        </form>
    ); 
}

export default SearchBar;