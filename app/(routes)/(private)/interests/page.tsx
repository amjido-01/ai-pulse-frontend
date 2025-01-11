'use client'
import React from 'react'
import { useAuthStore } from "@/store/use-auth";

const Page = () => {
    const {user} = useAuthStore()
    console.log(user)
  return (

    <div>
    </div>
  )
}

export default Page