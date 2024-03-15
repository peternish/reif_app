import React from "react";
import Chart1 from "./Components/Chat1";
import { PriceCard } from "./Components/PriceCard";

export default function Dashboard() {
    return (
        <>
            <div className="pb-32">
                <div className="px-4 md:px-10 mx-auto w-full">
                    <div>
                        {/* Card stats */}
                        <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-primary uppercase font-bold text-xs">
                                                    Total Deposite
                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    350,897
                                                </span>
                                            </div>
                                            <div className="relative w-auto pl-4 flex-initial">
                                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-primary">
                                                    <i className="far fa-chart-bar" />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-blueGray-400 mt-4">
                                            <span className="text-primary mr-2">
                                                <i className="fas fa-arrow-up" /> 3.48%
                                            </span>
                                            <span className="whitespace-nowrap">Since last month</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-tertiary uppercase font-bold text-xs">
                                                    Total Expense
                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    2,356
                                                </span>
                                            </div>
                                            <div className="relative w-auto pl-4 flex-initial">
                                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-tertiary">
                                                    <i className="fas fa-chart-pie" />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-blueGray-400 mt-4">
                                            <span className="text-tertiary mr-2">
                                                <i className="fas fa-arrow-down" /> 3.48%
                                            </span>
                                            <span className="whitespace-nowrap">Since last week</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-6/12 xl:w-4/12 px-4">
                                <div className="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg">
                                    <div className="flex-auto p-4">
                                        <div className="flex flex-wrap">
                                            <div className="relative w-full pr-4 max-w-full flex-grow flex-1">
                                                <h5 className="text-secondary uppercase font-bold text-xs">
                                                    Total Businesses
                                                </h5>
                                                <span className="font-semibold text-xl text-blueGray-700">
                                                    12
                                                </span>
                                            </div>
                                            <div className="relative w-auto pl-4 flex-initial">
                                                <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-secondary">
                                                    <i className="fas fa-users" />
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-blueGray-400 mt-4">
                                            <span className="text-secondary mr-2">
                                                <i className="fas fa-arrow-down" /> 1
                                            </span>
                                            <span className="whitespace-nowrap">Since last year</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="px-4 md:px-10 mx-auto w-full -m-24">
                <div className="flex flex-wrap">
                    <div className="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
                        <Chart1 title={"Deposite"} detailData={[50, 40, 300, 320, 500, 350, 200, 230, 500]}/>
                        <Chart1 title={"Expense"} detailData={[10, 30, 120, 200, 50, 35, 180, 200, 420]}/>
                    </div>
                </div>
                <div className="flex flex-wrap mt-4 justify-center mt-24 mb-24">
                    <div className="w-full xl:w-3/12 mb-12 xl:mb-0 px-4">
                        <PriceCard cardColor={"primary"}/>
                    </div>
                    <div className="w-full xl:w-3/12 px-4">
                        <PriceCard cardColor={"secondary"}/>
                    </div>
                    <div className="w-full xl:w-3/12 px-4">
                        <PriceCard cardColor={"tertiary"}/>
                    </div>
                </div>
                <footer className="block py-4">
                    <div className="container mx-auto px-4">
                        <hr className="mb-4 border-b-1 border-blueGray-200" />
                        <div className="flex flex-wrap items-center md:justify-between justify-center">
                            <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                                <div className="text-sm text-black font-semibold py-1">
                                Copyright © {new Date().getFullYear()}{" "}REI Financials. All Rights Reserved {" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    )
}