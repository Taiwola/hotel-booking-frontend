import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-clients";
import ManageHotelForm from "../forms/manageHotelsForms";
import { useAppContext } from "../contexts/appcontext";

const EditHotels = () => {
    const {Id} = useParams();
    const {showToast} = useAppContext();

    const {data: hotelData} = useQuery("fetchMyHotelsById", () => apiClient.fetchMyHotelsById(Id || ""), {
        enabled: !!Id
    });

    const {mutate,isLoading} = useMutation(apiClient.updateByHotelId, {
        onSuccess: () => {
            showToast({message: "Hotel saved!", type: "SUCCESS"})
        },
        onError: () => {
            showToast({message: "Failed to save hotel!", type: "ERROR"})
        }
    })

    const handleSave = (hotelFormData : FormData) => {
        mutate(hotelFormData)
    }

    return <ManageHotelForm  hotel={hotelData} onSave={handleSave} isLoading={isLoading}/>
}

export default EditHotels;
