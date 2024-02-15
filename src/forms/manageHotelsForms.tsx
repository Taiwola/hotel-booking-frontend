import { FormProvider, useForm } from "react-hook-form";
import DetailSection from "./detailSection";
import TypeSection from "./typeSections";
import FacilitiesSection from "./facilitiesFormSection";
import GuestSection from "./GuestSection";
import ImageSection from "./imageSection";


export type HotelFormType = {
    name: string,
    city: string,
    country: string,
    description: string,
    type: string,
    pricePerNight: number,
    starRating: number,
    facilities: string[],
    imageFiles: FileList,
    adultCount: number,
    childCount: number
}

type Prop = {
    onSave: (hotelFormData: FormData) => void,
    isLoading: boolean
}

const ManageHotelForm = ({onSave, isLoading}: Prop) => {
    const formMethods = useForm<HotelFormType>()

    const {handleSubmit} = formMethods;

    const onsubmit = handleSubmit((formDataJson: HotelFormType) => {
        const formData = new FormData();
        formData.append("name", formDataJson.name);
        formData.append("city", formDataJson.city);
        formData.append("country", formDataJson.country);
        formData.append("description", formDataJson.description);
        formData.append("type", formDataJson.type);
        formData.append("pricePerNight", formDataJson.pricePerNight.toString());
        formData.append("starRating", formDataJson.starRating.toString());
        formData.append("adultCount", formDataJson.adultCount.toString());
        formData.append("childCount", formDataJson.childCount.toString());

        formDataJson.facilities.forEach((facility, index) => {
            formData.append(`facilities[${index}]`, facility)
        });

        Array.from(formDataJson.imageFiles).forEach((imageFile) => {
            formData.append(`imageFile`, imageFile);
        });

        onSave(formData);
    })


    return (
        <FormProvider {...formMethods}>
            <form className="flex flex-col gap-10" onSubmit={onsubmit}>  
                <DetailSection />
                <TypeSection />
                <FacilitiesSection />
                <GuestSection />
                <ImageSection />
                <span className="flex justify-end">
                    <button type="submit" disabled={isLoading} className="bg-blue-600 p-2 disabled:bg-gray-500 font-bold hover:bg-blue-500 text-white text-xl">
                        {isLoading ? "Saving..." : "save"}
                        </button>
                </span>
            </form>
        </FormProvider>
    )
};


export default ManageHotelForm