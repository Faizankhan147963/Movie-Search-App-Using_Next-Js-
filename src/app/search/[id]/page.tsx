"use client"
import Card from '@/app/componets/Card';
import Loading from '@/app/componets/Loading';
import { BaseUrl } from '@/utils/COnst';
import axios from 'axios';
import { useParams, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react'
import { useState } from 'react';

export interface Imovie {
    id: string;
    poster_path: string;
    title: string;
    relaese_Date: string;
}


const page = () => {

    const [title, settile] = useState("")
    const [search, setSearch] = useState("")
    const [moives, setMovies] = useState([])
    const [currentPage, setcurrentPage] = useState(1)
    const [Total, setTotal] = useState(1)

    const mainRef = useRef<HTMLElement>(null)

    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()


    useEffect(() => {
        mainRef?.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        })

        const id = params.id.toString()
        const page = searchParams.get("page")


        settile(`${id} Movie`)
        setSearch(id)

        axios.get(`${BaseUrl}/search/movie`, {
            params: {
                api_key: `bed5bfedd764de2f0bce38adfa0ae222`,
                query: id,
                page
            }
        })
            .then((res) => {
                console.log("Search Data: " + res.data.results)
                setMovies(res.data.results)
                setcurrentPage(res.data.page)
                setTotal(res.data.total_page)
            })
            .catch((err) => {
                console.log(err);
            })

    }, [params.id, searchParams.get("page")])


    function HandleChnage(button: string) {
        let page = ""
        if (button === "prev") {
            page = `page=${currentPage - 1}`
        } else {
            page = `page=${currentPage + 1}`
        }

        router.push(`/search/${search}?${page}`)
    }
    return (
        <main className='bg-[#22222a] max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8 overflow-y-scroll overflow-x-hidden
    scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-black relative' ref={mainRef}>
            <h2 className='text-[24px] font-bold tracking-[1px]'>{title}</h2>
            {
                moives.length === 0 && (
                    <Loading />
                )
            }

            <div className='grid md:grid-cols-5 grid-cols-2  gap-8 movieGrid place-items-center mt-8'>
                {
                    moives.map((movie: Imovie) => {
                        return (
                            <Card
                                key={movie.id}
                                id={movie.id}
                                images={movie.poster_path}
                                title={movie.title}
                                relaese_Date={movie.relaese_Date}
                            />
                        )
                    })
                }
            </div>


            <div className='flex justify-center gap-16 py-6 pt-16'>
                <button className={`bg-purple-800  hover:bg-purple-950 px-8 py-2 rounded-xl 
        ${currentPage === 1 ? "hidden " : ""}`}
                    onClick={() => HandleChnage("prev")}>Prev</button>
                <button className={`bg-purple-800 hover:bg-purple-950  px-8 py-2 rounded-xl ${currentPage === Total ? "hidden" : ""}`}
                    onClick={() => HandleChnage("next")}>Next</button>
            </div>
        </main>
    )
}

export default page