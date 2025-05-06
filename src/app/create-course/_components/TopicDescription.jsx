import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

function TopicDescription() {
  return (
    <div className='mx-20 lg:mx-44'>
        {/* Input Topic*/}
            <div>
                <label>Write the topic for which you want to create a course (e.g., Python Programming, Yoga, etc.):</label>
                <Input  placeholder='Enter topic'/>
            </div>
            <div>
                <label>Write a short description of the topic:</label>
                <Textarea placeholder='Enter description'/>
            </div>

        {/* Text Area Desc*/}
    </div>
  )
}

export default TopicDescription