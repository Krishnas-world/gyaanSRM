import Footer from '@/components/Footer'
import StudentHeader from '@/components/StudentHeader'
import UserProfile from '@/components/UserProfile'
import React from 'react'

const page = () => {
  return (
    <div>
          <StudentHeader/>
          <UserProfile/>
          <Footer/>
    </div>
  )
}

export default page