import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, IconButton, Input, Option, Select, Typography } from "@material-tailwind/react";
import { EyeDropperIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from "react";
import YDivider from "../ComponentUtils/YDivider";
import { useNavigate } from "react-router-dom";
import Axios from "../helper/axiosApi";
import useErrorHandler from "../helper/handleError";
import AlertMessage from "../ComponentUtils/AlertMessage";
import { useSelector } from "react-redux";

export default function Signup() {

    const navigate = useNavigate()
    const handleError = useErrorHandler()

    const showAlert = useSelector(state => state.status.alert.show)

    const employeeNumberObj = {
        'Only Me': 1,
        '2 - 5': 2,
        '6 - 10': 6,
        '11 - 20': 11,
        '21 - 50': 21,
        '51 - 100': 51,
        'More than 100': 100
    }

    const [userData, setUserData] = useState({
        name: '',
        companyName: '',
        employeeNumber: '',
        email: '',
        emailConfirm: '',
        password: '',
        passwordConfirm: '',
        phoneNumber: ''
    })

    const [emailConfirmErrorMessage, setEmailConfirmErrorMessage] = useState('')
    const [passwordConfirmErrorMessage, setPasswordConfirmErrorMessage] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const handleInput = (name, value) => {
        setUserData({
            ...userData,
            [name]: value
        })
    }

    const signup = async (e) => {
        e.preventDefault();
        try {
            const res = await Axios().post(`/auth/signup`, userData)
            const authToken = res.data.authToken
            localStorage.setItem('authToken', authToken)
            navigate('/')
        } catch (err) {
            console.log(err)
            handleError(err)
        }
    }

    useEffect(() => {
        if (!userData.email || !userData.emailConfirm || userData.email == userData.emailConfirm) {
            setEmailConfirmErrorMessage('')
        }
        else {
            setEmailConfirmErrorMessage("Email doesn' t match")
        }
        if (!userData.password || !userData.passwordConfirm || userData.password == userData.passwordConfirm) {
            setPasswordConfirmErrorMessage('')
        }
        else {
            setPasswordConfirmErrorMessage("Password doesn' t match")
        }
    }, [userData])

    return (
        <div className="w-screen h-screen grid grid-cols-3">
            {showAlert &&
                <AlertMessage />
            }
            <div className="col-span-3 md:col-span-2 bg-no-repeat bg-center bg-contain flex flex-col justify-center bg-primary p-3 text-center">
                <div className="w-full md:h-[40%] flex flex-col justify-center items-center py-6 text-white ">
                    <h1 className="text-[3rem]">
                        REI Financials
                    </h1>
                    <p className="text-[1.5rem]">
                        Dive into here and get a plus on your business
                    </p>
                    <Button
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
                    <form onSubmit={(e) => signup(e)}>
                        <CardBody className="flex flex-col gap-4">
                            <Typography variant="h3" className="my-3">
                                Sign Up
                            </Typography>
                            <Input
                                name="name"
                                label="Full Name"
                                required
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                            />

                            <Input
                                name="companyName"
                                label="Company Name"
                                required
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                            />

                            <Select
                                name="employeeNumber"
                                label="Employees"
                                required
                                onChange={(val) => handleInput('employeeNumber', val)}
                            >
                                {Object.entries(employeeNumberObj).map(item =>
                                    <Option required value={item[1]}>{item[0]}</Option>
                                )}
                            </Select>

                            <Input
                                name="email"
                                label="Email"
                                type="email"
                                size="lg"
                                required
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                            />

                            <Input
                                name="emailConfirm"
                                label="Confirm Email"
                                type="email"
                                size="lg"
                                required
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                            />

                            <Typography variant="small" className="text-secondary">
                                {emailConfirmErrorMessage}
                            </Typography>

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

                            <Input
                                name="passwordConfirm"
                                label="Confirm Password"
                                type={showPassword ? `text` : `password`}
                                size="lg"
                                required
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                            />

                            <Typography variant="small" className="text-secondary">
                                {passwordConfirmErrorMessage}
                            </Typography>

                            <Input
                                name="phoneNumber"
                                label="Phone Number"
                                type="tel"
                                size="lg"
                                required
                                onChange={(e) => handleInput(e.target.name, e.target.value)}
                            />

                        </CardBody>
                        <CardFooter className="pt-0">
                            <Button fullWidth className="bg-primary" type="submit">
                                Sign Up
                            </Button>
                            <Typography variant="small" className="mt-6 flex justify-center">
                                Already have an account?
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="ml-1 font-bold cursor-pointer"
                                    onClick={() => navigate('/login')}
                                >
                                    Sign In
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
    )
}