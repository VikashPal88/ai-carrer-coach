import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarImage } from '../ui/avator'

function Navbar() {
    return (
        <nav className='h-16 w-full flex justify-between items-center px-8 border-b-2 '>

            {/* Searh Container */}
            <div className='relative'>
                <button className="absolute left-1 -translate-y-1/2 top-1/2 p-1">
                    <svg
                        width="100"
                        height="100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        role="img"
                        aria-labelledby="search"
                        className="w-5 h-5 text-black"
                    >
                        <path
                            d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
                            stroke="currentColor"
                            strokeWidth="1.333"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </button>
                <input
                    className="input rounded-md px-8 py-1 border-2  focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 "
                    placeholder="Search..."
                    required=""
                    type="text"
                />
            </div>

            <div className='flex justify-center gap-5 items-center'>
                {/* Upgrade to Pro */}
                <div className=''>
                    {/* <Link> */}
                    <Button className="text-[#886EE3] bg-white border-2  hover:bg-[#886EE3]/30  border-[#886EE3]">
                        <svg
                            width="100"
                            height="100"
                            viewBox="0 0 15 15"
                            fillRule="none"
                            xmlns="http://www.w3.org/2000/svg"><path d="M9 3.63601C9 2.76044 9.24207 2.11211 9.64154 1.68623C10.0366 1.26502 10.6432 1 11.5014 1C12.4485 1 13.0839 1.30552 13.4722 1.80636C13.8031 2.23312 14 2.84313 14 3.63325H15C15 2.68242 14.7626 1.83856 14.2625 1.19361C13.6389 0.38943 12.6743 0 11.5014 0C10.4294 0 9.53523 0.337871 8.91218 1.0021C8.29351 1.66167 8 2.58135 8 3.63601V6H1C0.447715 6 0 6.44772 0 7V13C0 13.5523 0.447715 14 1 14H10C10.5523 14 11 13.5523 11 13V7C11 6.44772 10.5523 6 10 6H9V3.63601ZM1 7H10V13H1V7Z"
                                fill="currentColor"
                                fill-rule="evenodd"
                                clip-rule="evenodd"></path></svg>
                        <span className=''>Upgrade to Pro</span>
                    </Button>
                    {/* </Link> */}
                </div>

                {/* Notification */}
                <div className='bg-white bg-transparent'>
                    <Button className="bg-white shadow-none hover:bg-white text-black rounded-full ">
                        <svg
                            width="30"
                            height="30"
                            className='h-10 w-10'
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 20H2V18H3V11.0314C3 6.04348 7.02944 2 12 2C16.9706 2 21 6.04348 21 11.0314V18H22V20ZM5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path>
                        </svg>
                    </Button>
                </div>

                {/* Avatar */}
                <div>
                    <Avatar className='flex items-center justify-start  cursor-pointer'
                    >
                        <img src="avatar.jpg" alt="logo" sizes="150"
                            className="w-20 h-15 flex justify-start"

                        />
                    </Avatar>
                </div>
            </div>
        </nav>
    )
}

export default Navbar