import { BaseUrlImage } from '@/utils/COnst';
import React, { useState } from 'react'
import CardSkeleton from './CardSkeleton';
import Link from 'next/link';

interface Iprops {
    id: string;
    title: string;
    images: string;
    relaese_Date: string
}
const Card = ({ id, title, images, relaese_Date }: Iprops) => {
    const [loaded, setloaded] = useState(false)
    const [error, seterror] = useState(false)


    return (

        <div className='group h-[250px] md:h-[335px] w-[100%] bg-[#22222a]'>
            {!loaded && !error && <CardSkeleton />}
            {error && <CardSkeleton error />}


            <Link href={`/details/${id}`} className={`${!loaded && error && "hidden"}`}>
                <div className="relative">
                    <img
                        className='shiningImage object-cover h-[250px] md:h-[335px] w-[100%] rounded-xl'
                        src={`${BaseUrlImage}${images}`}
                        alt="Movie Poster"
                        onError={() => seterror(true)}
                        onLoad={() => setloaded(true)}
                    />

                    <div className='absolute bottom-0 p-5 w-[100%] bg-black h-[80px] text-center grid place-items-center transition-all duration-500 opacity-0 group-hover:opacity-100'>{title}</div>
                </div>
            </Link>
        </div>
    )
}

export default Card