"use client"
import axios from 'axios';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react'
import Genres from '@/app/componets/Genres';
import { BaseUrlImage } from '@/utils/COnst';
import { IoMdClose } from 'react-icons/io';
import dynamic from 'next/dynamic';
import { FaPlay } from "react-icons/fa";

const ReactPlayer = dynamic(() => import("react-player/lazy"), { ssr: false })

export interface Root {
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: BelongsToCollection;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: ProductionCompany[];
    production_countries: ProductionCountry[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: SpokenLanguage[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    videos: Videos;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;

}

export interface Videos {
    results: Result[];
}

export interface Result {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
}
export interface BelongsToCollection {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface ProductionCompany {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}


export interface ProductionCountry {
    iso_3166_1: string;
    name: string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1: string;
    name: string;
}



const page = () => {
    const [movie, setmovie] = useState<Root>();
    const [Showtailor, setShowtailor] = useState(false);
    const [trailer, settrailer] = useState("")

    const router = useRouter()
    const params = useParams()
    const mainRef = useRef<HTMLElement>(null)


    useEffect(() => {
        axios.get(
            `https://api.themoviedb.org/3/movie/${params.id}?api_key=bed5bfedd764de2f0bce38adfa0ae222&append_to_response=videos`
        )
            .then((res) => {
                console.log(res.data);
                setmovie(res.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [params.id])


    useEffect(() => {
        const trailindex = movie?.videos?.results?.findIndex(
            (element) => element.type === "Trailer"
        )

        const trailerUrl =
            `https://www.youtube.com/watch?v=${movie?.videos?.results[trailindex!]?.key}`;

        settrailer(trailerUrl)
    }, [movie])

    
    const startPlayerr = () => {
        mainRef?.current?.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        })
        setShowtailor(true)
    }

    return (
        <main className='bg-[#22222a] max-h-[calc(100vh-77px)] min-h-[calc(100vh-77px)] p-8 overflow-y-scroll  overflow-x-hidden
        scrollbar-thin scrollbar-thumb-[#22222a] scrollbar-track-black relative' ref={mainRef}>
            <div className='font-bold text-gray-200 hover:text-white cursor-pointer absolute 
            md:right-5 md:top-10 top-0 right-6'>
                <IoMdClose size={28}
                    onClick={router.back}
                />
            </div>

            <div className="flex justify-center items-center pt-5 md:pt-10">

                <div className="grid md:grid-cols-[300px,1fr] max-w-[1200px] gap-12">
                    <div>
                        <img src={`${BaseUrlImage}${movie?.poster_path}`} alt={movie?.title} />
                    </div>
                    <div className='space-y-6 md:space-y-3 text-gray-200' >
                        <div className="uppercase text-[26px] md:text-[34px] font-medium pr-4">
                            {
                                movie?.title
                            }
                        </div>

                        <div className='flex gap-4 flex-wrap'>
                            {
                                movie?.genres?.map((item, index) => {
                                    return (
                                        <Genres
                                            key={item.id}
                                            index={index}
                                            length={movie.genres.length}
                                            name={item.name}
                                            id={item.id}
                                        />
                                    )
                                })
                            }
                        </div>


                        <div className='flex flex-col md:flex-row gap-2 md:gap-6'>
                            <div>Language: {movie?.original_language?.toUpperCase()}</div>
                            <div>Realease: {movie?.release_date}</div>
                            <div>RunTime: {movie?.runtime}</div>
                            <div>Ratings: {movie?.vote_average}</div>
                        </div>


                        <div>
                            <div className='mt-5 text-gray-300 hover:text-white text-[30px]'>Overview</div>
                            <p className='max-w-[90%] mt-5'>{movie?.overview}</p>
                        </div>


                        <div className='mt-4 bg-white md:w-[30%] w-[50%] text-center p-2 text-black'>
                            <div className='flex items-center justify-between' onClick={() => setShowtailor(true)}>
                                <button className='p-2 font-bold w-fit'>Watch Trailer</button>
                                <div><FaPlay size={22} className='ml-2' /></div>
                            </div>
                        </div>

                        <div className={`absolute top-3 inset-x-[17%] p-3 bg-black md:indet-x-[10%] rounded overflow-hidden transition duration-1000 :
                            ${Showtailor ? "opacity-100 z-50" : "opacity-0 -z-10"}
                            `}>

                            <div className='ml-3 mb-3'><IoMdClose size={32} className='font-bold cursor-auto' onClick={() => setShowtailor(false)} /></div>
                            <div className="relative pt-[56%]">
                                <ReactPlayer
                                    url={trailer}
                                    width="100%"
                                    height="100%"
                                    style={{ position: "absolute", top: "0%", left: "0%" }}
                                    controls={true}
                                    playing={Showtailor}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default page