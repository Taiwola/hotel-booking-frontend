import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./manageHotelsForms";


const GuestSection = () => {
    const {register, formState: {errors}} = useFormContext<HotelFormType>();

    return (
        <div>
            <h2 className="text-2xl text-bold mb-3">Guest</h2>

            <div className="grid grid-cols-2 p-6 gap-5 bg-gray-500">
                <label htmlFor="" className="text-gray-700 text-sm font-semibold">
                    Adults
                    <input 
                    type="number" className="border rounder w-full py-2 px-3 font-normal" min={1}
                    {...register("adultCount", {required: "This field is required"})}
                    />
                     {errors.adultCount && (
                    <span className="text-red-500 font-bold text-sm">{errors.adultCount.message}</span>
                )}
                </label>
               

                <label htmlFor="" className="text-gray-700 text-sm font-semibold">
                    Children
                    <input 
                    type="number" className="border rounder w-full py-2 px-3 font-normal" min={0}
                    {...register("childCount", {required: "This field is required"})}
                    />

                {errors.childCount && (
                    <span className="text-red-500 font-bold text-sm">{errors.childCount.message}</span>
                )}
                </label>
                
            </div>
        </div>
    )
}

export default GuestSection;