import Register from '@/components/auth/register'
import { redirect } from 'next/navigation';
import React from 'react'

function page() {
    redirect("/dashboard");

    // return (
    //     <Register />
    // )
}

export default page