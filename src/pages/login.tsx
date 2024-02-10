import {useForm} from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/appcontext";
import { Link, useNavigate } from "react-router-dom";


export type SignInForm = {
    email: string;
    password: string
}

const SignIn = () => {
    const queryClient = useQueryClient();
    const {showToast} = useAppContext();
    const navigate = useNavigate();
 const {register, formState: {errors}, handleSubmit} = useForm<SignInForm>()

 const mutation = useMutation(apiClient.signIn, {
    onSuccess: async () => {
        showToast({message: "user signed in", type: "SUCCESS"})
        await queryClient.invalidateQueries("validateToken")
        navigate("/");
    },
    onError: (error:Error) => {
        showToast({message: error.message, type: "ERROR"})
    }
 })

 const onSubmit = handleSubmit ((data) => {
    mutation.mutate(data);
 })

    return (
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <h2 className="text-3xl font-bold">Sign In</h2>

            <label htmlFor="email" className="text-gray-700 text-sm font-bold flex-1">
                    Email
                    <input type="email" className="border rounded w-full py-1 px-2 font-normal" placeholder="Enter your Email"  {...register("email", {required: "this field is required"})} />
                    {errors.email && (
                        <span className="text-red-500">{errors.email.message}</span>
                    )}
                </label>

                <label htmlFor="password" className="text-gray-700 text-sm font-bold flex-1">
                    Password
                    <input type="password" className="border rounded w-full py-1 px-2 font-normal" placeholder="Enter your Password"  {...register("password", {required: "this field is required", minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }})} />
                    {errors.password && (
                        <span className="text-red-500">{errors.password.message}</span>
                    )}
                </label>
                <span className="flex items-center justify-between">
                    <span className="text-sm">
                        Not Registerd? <Link className="underline" to={`/register`}>
                            create an account here
                        </Link>
                    </span>
                        <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                            Sign in
                        </button>
                    </span>
        </form>
    )
}


export default SignIn