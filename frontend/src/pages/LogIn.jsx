import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export const LogIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nevigate = useNavigate();

    const SubmitHandler = async () => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const sendData = { email, password };

        if (!email || !password) {
            alert('fields are missing');
            return;
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/user/login`, sendData, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            nevigate('/dashboard');
        } catch (error) {
            console.log(error.message);
        }
    }


    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (user) {
            nevigate('/dashboard')
        }
    }, [nevigate])

    return <div className="flex h-screen w-screen justify-center items-center bg-slate-900">
        <div className="w-[350px] bg-white rounded-lg flex flex-col gap-4 p-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-[30px] ">Sign In</h1>
                <h1 className="text-[16px] w-[300px] text-gray-500 font-semibold text-center ">Enter your credentials to access your account</h1>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col space-y-1 w-[300px]">
                    <label className="font-semibold " htmlFor="email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className="p-1 rounded-md border-2 border-gray-300 focus: outline-none text-purple-500 focus:border-blue-500 " type="email" id="email" required={true} placeholder="johndoe@example.com" />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col space-y-1 w-[300px]">
                    <label className="font-semibold " htmlFor="password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="p-1 rounded-md border-2 border-gray-300 focus: outline-none text-purple-500 focus:border-blue-500 " type="password" id="password" required={true} placeholder="Password" />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={SubmitHandler} className="w-[300px] p-1 bg-black font-semibold text-white rounded-md ">Sign In</button>
            </div>

            <h1 className="flex justify-center items-center">Don't have an account? <Link className="underline" to={{ pathname: '/' }}>Sign Up</Link></h1>

        </div>
    </div>
}