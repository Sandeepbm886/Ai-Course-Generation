import React from 'react'

function ChapterContent({ chapter, content }) {
  return (
    <div className='p-10'>
      <h2 className='font-medium text-2xl'>{chapter?.["Chapter Name"]}</h2>
      <p className='text-gray-500'>{chapter?.["about"]}</p>
    </div>
  )
}

export default ChapterContent