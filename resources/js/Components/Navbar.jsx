import { useEffect, useState } from "react";
import NavLink from "./NavLink";

export default function Navbar() {
    const [url, setUrl] = useState(null);
    useEffect(() => {
        setUrl(window.location.pathname);
    }, []);
    const setLocation = (url) => {
        setUrl(url);
    };
    return (
        <nav class="fixed top-0 left-0 bg-white-800">
            <div class="flex items-center w-screen h-10 bg-blue-500">
                <div class="flex items-center">
                    <div>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 50 50"
                            fill="none"
                            stroke="white"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-utensils"
                        >
                            <path d="M7 21a4 4 0 0 1-4-4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v12a4 4 0 0 1-4 4H7zm4-12h6M7 9h2M7 13h2M7 17h2" />
                        </svg>
                    </div>
                    <div class="ml-10 text-white items-baseline">
                        Alan Resto
                    </div>
                </div>
            </div>
            <div class="mx-auto px-4 shadow bg-white sm:px-6 lg:px-20">
                <div class="flex items-center justify-between h-13">
                    <div class="flex items-center">
                        <div class="hidden md:block">
                            <div class="ml-10 flex items-baseline">
                                <NavLink href="/">
                                    <a
                                        onClick={() => setLocation("/")}
                                        class={`px-3 py-2 text-sm font-medium text-blue-600 ${
                                            url == "/" &&
                                            "border-b-4 border-blue-900"
                                        } focus:outline-none`}
                                    >
                                        Food
                                    </a>
                                </NavLink>
                                <NavLink
                                    onClick={() => setLocation("/transaksi")}
                                    href="/transaksi"
                                >
                                    <a
                                        class={`ml-4 px-3 py-2 text-sm font-medium text-gray-900 hover:text-blue-400 hover:border-b-4 ${
                                            url == "/transaksi" &&
                                            "border-b-4 border-blue-900"
                                        } hover:border-blue-700 focus:outline-none focus:text-white focus:bg-gray-700`}
                                    >
                                        Transaksi
                                    </a>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
