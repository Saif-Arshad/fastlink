"use client"
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import TaskModal from './task-modal';
import { Avatar, Tooltip, Chip } from '@nextui-org/react';
import { createTask, deleteTask, updateTaskStatus } from '@/actions/task.action';
import { EditIcon } from '../icons/table/edit-icon';
import { DeleteIcon } from '../icons/table/delete-icon';
import { useRouter } from "next/navigation";

function Task({ UsersData, data }: any) {
    const [allTasks, setAllTasks] = useState(data);
    const colors = [
        "bg-red-500",
        "bg-green-500",
        "bg-blue-500",
        "bg-purple-500",
        "bg-yellow-500",
        "bg-pink-500",
        "bg-indigo-500",
        "bg-teal-500"
    ];
    const router = useRouter()
    useEffect(() => {
        if (data) {
            setAllTasks(data);
        }
    }, [data]);
    const handleDeleteTask = async (item: any) => {
        toast.promise(
            deleteTask(item).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                return result;
            }),
            {
                loading: "Deleting Task...",
                success: "Task deleted successfully!",
                error: "Error deleting Task.",
            }
        );
        router.refresh()
    };
    const handleEditUser = async (_: string, data: any) => {
        console.log("🚀 ~ handleEditUser ~ data:", data)
        toast.promise(
            updateTaskStatus(data._id, data.status).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                return result;
            }),
            {
                loading: "Editing Task...",
                success: "Task edited successfully!",
                error: "Error editing Task.",
            }
        );
    };
    const handleAddTask = async (_: string, data: any) => {
        toast.promise(
            createTask(data).then((result) => {
                if (result.error) {
                    throw new Error(result.error);
                }
                return result;
            }),
            {
                loading: "Creating Task...",
                success: "Task created successfully!",
                error: "Error creating Task.",
            }
        );
    };

    const formatStatus = (status: string) => {
        return status.includes('_') ? status.replace('_', ' ') : status;
    };

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                    <h3 className="text-xl regular-fontss font-semibold">Task Management</h3>
                </div>
                <div className="flex flex-row gap-3.5 flex-wrap">
                    <TaskModal mode="Add" onConfirm={handleAddTask} usersData={UsersData} />
                </div>
            </div>

            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {allTasks && allTasks.map((task: any) => (
                    <div key={task._id} className="p-4 bg-white dark:bg-[#18181b] shadow-lg rounded-lg border border-gray-200 flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <Chip variant="flat" color="warning" className="capitalize">
                                {task.priority}
                            </Chip>


                            <div className='flex items-center gap-2'>

                                <TaskModal
                                    button={<EditIcon size={20} fill="#1a740e" />}
                                    mode="Edit" onConfirm={handleEditUser} usersData={UsersData} data={task} />

                                <button onClick={(() => handleDeleteTask(task._id))}>

                                    <DeleteIcon size={20} fill="#FF0080" />
                                </button>
                            </div>
                        </div>

                        <h5 className="text-lg font-semibold capitalize text-gray-800 dark:text-gray-100">
                            {task.title}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {task.task}
                        </p>

                        {/* User Avatars */}
                        < div className="flex gap-2 mt-3" >
                            {
                                task.userIds.map((user: any, index: number) => (
                                    <Tooltip key={user._id} content={user.full_name} className="cursor-pointer">
                                        <Avatar
                                            name={user.full_name.toUpperCase()}
                                            size="sm"
                                            className={`text-white ${colors[index % colors.length]}`}
                                        />
                                    </Tooltip>
                                ))
                            }
                        </div>

                        {/* Footer with Status, Comments, and Views */}
                        <div className="flex justify-between items-center mt-4">
                            <Chip variant="flat" color="success" className="capitalize">
                                {formatStatus(task.status)}
                            </Chip>
                        </div>
                    </div>
                ))
                }
            </div >
        </div >
    );
}

export default Task;
