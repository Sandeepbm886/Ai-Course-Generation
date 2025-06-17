import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { LuBookOpenText } from "react-icons/lu";
import DropDownMenu from './DropDownMenu';
import { BsThreeDotsVertical } from "react-icons/bs";
import { db } from '../../../../configs/db';
import { CourseList } from '../../../../configs/schema';
import { eq } from 'drizzle-orm';

function CourseCard({ course ,refreshData}) {
  const [imgUrl, setImgUrl] = useState('/placeholder.png');
  const apiKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;


  useEffect(() => {
    async function fetchUnsplashImage() {
      const keyword = course.courseOutput?.["Topic"] || "loading";
      try {
        const res = await fetch(
          `https://api.unsplash.com/photos/random?query=${keyword}&client_id=${apiKey}`
        );
        const data = await res.json();
        if (data?.urls?.regular) {
          setImgUrl(data.urls.regular);
        }
      } catch (err) {
        // fallback to placeholder if error
        setImgUrl('/placeholder.png');
      }
    }
    fetchUnsplashImage();
  }, [course?.courseOutput?.["Topic"]]);

  const handelOnDelete = async () => {
    const resp=await db.delete(CourseList).
    where(eq(CourseList.courseId, course.courseId)).
    returning({id:CourseList?.id});

    if(resp){
      refreshData();
    }
  }

  return (
    <Link href={`/create-course/${course.courseId}/finish`} className='no-underline text-black'>
    <div className='shadow-sm rounded-lg border p-2 hover:scale-105 transition-all cursor-pointer mt-4'>
      <Image src={imgUrl} alt={course?.courseOutput?.["Course Name"]} width={300} height={200} className='w-full h-[200px] object-cover rounded-lg' />
      <div className='p-2'>
        <h2 className='font-medium text-lg'>{course?.courseOutput?.["Course Name"]}
          <DropDownMenu handelOnDelete={()=>handelOnDelete()}><BsThreeDotsVertical /></DropDownMenu>
        </h2>
        <p className='text-sm text-gray-400 my-1'>{course?.category}</p>
        <div className='flex items-center justify-between'>
          <h2 className='flex gap-2 items-center p-1 bg-purple-50 text-primary text-sm'>
            <LuBookOpenText />{course?.courseOutput?.["No.of Chapters"]} Chapters
          </h2>
          <h2 className='text-sm bg-purple-50 text-primary p-1 rounded-sm'>
            {course?.level} Level
          </h2>
        </div>
      </div>
    </div>
    </Link>
  )
  
}

export default CourseCard