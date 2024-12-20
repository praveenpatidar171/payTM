import { useEffect, useState } from "react";
import { UserState } from "../provider/UserProvider"
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const DashBoard = () => {
    const {user} = UserState();
    const [balance, setBalance] = useState();
    const [query, setQuery] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const nevigate = useNavigate();
    const getBalance = async () => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`
                }
            }
            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/account/balance`, config);
            setBalance(data);
            setLoading(false);
        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getBalance();
    }, [user]);

    const getUsers = async (search) => {
        try {
            setLoading(true);
            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`,
                }
            }

            const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/user?search=${search}`, config);

            search[0] !== ' ' && search.length > 0 ? setSearchResults(data) : setSearchResults([]);
            console.log(data);
            setLoading(false);


        } catch (error) {
            console.log(error.message);
        }
    }

    useEffect(() => {
        getUsers(query);
    }, [query]);

    const handleSendMoney = (user1) => {
        nevigate('/sendMoney', { state: { user1 } })
    };

    // if (loading) return <>Loading....</>
    return <div className="h-screen w-full flex flex-col gap-5">
        <div className=" flex justify-between items-center px-[20px] p-4 border-b-2 border-gray-400 ">
            <h1 className="text-[30px] font-bold ">Payments App</h1>
            <div className="flex justify-between items-center w-[250px] ">
                <h1 className="text-[30px] font-semibold ">Hello, {user && user.firstName[0].toUpperCase() + user.firstName.substring(1)} </h1>
                <div className="text-[20px] flex justify-center items-center font-semibold bg-slate-200 rounded-full w-[40px] h-[40px] ">
                    <h1>
                        {user && user.firstName[0].toUpperCase()}
                    </h1>
                </div>
            </div>
        </div>
        <div className="px-[20px]">
            <h1 className="text-[25px] font-bold ">{`Your Balance $ ${balance ? balance : ''}`}</h1>
        </div>
        <div className="w-full flex flex-col gap-3 px-[20px]">
            <h1 className="text-[25px] font-bold">Users</h1>
            <input onChange={(e) => setQuery(e.target.value)} className="border-2 p-1 px-3 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full " type="text" placeholder="Search Users" id="text" />
            <div className="rounded-lg flex flex-col space-y-2 w-full">
                {searchResults && searchResults
                    .map((user) =>
                        <div key={user._id} className="flex justify-between bg-white items-center h-[50px] ">
                            <div className="flex items-center space-x-4">
                                <div className="text-[20px] flex justify-center items-center font-semibold bg-slate-200 rounded-full w-[40px] h-[40px] ">
                                    <h1>
                                        {user && user.firstName[0].toUpperCase()}
                                    </h1>
                                </div>
                                <div className="flex space-x-1">
                                    <h1 className="text-[20px] font-semibold">{user.firstName[0].toUpperCase() + user.firstName.substring(1)}</h1>
                                    <h1 className="text-[20px] font-semibold">{user.lastName[0].toUpperCase() + user.lastName.substring(1)}</h1>
                                </div>
                            </div>
                            <button onClick={() => handleSendMoney(user)} className="bg-black rounded-md text-white font-semibold p-2 ">Send Money</button>
                        </div>
                    )}
            </div>
        </div>
    </div>
}