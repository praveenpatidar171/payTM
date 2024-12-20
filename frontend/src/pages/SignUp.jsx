import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
export const SignUp = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const nevigate = useNavigate();
    const SubmitHandler = async () => {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const sendData = { firstName, lastName, email, password };

        if (!firstName || !lastName || !email || !password) {
            alert('fields are missing');
            return;
        }

        try {
            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/user/`, sendData, config);
            localStorage.setItem('userInfo', JSON.stringify(data));
            nevigate('/dashboard');
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) {
            nevigate('/dashboard')
        }
    }, [nevigate])

    return <div className="flex h-screen w-screen justify-center items-center bg-slate-900">
        <div className="w-[350px] bg-white rounded-lg flex flex-col gap-4 p-4">
            <div className="flex flex-col justify-center items-center">
                <h1 className="font-bold text-[30px] ">Sign Up</h1>
                <h1 className="text-[16px] w-[300px] text-gray-500 font-semibold text-center ">Enter your information to create an account</h1>
            </div>

            <div className="flex justify-center items-center">
                <div className="flex flex-col space-y-1 w-[300px]">
                    <label className="font-semibold " htmlFor="FirstName">First Name</label>
                    <input onChange={(e) => setFirstName(e.target.value)} className="p-1 rounded-md border-2 border-gray-300 focus: outline-none text-purple-500 focus:border-blue-500 " type="text" id="FirstName" required={true} placeholder="John" />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col space-y-1 w-[300px]">
                    <label className="font-semibold " htmlFor="LastName">Last Name</label>
                    <input onChange={(e) => setLastName(e.target.value)} className="p-1 rounded-md border-2 border-gray-300 focus: outline-none text-purple-500 focus:border-blue-500 " type="text" id="LastName" required={true} placeholder="Doe" />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col space-y-1 w-[300px]">
                    <label className="font-semibold " htmlFor="Email">Email</label>
                    <input onChange={(e) => setEmail(e.target.value)} className="p-1 rounded-md border-2 border-gray-300 focus: outline-none text-purple-500 focus:border-blue-500 " type="email" id="Email" required={true} placeholder="johndoe@example.com" />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <div className="flex flex-col space-y-1 w-[300px]">
                    <label className="font-semibold " htmlFor="Password">Password</label>
                    <input onChange={(e) => setPassword(e.target.value)} className="p-1 rounded-md border-2 border-gray-300 focus: outline-none text-purple-500 focus:border-blue-500 " type="password" id="Password" required={true} placeholder="Password" />
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={SubmitHandler} className="w-[300px] p-1 bg-black font-semibold text-white rounded-md ">Sign Up</button>
            </div>

            <h1 className="flex justify-center items-center">Already have an account? <Link className="underline" to={{ pathname: '/login' }}>Sign In</Link></h1>

        </div>
    </div>
}