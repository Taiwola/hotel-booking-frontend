import { useFormContext } from "react-hook-form"
import { HotelFormType } from "./manageHotelsForms"

const ImageSection = () => {
    const {register, formState: {errors}} = useFormContext<HotelFormType>();

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>

            <div className="border rounded p-4 flex flex-col gap-4">
                <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal"  {...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalLenght = imageFiles.length;

                        if (totalLenght === 0 ) {
                            return "At least one image"
                        }

                        if (totalLenght > 6) {
                            return "Total lenght cannot be more than 6"
                        }

                        return true
                    }
                })} />
            </div>
            {errors.imageFiles && (
                <span className="text-red-500 font-bold text-sm">{errors.imageFiles.message}</span>
            )}
        </div>
    )
}

export default ImageSection;