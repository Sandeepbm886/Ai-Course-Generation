import { UserInputContext } from '@/app/_context/UserInputContext';
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React, { useContext } from 'react'

function TopicDescription() {
    const {userCourseInput, setUserCourseInput}=useContext(UserInputContext);
    const handleInputChanges=(fieldName, value)=>{
      setUserCourseInput(prev=>({
        ...prev,
        [fieldName]:value
      }))
    }
  return (
    <div className='mx-20 lg:mx-44'>
        {/* Input Topic*/}
            <div>
                <label>Write the topic for which you want to create a course (e.g., Python Programming, Yoga, etc.):</label>
                <Input  placeholder={'Enter topic'} className='h-14 text-xl'
                onChange={(e)=>handleInputChanges('topic', e.target.value)}
                defaultValue={userCourseInput?.topic}/>
            </div>
            <div>
                <label>Write a short description of the topic:</label>
                <Textarea placeholder='About your course' className='h-24 text-xl'
                onChange={(e)=>handleInputChanges('description', e.target.value)}
                defaultValue={userCourseInput?.description}/>
            </div>

        {/* Text Area Desc*/}
    </div>
  )
}

export default TopicDescription