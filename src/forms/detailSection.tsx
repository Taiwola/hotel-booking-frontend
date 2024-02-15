import { useFormContext } from "react-hook-form";
import { HotelFormType } from "./manageHotelsForms";
const DetailSection = () => {
    const {register, formState: {errors}} = useFormContext<HotelFormType>()
    return (
        <div className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

            <label htmlFor="name" className="text-gray-700 text-sm font-bold flex-1">
                    Name
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal" placeholder="Enter the name"  {...register("name", {required: "this field is required"})} />
                    {errors.name && (
                        <span className="text-red-500">{errors.name.message}</span>
                    )}
                </label>

                <div className="flex gap-4">
                <label htmlFor="city" className="text-gray-700 text-sm font-bold flex-1">
                    City
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal" placeholder="Enter the city"  {...register("city", {required: "this field is required" })} />
                    {errors.city && (
                        <span className="text-red-500">{errors.city.message}</span>
                    )}
                </label>

                <label htmlFor="country" className="text-gray-700 text-sm font-bold flex-1">
                    Country
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal" placeholder="Enter the country"  {...register("country", {required: "this field is required" })} />
                    {errors.country && (
                        <span className="text-red-500">{errors.country.message}</span>
                    )}
                </label>
                </div>


                <label htmlFor="Description" className="text-gray-700 text-sm font-bold flex-1">
                    Description
                    <textarea rows={10}  className="border rounded w-full py-1 px-2 font-normal" placeholder="Enter a description"  {...register("description", {required: "this field is required" })} />
                    {errors.description && (
                        <span className="text-red-500">{errors.description.message}</span>
                    )}
                </label>

                <label htmlFor="pricePerNight" className="text-gray-700 text-sm font-bold max-w-[50%]">
                    Price per night
                    <input type="number" min={1} className="border rounded w-full py-1 px-2 font-normal" placeholder="Enter a price"  {...register("pricePerNight", {required: "this field is required" })} />
                    {errors.pricePerNight && (
                        <span className="text-red-500">{errors.pricePerNight.message}</span>
                    )}
                </label>

                <label htmlFor="city" className="text-gray-700 text-sm font-bold max-w-[50%]">
                    Rating
                    <select className="border rounded w-full p-2 text-gray-700 font-normal" {...register("starRating", {required: "this field is required" })}>
                        <option value="" className="text-sm font-bold">select a rating</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    {errors.starRating && (
                        <span className="text-red-500">{errors.starRating.message}</span>
                    )}
                </label>

        </div>
    )
}

export default DetailSection