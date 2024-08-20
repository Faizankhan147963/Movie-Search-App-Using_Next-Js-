"use client"
import React from 'react'
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { useEffect } from 'react';
import { BaseUrl } from '@/utils/COnst';
import Link from 'next/link';

interface Igenre {
    id: number;
    name: string;
}

const Sidebar = () => {


    const [genres, settgenres] = useState([])
    const [selectGenres, setselectGenres] = useState("")

    const serachParams = useSearchParams()
    const params = useParams()


    useEffect(() => {
        axios
            .get(`${BaseUrl}/genre/movie/list?api_key=bed5bfedd764de2f0bce38adfa0ae222&language=en-US`)
            .then(({ data }) => {
                settgenres(data.genres);
            })
            .catch((err) => {
                console.log("Error")
            })
    }, [])
    

    useEffect(() => {
        if (serachParams.get("genre")) {
            setselectGenres(serachParams.get("genre")?.toString()!)
            return;
        }
        setselectGenres(params.id.toString())
    }, [params.id])


    return (
        <div>

            <div className='bg-black px-4  max-h-[calc(100vh-77px)] pb-6 overflow-y-scroll scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-black hidden sm:block'>
                <div className='flex flex-col gap-4 pt-4'>
                    <p className='sideBarLink text-[18px]'>Discover</p>


                    <Link className='ml-4 w-fit' href='/discover/now_playing' >
                        <p className={`sideBarLink ${selectGenres === "now_playing" ? 'sideBarLinkActive' : ""}`}>Now Playing</p>
                    </Link>


                    <Link className='ml-4 w-fit' href='/discover/top_rated' >
                        <p className={`sideBarLink ${selectGenres === "top_rated" ? 'sideBarLinkActive' : ""}`}>Top Rated</p>
                    </Link>


                    <Link className='ml-4  w-fit' href='/discover/popular'>
                        <p className={`sideBarLink ${selectGenres === "popular" ? 'sideBarLinkActive' : ""}`}>Popular</p>
                    </Link>


                    <Link className='ml-4  w-fit' href='/discover/upcoming' >
                        <p className={`sideBarLink ${selectGenres === "upcoming" ? 'sideBarLinkActive' : ""}`}>Upcoming</p>
                    </Link>
                </div>

                <div className='flex flex-col gap-4 pt-4 overflow-x-hidden'>
                    <p className='text-[18px] sideBarLink cursor-pointer'>Genres</p>
                    {
                        genres.map((genre: Igenre) => {
                            return (
                                <Link key={genre.id} href={`/genres/${genre.id}?genre=${genre.name.toLocaleLowerCase()}`}
                                    className='w-fit'>
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
    )
}

export default Sidebar