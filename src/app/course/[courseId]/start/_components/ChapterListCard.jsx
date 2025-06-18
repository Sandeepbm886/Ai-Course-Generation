import React from 'react'
import { FaRegClock } from "react-icons/fa";
function ChapterListCard({ chapter, index }) {
    return (
        <div className='flex items-center   gap-4 p-3'>
            <div>
                <h2 className='p-1 bg-primary w-8 h-8 text-center text-white rounded-full'>{index+1}</h2>
            </div>
            <div className='flex-1'>
                <h2 className='font-medium'>{chapter?.["Chapter Name"]}</h2>
                <h2 className='flex items-center gap-1 text-sm text-primary'><FaRegClock />{chapter?.["Duration"]}</h2>
            </div>
        </div>

    )
}

export default ChapterListCard