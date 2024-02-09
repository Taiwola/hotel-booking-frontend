import {useForm} from "react-hook-form"
import { useMutation } from "react-query";
import * as apiClient from "../api-clients"
import { useAppContext } from "../contexts/appcontext";
import { useNavigate } from "react-router-dom";


export type RegisterFormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
}


const Register = () => {
    const navigate = useNavigate();
    const {register, watch, handleSubmit, formState: {errors}} = useForm<RegisterFormData>();

    const {showToast} = useAppContext();

    const mutation = useMutation(apiClient.register, {
        onSuccess: () => {
            showToast({
                message: "Registration success",
                type: "SUCCESS"
            })
            navigate('/');
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR"
            })
        }
    });

    const onSubmit = handleSubmit((data) => {
       mutation.mutate(data);
    }) 
    return (
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>

            <div className="flex flex-col md:flex-row gap-5">
                <label htmlFor="firstName" className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal" placeholder="First Name"  {...register("firstName", {required: "this field is required"})}/>
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span>
                    )}
                </label>

                <label htmlFor="lastName" className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input type="text" className="border rounded w-full py-1 px-2 font-normal" placeholder="First Name"  {...register("lastName", {required: "this field is required"})} />
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span>
                    )}
                </label>
            </div>

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

                <label htmlFor="password" className="text-gray-700 text-sm font-bold flex-1">
                    Confirm Password
                    <input type="password" className="border rounded w-full py-1 px-2 font-normal" placeholder="Confirm your Password"  {...register("confirmPassword", {validate: (val) => {
                        if (!val) {
                            return "this field is required"
                        } else if(watch("password") !== val) {
                            return "Your password do not match"
                        }

                    }})} />
                    {errors.confirmPassword && (
                        <span className="text-red-500">{errors.confirmPassword.message}</span>
                    )}
                    </label>
                    <span>
                        <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl">
                            Create Account
                        </button>
                    </span>
        </form>
    )
}

export default Register