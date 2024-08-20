import React from 'react'
import Link from 'next/link';
interface Ipops {
    index: number;
    length: number;
    name: string;
    id: number;
}
const Genres = ({ index, length, name, id }: Ipops) => {
    return (
        <div>
            <Link href={`/genres/${id}?genre=${name.toLowerCase()}`}>
                <div className="flex gap-4 text-gray-400 hover:text-white">
                    <div>{name}</div>
                </div>
            </Link>
        </div>
    )
}

export default Genres