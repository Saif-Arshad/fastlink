import { getUserTasks } from '@/actions/task.action'
import Task from '@/components/task'
import React from 'react'

async function page() {
    const { data, error } = await getUserTasks()
    return (
        <Task data={data} />
    )
}

export default page