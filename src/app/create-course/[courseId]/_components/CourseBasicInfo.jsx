import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { BiSolidCategory } from "react-icons/bi";
import EditCourseBasicInfo from './EditCourseBasicInfo';
import Link from 'next/link';

function CourseBasicInfo({ course, refreshData, edit = true }) {
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

  return (
    <div className='p-10 border rounded-xl shadow-sm mt-5'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <h2 className='font-bold text-3xl'>{course?.courseOutput?.["Course Name"]}{edit && <EditCourseBasicInfo course={course} refreshData={() => refreshData(true)} />}</h2>
          <p className='text-sm text-gray-400'>{course?.courseOutput?.["Description"]}</p>
          <h2 className='font-medium mt-2 flex gap-2 items-center text-primary'><BiSolidCategory />{course?.category}</h2>
          {!edit && <Link href={`/course/${course?.courseId}/start`} className='text-sm text-gray-500 hover:text-primary'>
            <Button className='w-full mt-5'>Start</Button>
          </Link>
          }
        </div>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden">
          <Image
            src={imgUrl}
            alt="Course"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </div>
  );
}

export default CourseBasicInfo;