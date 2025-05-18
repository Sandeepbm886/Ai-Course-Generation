"use client"
import React, { useContext } from 'react'
import { PiSquaresFourFill } from "react-icons/pi";
import { GiDiscussion } from "react-icons/gi";
import { IoOptions } from "react-icons/io5";
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import SelectCategory from './_components/SelectCategory';
import TopicDescription from './_components/TopicDescription';
import SelectOption from './_components/SelectOption';
import { UserInputContext } from '../_context/UserInputContext';
import { GenerateCourseLayout } from '../../../configs/AiModel';
import Loader from './_components/Loader';
import { db } from '../../../configs/db';
import { CourseList } from '../../../configs/schema';
import uuid4 from 'uuid4';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

function CreateCourse() {
  const stepperOptions=[{
    id:1,
    name:"Category",
    icon:<PiSquaresFourFill />
  },
  {
    id:2,
    name:"Topic & Desc",
    icon:<GiDiscussion />
  },
  {
    id:3,
    name:"Options",
    icon:<IoOptions />
  }
]
const {userCourseInput, setUserCourseInput}=useContext(UserInputContext);
const [activeIndex, setActiveIndex]=useState(0);
const [loader,setLoader]=useState(false);
const {user}=useUser();
const router=useRouter();
const checkStaus=()=>{
  if(userCourseInput.length==0){
    return true;
  }
  if(activeIndex==0 && (userCourseInput?.category?.length==0||userCourseInput?.category==undefined)){
    return true;
  }
  if(activeIndex==1 && (userCourseInput?.topic?.length==0||userCourseInput?.topic==undefined)){
    return true;
  }
  else if(activeIndex==2&&(userCourseInput?.difficulty==undefined||userCourseInput?.duration==undefined||userCourseInput?.video==undefined||userCourseInput?.chapters==undefined)){
    return true;
  }
  return false;
}
const hadelGenerateCourse = async () => {
  const BASIC_PROMPT = 'Generate A Course Tutorial on Following Detail With field as Course Name, Description, Along with Chapter Name, about, Duration:';
  const USER_INPUT_PROMPT = 'Category: ' + userCourseInput?.category + ', Topic: ' + userCourseInput?.topic + ', Difficulty Level: ' + userCourseInput?.difficulty + ', Duration: ' + userCourseInput?.duration + ', No.of Chapters: ' + userCourseInput?.chapters + ', in JSON format';
  const FINAL_PROMPT = BASIC_PROMPT + USER_INPUT_PROMPT;
  

  try {
    setLoader(true);
    const result = await GenerateCourseLayout(FINAL_PROMPT);
    console.log(JSON.parse(result));
    setLoader(false); 
    SaveCourseLayoutToDb(JSON.parse(result));
  } catch (err) {
    console.error('Error parsing or fetching:', err);
  }
};

const SaveCourseLayoutToDb=async(courseLayout)=>{
  var id=uuid4();
  setLoader(true);
  const result =await db.insert(CourseList).values({
    courseId:id,
    courseName:userCourseInput?.topic,
    level:userCourseInput?.difficulty,
    category:userCourseInput?.category,
    courseOutput:courseLayout,
    createdBy:user?.primaryEmailAddress?.emailAddress,
    userName:user?.fullName,
    userProfileImage:user?.imageUrl


  })
  console.log("Finished");
  setLoader(false);
  router.replace(`/create-course/${id}`);
}
  return (
    <div>
      <div className='flex flex-col justify-center items-center mt-10'>
        <h2 className='text-4xl font-medium text-primary'>Create Course</h2> 
        <div className='flex items-center mt-10'>
          {stepperOptions.map((item,index)=>(
          <div key={item.id} className='flex items-center'>
            <div  className='flex items-center flex-col w-[50px] md:w-[100px] '>
              <div className={`text-2xl bg-gray-200 p-3 rounded-full text-white ${activeIndex>=index && 'bg-primary'}`}>
                {item.icon}
              </div>
              <h2 className='hidden md:block md:text-sm'>{item.name}</h2>
            </div>
            {index!==stepperOptions?.length-1 &&<div className={`w-[50px] h-1 md:w-[100px] rounded-full lg:w-[170px] bg-gray-300 ${activeIndex-1>=index && 'bg-primary'}`}></div>}
          </div>
          ))}
        </div>
      </div>

      <div className='px-10 md:px-20 lg:px-44 mt-10'>
        {activeIndex==0?<SelectCategory/>:activeIndex==1?<TopicDescription/>:<SelectOption/>}
      <div className='flex justify-between mt-10'>
        <Button variant={"outline"} disabled={activeIndex==0} onClick={()=>setActiveIndex(activeIndex-1)}>Prev</Button>
        {activeIndex<2 &&<Button disabled={checkStaus()} onClick={()=>setActiveIndex(activeIndex+1)}>Next</Button>}
        {activeIndex==2 &&<Button disabled={checkStaus()} onClick={()=> hadelGenerateCourse()}>Generate Course Layout</Button>}
      </div>
      </div>
      <Loader loading={loader}/>
    </div>
  )
}

export default CreateCourse