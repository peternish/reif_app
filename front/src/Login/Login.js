import React from "react";
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

export default function Login() {

    const navigate = useNavigate()

    return (
        <div className="w-screen h-screen grid grid-cols-3">
            <div className="col-span-2 bg-no-repeat bg-center bg-contain flex flex-col justify-center bg-primary">
                <div className="w-full h-[40%] flex flex-col justify-center items-center py-6 text-white ">
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
                <div className="w-full h-[60%] bg-no-repeat flex bg-center" style={{ backgroundImage: `url('img/hero-img.svg')` }}>
                </div>
            </div>
            <div className="col-span-1 flex items-center justify-center">
                <Card className="w-96 shadow-none">
                    <CardBody className="flex flex-col gap-4">
                        <Typography variant="h3" className="my-3">
                            Sign In
                        </Typography>
                        <Input label="Email" type="email" size="lg" />
                        <Input label="Password" type="password" size="lg" />
                        <div className="cursor-pointer font-bold">
                            Forgot Password?
                        </div>
                        <div className="-ml-2.5">
                            <Checkbox label="Remember Me" />
                        </div>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Button fullWidth className="bg-primary" onClick={() => navigate('/')}>
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
                </Card>
            </div>
        </div>
    );
}
