import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/appcontext";

const SignOutButton = () => {
    const queryClient = useQueryClient();

    const {showToast} = useAppContext();
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            await queryClient.invalidateQueries("validateToken")
            // show toast
            showToast({
                message: "signed out!",
                type: "SUCCESS"
            })
        },
        onError: (error: Error) => {
            // show toast
            showToast({
                message: error.message,
                type: "ERROR"            
})
        }
    })

    const handleClick = () => {
        mutation.mutate();
    }

    return (
        <button onClick={handleClick} className="text-blue-600 font-bold bg-white hover:bg-gray-10000">
            Sign Out
        </button>
    )
}

export default SignOutButton;