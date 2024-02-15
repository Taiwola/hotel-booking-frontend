import { useFormContext } from "react-hook-form"
import { HotelFormType } from "./manageHotelsForms"

const ImageSection = () => {
    const {register, formState: {errors}, watch, setValue} = useFormContext<HotelFormType>();

    const existingImageUrls = watch("imageUrls");

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, imgUrl: string) => {
        e.preventDefault();
        setValue("imageUrls", existingImageUrls.filter((url) => url !== imgUrl));

    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-3">Images</h2>

            <div className="border rounded p-4 flex flex-col gap-4">

                {existingImageUrls && (
                    <div className="grid grid-cols-6 gap-4">
                        {existingImageUrls.map(imgUrl => (
                            <div className="relative group">
                                <img src={imgUrl} alt="...." className="min-h-full object-cover" />
                                <button className="absolute inset-0 flex items-center bg-opacity-50 opacity-0 justify-center bg-black group-hover:opacity-100 text-white"
                                onClick={(e) => handleDelete(e, imgUrl)}
                                >delete</button>
                            </div>
                        ))}
                    </div>
                )}

                <input type="file" multiple accept="image/*" className="w-full text-gray-700 font-normal"  {...register("imageFiles", {
                    validate: (imageFiles) => {
                        const totalLenght = imageFiles.length + (existingImageUrls.length || 0);

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