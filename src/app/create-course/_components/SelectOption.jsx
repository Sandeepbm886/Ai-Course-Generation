import React, { useContext } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from '@/components/ui/input'
import { UserInputContext } from '@/app/_context/UserInputContext';


function SelectOption() {
        const {userCourseInput, setUserCourseInput}=useContext(UserInputContext);
        const handleInputChanges=(fieldName, value)=>{
          setUserCourseInput(prev=>({
            ...prev,
            [fieldName]:value
          }))
        }
    return (
        <div className='px-10 md:px-20 lg:px-44'>
            <div className='grid grid-cols-2'>
                <div>
                    <label className='text-sm'>Difficulty Level</label>

                    <Select onValueChange={(value)=>handleInputChanges('difficulty', value)} defaultValue={userCourseInput?.difficulty}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="Beginner">Beginner</SelectItem>
                            <SelectItem value="Intermediate">Intermediate</SelectItem>
                            <SelectItem value="Pro">Pro</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>Course Duration</label>

                    <Select onValueChange={(value)=>handleInputChanges('duration', value)} defaultValue={userCourseInput?.duration}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="1 Hours">1 Hours</SelectItem>
                            <SelectItem value="2 Hours">2 Hours</SelectItem>
                            <SelectItem value="More than 3 Hours">More than 3 Hours</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>Add Video</label>

                    <Select onValueChange={(value)=>handleInputChanges('video', value)} defaultValue={userCourseInput?.video}>
                        <SelectTrigger className="">
                            <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="">
                            <SelectItem value="Yes">Yes</SelectItem>
                            <SelectItem value="No">No</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <label className='text-sm'>No.of Chapters</label>
                    <Input type='number' onChange={(e)=>handleInputChanges('chapters', e.target.value)} defaultValue={userCourseInput?.chapters} min={1}/>
                </div>
            </div>
        </div>
    )
}

export default SelectOption