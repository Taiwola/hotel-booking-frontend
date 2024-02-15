import { useMutation } from "react-query";
import ManageHotelForm from "../forms/manageHotelsForms";
import * as apiClient from "../api-clients"
import { useAppContext } from "../contexts/appcontext";

const AddHotel = () => {
    const {showToast} = useAppContext();

    const {mutate, isLoading} = useMutation(apiClient.addMyHotel, {
        onSuccess: () => {
            showToast({message: "Hotel saved", type: "SUCCESS"})
        },
        onError: () => {
            showToast({message: "Error in saving hotel", type: "ERROR"})
        }
    })

    const handleSave = (hotelFormData : FormData) => {
        mutate(hotelFormData)
    }

    return (
        <ManageHotelForm onSave={handleSave} isLoading={isLoading} />
    )
}

export default AddHotel;