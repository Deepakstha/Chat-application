import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { loginRoutes } from '../utils/ApiRoutes'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [values, setValues] = useState({})

    const navigate = useNavigate()
    const handelChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
        console.log(values)

    }

    const handelValidation = () => {
        const { password, email } = values


        if (email.length == "" || password.length == "") {
            toast.error(
                "Email and Password is required"
            )
            return false
        }
        return true
    }

    const handelSubmit = async (e) => {
        e.preventDefault();
        if (handelValidation()) {
            const { email, password } = values
            const { data } = await axios.post(loginRoutes, {
                email,
                password,

            })
            console.log(email, "logini")


            if (data.status == 200) {
                localStorage.setItem("chat-app-user", JSON.stringify(data.user))
                navigate("/")

            } else if (data.status == 403) {
                toast.error(data.message)
            }
        }

    }
    useEffect(() => {
        if (localStorage.getItem("chat-app-user")) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <div className="w-full mx-auto max-w-xs flex justify-center items-center h-screen flex-col">
                <form onSubmit={(e) => handelSubmit(e)} className="bg-white shadow-md rounded px-10 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Email
                        </label>
                        <input onChange={(e) => handelChange(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" name="email" placeholder="Email" />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Password
                        </label>
                        <input onChange={(e) => handelChange(e)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name='password' placeholder="******************" />
                        {/* <p className="text-red-500 text-xs italic">Please choose a password.</p> */}
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                            Login
                        </button>
                        <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                            Forgot Password?
                        </a>
                    </div>
                </form>
                <ToastContainer />


            </div>
        </>
    )
}

export default Login