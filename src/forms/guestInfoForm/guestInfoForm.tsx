import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useNavigate, useLocation } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import { useSearchContext } from "../../contexts/searchContext";
import { useAppContext } from "../../contexts/appcontext";

type Props = {
    hotelId: string,
    pricePerNight: number
}

type GuestInfoData = {
    checkIn: Date,
    checkOut: Date,
    adultCount: number,
    childCount: number,
}



const GuestInfoForm = ({hotelId, pricePerNight}: Props) => {
    const search = useSearchContext();
    const {isLoggedIn} = useAppContext();
    const navigate = useNavigate();
    const location = useLocation()

    const {watch, register, handleSubmit, setValue, formState: {errors}} = useForm<GuestInfoData>({
        defaultValues: {
            checkIn: search.checkIn,
            checkOut: search.checkOut,
            adultCount: search.adultCount,
            childCount: search.childCount
        }
    });


    const checkIn = watch("checkIn");
    const checkOut = watch("checkOut");
    const minDate = new Date();
    const maxDate = new Date();

    maxDate.setFullYear(maxDate.getFullYear() + 1);

    const onSignInClick = (data: GuestInfoData) => {
        search.saveSearchedValue(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        )

        navigate("/sign-in", {state: {from: location}})
    }

    const onSubmitClick = (data: GuestInfoData) => {
        search.saveSearchedValue(
            "",
            data.checkIn,
            data.checkOut,
            data.adultCount,
            data.childCount
        )

        navigate(`/hotel/${hotelId}/booking`, {state: {from: location}})
    }

    return (
        <div className="flex flex-col p-4 bg-blue-200 gap-4">
            <h3 className="text-md font-bold">${pricePerNight}</h3>

            <form onSubmit={isLoggedIn ? handleSubmit(onSubmitClick) : handleSubmit(onSignInClick)}>
                <div className="grid grid-cols-1 gap-4 items-center">
                    <div>
                    <DatePicker selected={checkIn} onChange={(date) => setValue("checkIn",date as Date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} 
                placeholderText="Check-in-date"
                className="min-w-full bg-white focus:outline-none cursor-pointer"
                wrapperClassName="min-w-full"
                required
                />
                    </div>

                    <div>
                    <DatePicker selected={checkOut} onChange={(date) => setValue("checkOut",date as Date)} selectsStart startDate={checkIn} endDate={checkOut} minDate={minDate} maxDate={maxDate} 
                placeholderText="Check-out-date"
                className="min-w-full bg-white focus:outline-none cursor-pointer"
                wrapperClassName="min-w-full"
                required
                />
                    </div>

                    <div className="flex bg-white gap-2 px-2 py-1">
                <label htmlFor="" className="items-center flex">
                    Adults:
                    <input 
                    type="number"
                    min={1}
                    max={20}
                    className="w-full p-1 focus:outline-none font-bold"
                    {...register("adultCount", {
                        required: "this field is required",
                        min: {
                            value: 1,
                            message: "There must be atleast one adult"
                        },
                        valueAsNumber: true
                    })}
                    />
                </label>

                <label htmlFor="" className="items-center flex">
                    Children:
                    <input 
                    type="number"
                    min={0}
                    max={20}
                    {...register("childCount", {
                        valueAsNumber: true
                    })}
                    className="w-full p-1 focus:outline-none font-bold"
                    />
                </label>
                {errors.adultCount && (
                    <span className="text-red-500 font-semibold text-sm">{errors.adultCount.message}</span>
                )}
            </div>
            {isLoggedIn ? (
                    <button type="submit" className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
                        Book Now
                    </button>
                ) : (
                    <button type="submit" className="bg-blue-600 text-white h-full p-2 font-bold hover:bg-blue-500 text-xl"> Sign in to log in</button>
                ) }
                </div>
            </form>
        </div>
    )
}

export default GuestInfoForm;