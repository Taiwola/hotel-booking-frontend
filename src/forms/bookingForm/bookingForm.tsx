import { useForm } from "react-hook-form";
import { PaymentResponse, UserType } from "../../../types"
import { useSearchContext } from "../../contexts/searchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-clients";
import { useAppContext } from "../../contexts/appcontext";

type Prop = {
    currentUser: UserType;
    paymentIntent: PaymentResponse
}

export type BookingFormData = {
    hotelId: string
    firstName: string,
    lastName: string,
    email: string,
    adultCount: number,
    childCount: number,
    checkIn: string,
    checkOut: string,
    paymentIntentId: string,
    totalCost: number,
    
}
const BookingForm = ({currentUser, paymentIntent}: Prop) => {
    const {showToast} = useAppContext();
    const search = useSearchContext();
    const {hotelId} = useParams();

    const {mutate: BookRoom, isLoading} = useMutation(apiClient.createRoomBooking, {
        onSuccess: () => {
            showToast({message: "Room booked", type: "SUCCESS"})
        },
        onError: () => {
            showToast({message: "failed to book a room", type: "ERROR"})
        }
    })


    const {register, handleSubmit} = useForm<BookingFormData>({
        defaultValues: {
            firstName: currentUser.firstName,
            lastName: currentUser.lastName,
            email: currentUser.email,
            hotelId: hotelId,
            adultCount: search.adultCount,
            childCount: search.childCount,
            checkIn: search.checkIn.toISOString(),
            checkOut: search.checkOut.toISOString(),
            totalCost: paymentIntent.totalCost,
            paymentIntentId: paymentIntent.paymentIntentId
        }
    });


    const onsubmit = async (formData: BookingFormData) => {
        BookRoom({...formData, paymentIntentId: paymentIntent.paymentIntentId})
    }
    return (
            <form onSubmit={handleSubmit(onsubmit)} className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5">
                <span className="text-3xl font-bold">Confirm your details</span>
                <div className="grid grid-cols-2 gap-6">
                    <label className="text-gray-700 text-sm font-bold flex-1">
                        First Name

                        <input type="text" 
                        disabled readOnly 
                        {...register("firstName")}
                        className="mt-1 rounded border w-full px-3 py-2 text-gray-700 bg-gray-200 font-normal"/>
                    </label>

                    <label className="text-gray-700 text-sm font-bold flex-1">
                        Last Name

                        <input type="text" 
                        disabled readOnly 
                        {...register("lastName")}
                        className="mt-1 rounded border w-full px-3 py-2 text-gray-700 bg-gray-200 font-normal"/>
                    </label>

                    <label className="text-gray-700 text-sm font-bold flex-1">
                        Email

                        <input type="text" 
                        disabled readOnly 
                        {...register("email")}
                        className="mt-1 rounded border w-full px-3 py-2 text-gray-700 bg-gray-200 font-normal"/>
                    </label>
                </div>


                <div className="space-y-2">
                    <h2>Price Summary</h2>
                <div className="bg-blue-200 p-4 rounded-md">
                    <div className="font-semibold text-lg">
                        Total cost: ${paymentIntent.totalCost.toFixed(2)};
                    </div>
                    <div className="text-xs">
                            includes taxes and charges
                    </div>
                </div>
                </div>

                <div className="space-y-2">
                    <div className="text-xl font-semibold grid grid-cols-1 gap-2">
                        Payment Details
                        <input type="text" className="border rounded-md p-2 text-sm" placeholder="Enter card number"/>
                    </div>
                </div>
                
                <div className="flex justify-end">
                    <button disabled={isLoading} 
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-md disabled:bg-gray-500"

                    >{isLoading ? "Saving...." : "Confirm Booking"}</button>
                </div>
            </form>
    )
}

export default BookingForm;