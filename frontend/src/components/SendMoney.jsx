import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { UserState } from "../provider/UserProvider";
import axios from "axios";

export const SendMoney = () => {
    const location = useLocation();
    const { user1 } = location.state;
    const [amount, setAmount] = useState();
    const { user } = UserState();
    const nevigate = useNavigate();

    const handleTransfer = async () => {

        try {
            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`,
                    'Content-type': 'application/json',
                }
            }
            const sendData = {
                amount: amount,
                to: user1._id,
            }

            const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_BASEURL}/api/v1/account/transfer`, sendData, config);

            nevigate('/dashboard');

        } catch (error) {
            console.log(error);
        }
    }

    return <div className="h-screen w-screen bg-slate-100 flex justify-center items-center">
        <div className="h-[350px] w-[400px] bg-white rounded-lg flex flex-col justify-between p-10">
            <h1 className="text-[30px] font-bold text-center">Send Money</h1>
            <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-4">
                    <div className="text-[25px] text-white flex justify-center items-center font-semibold bg-green-500 rounded-full w-[40px] h-[40px] ">
                        <h1>
                            {user1 && user1.firstName[0].toUpperCase()}
                        </h1>
                    </div>
                    <div className="flex space-x-1">
                        <h1 className="text-[25px] font-semibold">{user1.firstName[0].toUpperCase() + user1.firstName.substring(1)}</h1>
                        <h1 className="text-[25px] font-semibold">{user1.lastName[0].toUpperCase() + user1.lastName.substring(1)}</h1>
                    </div>
                </div>
                <h1 className="font-semibold">Amount (in Rs)</h1>
                <input onChange={(e) => setAmount(e.target.value)} value={amount} className="border-2 p-1 px-3 border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-full " type="number" placeholder="Enter Amount" id="number" />
                <button onClick={handleTransfer} className="bg-green-500 text-white w-full rounded-md p-2">Initiate Transfer</button>
            </div>
        </div>
    </div>
}