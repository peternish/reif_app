import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
} from "@material-tailwind/react";
import YDivider from "../ComponentUtils/YDivider";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Axios from "../helper/axiosApi";
import useErrorHandler from "../helper/handleError";

export default function Login() {

    const navigate = useNavigate()
    const handleError = useErrorHandler()

    const [userData, setUserData] = useState({
        email: '',
        password: ''
    })
    const [showPassword, setShowPassword] = useState(false)

    const handleInput = (name, value) => {
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const signin = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios().post('/auth/signin', userData)
            const authToken = res.data.authToken
            localStorage.setItem('authToken', authToken)
            navigate('/dashboard')
        } catch (err) {
            console.log(err)
            handleError(err)
        }
    }

    return (
        <div className="w-screen h-screen grid grid-cols-3">
            <div className="col-span-3 md:col-span-2 bg-no-repeat bg-center bg-contain flex flex-col justify-center bg-primary p-3 text-center">
                <div className="w-full md:h-[40%] flex flex-col justify-center items-center py-6 text-white ">
                    <h1 className="text-[3rem]">
                        REI Financials
                    </h1>
                    <p className="text-[1.5rem]">
                        Dive into here and get a plus on your business
                    </p>
                    <Button
                        onClick={() => navigate('/signup')}
                        className="bg-primary my-6 px-8 rounded rounded-[1rem] border-white border-2 text-[1.2rem]"
                    >
                        Sign Up
                    </Button>
                </div>
                <div className="w-full hidden md:block h-[60%] bg-no-repeat flex bg-center" style={{ backgroundImage: `url('img/hero-img.svg')` }}>
                </div>
            </div>
            <div className="col-span-3 md:col-span-1 flex items-center justify-center">
                <Card className="w-96 shadow-none">
                    <form onSubmit={(e) => signin(e)}>
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h3" className="my-3">
                                Sign In
                            </Typography>

                            <Input
                                name="email"
                                label="Email"
                                type="email"
                                size="lg"
                                required
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                            />

                            <Input
                                name="password"
                                label="Password"
                                type={showPassword ? `text` : `password`}
                                size="lg"
                                required
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                                icon={
                                    showPassword ?
                                        <EyeSlashIcon className="cursor-pointer" onMouseUp={() => setShowPassword(false)} onMouseLeave={() => setShowPassword(false)} /> :
                                        <EyeIcon className="cursor-pointer" onMouseDown={() => setShowPassword(true)} onMouseLeave={() => setShowPassword(false)} />
                                }
                            />

                            <div className="cursor-pointer font-bold">
                                Forgot Password?
                            </div>
                            {/* <div className="-ml-2.5">
                                <Checkbox label="Remember Me" />
                            </div> */}
                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button type="submit" fullWidth className="bg-primary">
                                Sign In
                            </Button>
                            <Typography variant="small" className="mt-6 flex justify-center">
                                Don&apos;t have an account?
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="ml-1 font-bold cursor-pointer"
                                    onClick={() => navigate('/signup')}
                                >
                                    Sign up
                                </Typography>
                            </Typography>
                            <YDivider />
                            <div className="flex justify-center w-full justify-center my-3">
                                <i className=" ml-6 cursor-pointer fa-brands fa-google"></i>
                                <i className=" ml-6 cursor-pointer fa-brands fa-x-twitter"></i>
                                <i className=" ml-6 cursor-pointer fa-brands fa-linkedin-in"></i>
                                <i className=" ml-6 cursor-pointer fa-brands fa-apple"></i>
                            </div>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
