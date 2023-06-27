import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { RegisterRoutes } from '../utils/ApiRoutes';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [values, setValues] = useState({})
    const [message, setMessage] = useState("")
    const [status, setStatus] = useState("")
    const navigate = useNavigate()
    const handelChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })

    }

    const handelValidation = () => {
        const { password, confirm_password, username, email } = values
        if (password !== confirm_password) {
            toast.error(
                "Password Doesnot Match"
            )
            return false
        } else if (username.length < 3) {
            toast.error(
                "Username should be more than 3 character"
            )
            return false
        } else if (password.length < 8) {
            toast.error("Password should be minimum 8 character")
            return false
        } else if (email == "") {
            toast.error('Email is required')
            return false
        }
        return true
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (handelValidation()) {
            const { email, password, confirm_password, username } = values
            const { data } = await axios.post(RegisterRoutes, {
                username,
                email,
                password,

            })
            setMessage(data.message)
            setStatus(data.status)

            if (status == 200) {
                toast.success(`${message}`
                )
                setTimeout(() => {
                    navigate("/login")
                }, 5000);

            } else if (status == 201) {
                toast.error(`${message}`)
            }
        }

    }

    return (
        <div className="w-full mx-auto  flex justify-center items-center h-screen flex-col">
            <form onSubmit={e => handelSubmit(e)} className='bg-white shadow-md rounded p-14 pt-6 pb-8 mb-4' >
                {message}
                <h1 className='text-center text-3xl mb-4'>Signup</h1>
                <div className='mb-4 '>
                    Username
                    <input type="text" onChange={(e) => handelChange(e)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="username" id="username" />
                </div>
                <div className='mb-4'>
                    Email Address:
                    <input type="email" onChange={(e) => handelChange(e)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="email" id="email" />
                </div>

                <div className='mb-4'>
                    Password
                    <input type="password" onChange={(e) => handelChange(e)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="password" id="password" />
                </div>
                <div className='mb-4'>
                    Confirm Password
                    <input type="password" onChange={(e) => handelChange(e)} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' name="confirm_password" id="confirm_password" />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Signup
                    </button>

                </div>
            </form>
            <ToastContainer />

        </div>
    )
}


export default Signup