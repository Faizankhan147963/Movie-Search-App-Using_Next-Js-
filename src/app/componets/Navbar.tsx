"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useState } from 'react'
import MobileNavbar from './MobileNavbar'
import Swal from 'sweetalert2'
const Navbar = () => {

    const [input, setinput] = useState("")
    const router = useRouter()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (input === "") {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-start",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Please Enter Movie Name..."
            });
        } else {
            setinput("")
            router.push(`/search/${input}?page=1`)
        }

    }

    return (
        <>
            <div className='bg-[#090b0e] hidden md:block'>
                <div className="flex justify-between items-center py-4 px-2 md:px-10">
                    <Link className='hidden md:block' href="/discover/now_playing">
                        <h2 className='text-white text-2xl font-bold uppercase logoHead'>Movieflex</h2>
                    </Link>

                    <form action="">
                        <input type="text" name="" id="" placeholder='Search Movie Here..'
                            value={input}
                            onChange={(e) => setinput(e.target.value)}
                            className='text-white px-5 py-2 border-none outline-none font-bold bg-[#1b1c21] ' />
                        <button onClick={handleSubmit} className='ml-2 px-2 py-2 bg-[#1b1c21] text-white hover:bg-gray-300 hover:text-black'>Search</button>
                    </form>
                </div>

            </div>
            <MobileNavbar input={input} setinput={setinput} handleSubmit={handleSubmit} />
        </>
    )
}

export default Navbar