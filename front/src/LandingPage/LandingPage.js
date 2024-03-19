import { useNavigate } from "react-router-dom";
import { IconButton } from "@material-tailwind/react";

import Navbar from "./Components/Navbar.js";
import Footer from "./Components/Footer.js";
import { FAQ } from "./Components/FAQ.js";

export default function Landing() {
    const navigate = useNavigate();

  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-16 flex content-center items-center justify-center"
            style={{
              minHeight: "75vh"
            }}>
          <div className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage: "url('img/backgroundImg.png')",
              }}>
            <span id="blackOverlay" className="w-full h-full absolute opacity-80 bg-primary"></span>
          </div>
          <div className="container relative mx-auto">
              <div className="items-center flex flex-wrap">
                <div className="w-full lg:w-8/12 px-4 ml-auto mr-auto text-center">
                  <div className="pr-12">
                    <h1 className="text-white text-7xl font-bold">
                      WELCOME TO REI Financials
                    </h1>
                    <p className="mt-4 text-3xl text-white mb-10">
                    Welcome to our cutting-edge sales and expense management automation platform, 
                    designed to streamline your business operations and optimize financial processes with ease and efficiency. 
                    </p>
                    <button className={"bg-primary text-3xl text-white active:bg-gray-100 font-bold uppercase px-5 py-5 rounded-full shadow-xl border-white hover:shadow-md outline-none focus:outline-none mt-5"}
                    type="button"
                    style={{ transition: "all .15s ease" }} onClick={() => { navigate('/dashboard') }}>
                    Get Started
                </button>
                  </div>
                </div>
              </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-white -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-tertiary">
                      <i className="fas fa-award"></i>
                    </div>
                    <h6 className="text-2xl font-bold text-tertiary">Business Structure Management</h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      You can build your business structure using pre-built platform.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-secondary">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-2xl font-bold text-secondary">
                      Expense / Deposit Management
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      You can manage your business easily using pre-built platform.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-20 h-20 mb-5 shadow-lg rounded-full bg-primary">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-2xl font-bold text-primary">
                      Import / Export Spreadsheet
                    </h6>
                    <p className="mt-2 mb-4 text-gray-600">
                      You can download spreadsheets from your business and upload it onto your business structures.
                    </p>
                  </div>
                </div>
              </div>
            </div>


            <div className="flex flex-wrap items-center mt-20 mb-20">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <h3 className="text-5xl mb-2 font-bold leading-normal text-secondary">
                  About REI Financials
                </h3>
                <p className="text-2xl font-light leading-relaxed mt-4 mb-4 text-gray-700">
                  Real Estate Investor Financials is designed to streamline your business operations
                  and optimize financial processes with ease and efficiency.
                </p>
                <p className="text-2xl font-light leading-relaxed mt-0 mb-4 text-gray-700">
                  We provide business management system that make your business easier to manage using pre-built platform.
                </p>
              </div>

              <div className="w-full md:w-6/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="img/about.jpg"
                />
              </div>
            </div>
            <div className="flex flex-wrap items-center mt-32 mb-20">
              <video className="h-5/6 w-5/6 rounded-lg p-3xl mx-auto" controls poster="https://irp.cdn-website.com/56499217/dms3rep/multi/commercial+1+screenshot.jpg">
                <source src="https://vid.cdn-website.com/56499217/videos/v4CcXIT3Q9aZ1FzmaTig_TV+Ad+1+-+FINAL-v.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </section>

        <section className="relative py-20 bg-gray-300">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-300 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 mb-8">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto px-1">
                <div className="content px-xl-5">
                  <h1 className="text-secondary text-5xl mb-2 font-semibold leading-normal">Frequently Asked <strong>Questions</strong></h1>
                  <p className="text-2xl font-light leading-relaxed mt-4 mb-4 text-gray-700">
                    Explore the answers to common inquiries about Real Estate Investor Financials.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-7/12 ml-auto mr-auto px-1">
                <div className="md:pr-12">
                  <FAQ/>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-5xl font-bold text-tertiary">
                  What do people say about us?
                </h2>
                <p className="text-lg leading-relaxed m-4 text-gray-600">
                  Don't just take it from us...
                </p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src="img/testimonial-1.jpg"
                    className="shadow-lg rounded-full max-w-full mx-auto"
                    style={{ maxWidth: "120px" }}
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">
                      Dr. Mozel Martin
                    </h5>
                    <p className="mt-1 text-sm text-gray-500 font-semibold">
                      Graylan and his team were wonderful to work with. Very efficient and great communication. Definitely
                      look forward to working with them again.
                    </p>
                    <div className="flex items-center gap-4 justify-center mt-5">
                      <IconButton className="rounded-full bg-primary">
                        <i className="fas fa-heart" />
                      </IconButton>
                      <IconButton className="rounded-full bg-secondary">
                        <i className="fas fa-heart" />
                      </IconButton>
                      <IconButton className="rounded-full bg-tertiary">
                        <i className="fas fa-heart" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src="img/testimonial-2.jpg"
                    className="shadow-lg rounded-full max-w-full mx-auto"
                    style={{ maxWidth: "120px" }}
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">
                      Rose McDaniels
                    </h5>
                    <p className="mt-1 text-sm text-gray-500 font-semibold">
                      After my mom passed, dealing with her house was a nightmare. Then I found this. It
                      turned the nightmare into a dream! Simple process, closed in just 20 days!
                    </p>
                    <div className="flex items-center gap-4 justify-center mt-5">
                      <IconButton className="rounded-full bg-primary">
                        <i className="fas fa-heart" />
                      </IconButton>
                      <IconButton className="rounded-full bg-secondary">
                        <i className="fas fa-heart" />
                      </IconButton>
                      <IconButton className="rounded-full bg-tertiary">
                        <i className="fas fa-heart" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-4/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src="img/testimonial-3.jpg"
                    className="shadow-lg rounded-full max-w-full mx-auto"
                    style={{ maxWidth: "120px" }}
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">
                      Grace Smith
                    </h5>
                    <p className="mt-1 text-sm text-gray-500 font-semibold">
                      I bought an "investment home" that I was going to fix up myself... big mistake. Home Buyer For Cash
                      saved me. I'm gonna go ahead and NOT be a handyman, ok?
                    </p>
                    <div className="flex items-center gap-4 justify-center mt-5">
                      <IconButton className="rounded-full bg-primary">
                        <i className="fas fa-heart" />
                      </IconButton>
                      <IconButton className="rounded-full bg-secondary">
                        <i className="fas fa-heart" />
                      </IconButton>
                      <IconButton className="rounded-full bg-tertiary">
                        <i className="fas fa-heart" />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20 relative block bg-gray-900">
          <div
            className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20"
            style={{ height: "80px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-gray-900 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4 lg:pt-24 lg:pb-32">
            <div className="flex flex-wrap text-center justify-center">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-5xl font-bold text-white">
                  Build something
                </h2>
                <p className="text-lg leading-relaxed mt-4 mb-4 text-gray-500">
                  Put the potentially record low maximum sea ice extent tihs year down to low ice.
                  According to the National Oceanic and Atmospheric Administration, Ted, Scambos.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap mt-12 justify-center">
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-medal text-xl"></i>
                </div>
                <h6 className="text-xl mt-5 font-semibold text-white">
                  Excelent Services
                </h6>
                <p className="mt-2 mb-4 text-gray-500">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-poll text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Grow your market
                </h5>
                <p className="mt-2 mb-4 text-gray-500">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
              <div className="w-full lg:w-3/12 px-4 text-center">
                <div className="text-gray-900 p-3 w-12 h-12 shadow-lg rounded-full bg-white inline-flex items-center justify-center">
                  <i className="fas fa-lightbulb text-xl"></i>
                </div>
                <h5 className="text-xl mt-5 font-semibold text-white">
                  Launch time
                </h5>
                <p className="mt-2 mb-4 text-gray-500">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="relative block py-24 lg:pt-0 bg-gray-300">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center">
              <div className="w-full lg:w-6/12 px-4 mt-20">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-primary">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-4xl font-bold text-white">
                      Contact
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-white text-xl">
                      Complete this form and we will get back to you in 24 hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-white text-xl font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Full Name"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-white text-xl font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Email"
                        style={{ transition: "all .15s ease" }}
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-white text-xl font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-secondary text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded-full shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
