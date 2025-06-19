import React from 'react'
import YouTube from 'react-youtube'
import ReactMarkdown from 'react-markdown'
const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 0,
  },
};

function ChapterContent({ chapter, content }) {
  return (
    <div className='p-10'>
      <h2 className='font-medium text-2xl'>{chapter?.["Chapter Name"]}</h2>
      <p className='text-gray-500'>{chapter?.["about"]}</p>
      <div className='flex justify-center  my-6'>
        <YouTube videoId={content?.videoId} opts={opts} />
      </div>

      <div>
        {content?.content?.map((item, index) => (
          <div key={index} className='p-5 bg-slate-300 mb-3 rounded-lg'>
            <h2 className='font-bold text-[20px] underline'>{item?.title}</h2>
            <div className='whitespace-pre-wrap'>
              <ReactMarkdown>
                {item?.explanation}
              </ReactMarkdown>
            </div>
            {item?.["Code Example"] != "Not Applicable" &&
              <div className='p-4 bg-black text-white rounded-md mt-3'>
                <pre>
                  <code>
                    {item?.["Code Example"]?.replace(/<\/?precode>/g, '')}
                  </code>
                </pre>
              </div>}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChapterContent