import { useParams, useSearchParams } from 'next/navigation';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import { BaseUrl } from '@/utils/COnst';
import Link from 'next/link';
import { IoClose } from "react-icons/io5";
import axios from 'axios';

interface IProps {
    input: string;
    setinput: Dispatch<SetStateAction<string>>;
    handleSubmit: (e: React.FormEvent) => void
}

interface Igenre {
    id: number;
    name: string;
}

const MobileNavbar = ({ input, setinput, handleSubmit }: IProps) => {

    const [isOpne, setisopen] = useState(false)
    const [genres, settgenres] = useState([])
    const [selectGenres, setselectGenres] = useState("")

    const serachParams = useSearchParams()
    const params = useParams()

    useEffect(() => {
        axios
            .get(`${BaseUrl}/genre/movie/list?api_key=bed5bfedd764de2f0bce38adfa0ae222&language=en-US`)
            .then(({ data }) => {
                console.log(data.genres);
                settgenres(data.genres);
            })
            .catch((err) => {
                console.log("Error")
            })
    }, [])

    useEffect(() => {
        if (serachParams.get("genre")) {
            setselectGenres(serachParams.get("genre")!)
            return;
        }

        setselectGenres(params.id.toString())
    }, [serachParams.get("genre"), params.id])

    return (
        <>
            <form action="" className='md:hidden flex justify-between items-center w-[100%] p-5' 
            onSubmit={handleSubmit}>

                <div className='cursor-pointer' onClick={() => setisopen(true)}>
                    <GiHamburgerMenu size={32} />
                </div>
                <div className='space-x-1'>
                    <input type="text" name="" id="" placeholder='Search Movie Here..'
                        value={input}
                        onChange={(e) => setinput(e.target.value)}
                        className='text-white px-4 py-2 border-none w-[180px] outline-none font-bold bg-[#1b1c21] ' />
                    <button onClick={handleSubmit} className='ml-2 px-2 py-2 bg-[#1b1c21] text-white hover:bg-gray-300 hover:text-black'>Search</button>
                </div>
            </form>

            {/* {Full Scrreen Div} */}

            <div
                className={` md:hidden min-h-[100vh] max-h-[100vh] w-[100%] bg-[#1b1c21] fixed top-0 z-10 overflow-x-hidden
                 ${isOpne ? 'block' : 'hidden'}`}>


                <div className='sticky top-0 bg-[#1b1c21] py-4 w-[100%] flex justify-between p-5'>
                    <Link className='w-fit' href='/discover/now_playing' onClick={() => setisopen(false)}>
                        <div className=' text-[28px]  cursor-pointer  '>
                            MOVIEFLEX
                        </div>
                    </Link>
                    <IoClose size={32} onClick={() => setisopen(false)} className='cursor-pointer' />
                </div>


                <div className='px-4 pb-16'>
                    <div className='flex flex-col gap-4 pt-4'>
                        <p className='sideBarLink text-[18px]'>Discover</p>

                        <Link className='ml-4 w-fit' href='/discover/now_playing'
                         onClick={() => setisopen(false)}>
                            <p className={`sideBarLink ${selectGenres === "now_playing" ? 'sideBarLinkActive' : ""}`}>Now Playing</p>
                        </Link>


                        <Link className='ml-4 w-fit' href='/discover/top_rated' onClick={() => setisopen(false)}>
                            <p className={`sideBarLink ${selectGenres === "top_rated" ? 'sideBarLinkActive' : ""}`}>Top Rated</p>
                        </Link>


                        <Link className='ml-4  w-fit' href='/discover/popular' onClick={() => setisopen(false)}>
                            <p className={`sideBarLink ${selectGenres === "popular" ? 'sideBarLinkActive' : ""}`}>Popular</p>
                        </Link>


                        <Link className='ml-4  w-fit' href='/discover/upcoming' onClick={() => setisopen(false)}>
                            <p className={`sideBarLink ${selectGenres === "upcoming" ? 'sideBarLinkActive' : ""}`}>Upcoming</p>
                        </Link>
                    </div>

                    <div className='flex flex-col gap-4 pt-4'>
                        <p className='text-[18px] sideBarLink cursor-pointer'>Genres</p>
                        {
                            genres.map((genre: Igenre) => {
                                return (
                                    <Link key={genre.id} href={`/genres/${genre.id}?genre=${genre.name.toLocaleLowerCase()}`}
                                        className='w-fit'
                                        onClick={() => setisopen(false)}>
                                        <p className={`sideBarLink ml-[35px]
                                        ${genre.name.toLocaleLowerCase() === selectGenres ? "sidebarActive" : ""}`}>
                                            {genre.name}
                                        </p>
                                    </Link>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
        </>
    )
}

export default MobileNavbar