import React from "react";
import { Link } from "react-router-dom";
import { heroimg } from "../assets";
import PinkGradientBox from "../components/PinkGradientBox";

const Home = () => {
  return (
    <div>
      <div class="bg-white pb-6 sm:pt-8 lg:pt-6">
        <div class="max-w-screen-2xl px-4 md:px-8 mx-auto">
          <section class="flex flex-col lg:flex-row justify-between gap-6 sm:gap-10 md:gap-16">
            <div class="xl:w-5/12 flex flex-col justify-center sm:text-center lg:text-left lg:py-12 xl:py-24">
              <p class="text-indigo-500 md:text-lg xl:text-xl font-semibold mb-4 md:mb-6">
                Empower Yourself
              </p>

              <h1 class="text-black text-black-800 text-4xl sm:text-5xl md:text-6xl font-bold mb-8 md:mb-12">
                Your voice matters! Report your complaint today!
              </h1>

              <p class="lg:w-4/5 text-gray-500 xl:text-lg leading-relaxed mb-8 md:mb-12">
                Save millions of women from internet harassment and hate by
                reporting a crime.
              </p>

              <div class=" flex flex-col sm:flex-row sm:justify-center lg:justify-start gap-2.5">
                <Link
                  to="/usemodel"
                  class="inline-block bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 focus-visible:ring ring-indigo-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                >
                  Harassment Detection
                </Link>
                <Link
                  to="/linkchecker"
                  class="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
                >
                  Check Website Health
                </Link>
              </div>
            </div>
            <div class="xl:w-5/12 h-48 lg:h-auto bg-gray-100 overflow-hidden shadow-lg rounded-lg">
              <img
                src={heroimg}
                loading="lazy"
                alt="Photo by Fakurian Design"
                class="w-full h-full object-cover object-center"
              />
            </div>
          </section>
          <div className="bg-gray-gradient rounded-2xl w-full mt-10">
            <div class="py-6 sm:py-8 lg:py-12">
              <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
                <div class="flex overflow-hidden rounded-lg bg-gray-100">
                  <div class="relative hidden bg-gray-200 sm:block sm:w-1/3 lg:w-1/2">
                    <img
                      src="https://images.unsplash.com/photo-1604076913837-52ab5629fba9?auto=format&q=75&fit=crop&w=750"
                      loading="lazy"
                      alt="Photo by mymind"
                      class="absolute inset-0 h-full w-full object-cover object-center"
                    />
                  </div>
                  <div class="flex w-full items-center p-4 sm:w-2/3 sm:p-8 lg:w-1/2 lg:pl-10">
                    <div class="flex w-full flex-col items-center sm:block">
                      <div class="mb-4 sm:mb-8">
                        <h2 class="text-center text-xl font-bold text-indigo-500 sm:text-left sm:text-2xl lg:text-3xl">
                          Get the latest articles on cybersecurity
                        </h2>
                        <p class="text-center text-gray-500 sm:text-left">
                          Sign up now!
                        </p>
                      </div>

                      <form class="mb-3 flex w-full max-w-md gap-2 sm:mb-5">
                        <input
                          placeholder="Email"
                          class="bg-gray-white w-full flex-1 rounded border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 outline-none ring-indigo-300 transition duration-100 focus:ring"
                        />

                        <button class="inline-block rounded bg-indigo-500 px-8 py-2 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base">
                          Send
                        </button>
                      </form>

                      <p class="text-center text-xs text-gray-400 sm:text-left">
                        By signing up to our newsletter you agree to our{" "}
                        <a
                          href="#"
                          class="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                        >
                          Term of Service
                        </a>{" "}
                        and{" "}
                        <a
                          href="#"
                          class="underline transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                        >
                          Privacy Policy
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
