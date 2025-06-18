"use client"
import { UserCourseListContext } from '../_context/UserCourseListContext.jsx'
import Header from './_components/Header.jsx'
import Sidebar from './_components/Sidebar.jsx'
import React, { useState } from 'react'

function Dashboardlayout({children}) {
  const [userCourseList, setUserCourseList] = useState([])
  return (
    <UserCourseListContext.Provider value={{userCourseList, setUserCourseList}}>
    <div>
      <div className='md:w-64 hidden md:block'>
        <Sidebar/>
      </div>
      <div className='md:ml-64'>
        <Header/>
        <div className='p-10'>
        {children}
        </div>
        
      </div>
    </div>
    </UserCourseListContext.Provider>
  )
}

export default Dashboardlayout