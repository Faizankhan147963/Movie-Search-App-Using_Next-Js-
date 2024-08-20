import React from 'react'
import { CiImageOff } from "react-icons/ci";
const CardSkeleton = ({ error }: { error?: boolean }) => {
    return (
        <div className={`h-[250px] md:h-[335px] w-[100%]  card`}>
            <div className="shine"></div>
            {
                error && (
                    <CiImageOff />
                )
            }
        </div>
    )
}

export default CardSkeleton