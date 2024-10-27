import React, { useState, useEffect } from "react";
import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    useDisclosure,
    Select,
    SelectItem,
    Chip,
    Textarea
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Plus, Send } from "lucide-react";

interface TaskData {
    task: string;
    userIds: string[];
    assignedBy: string;
    dueDate: string;
    priority: string;
    title: string;
    status: string;
}

type TaskModalProps = {
    mode?: string;
    data?: any;
    usersData?: any;
    button?: React.ReactNode;
    id?: any;
    onConfirm?: (mode: string, data: TaskData) => Promise<void>;
};

const TaskModal = ({
    mode = "Add",
    data,
    id,
    usersData = [],
    onConfirm,
    button,
}: TaskModalProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const router = useRouter();
    const [selectedUsers, setSelectedUsers] = useState<any>([]);
    const [taskData, setTaskData] = useState<TaskData>({
        task: "",
        userIds: [],
        assignedBy: "",
        dueDate: "",
        title: "",
        priority: "low",
        status: "assigned",
        ...data,
    });

    const title = `${mode} Task`;
    const isViewMode = mode === "View";
    const isEditMode = mode === "Edit";
    const buttonText = isViewMode ? "Done" : `${mode} Task`;

    useEffect(() => {
        if (data) {
            setTaskData((prevState) => ({
                ...prevState,
                ...data,
            }));
        }
    }, [data]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaskData((prevState: TaskData) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleConfirm = async () => {
        if (onConfirm) {
            if (isEditMode) {
                const allData = {
                    ...taskData,
                    _id: data._id
                }
                await onConfirm(mode, allData);
            }
            else {
                await onConfirm(mode, taskData);
            }
            setTaskData({
                task: "",
                userIds: [],
                assignedBy: "",
                dueDate: "",
                title: "",
                priority: "low",
                status: "assigned",
            });
            setSelectedUsers([])
            router.refresh();
        }
        onClose();
    };

    const handleSelectionChange = (selectedKeys: Set<string>) => {
        const selectedArray = Array.from(selectedKeys);
        setSelectedUsers(selectedArray);
        setTaskData((prevState) => ({
            ...prevState,
            userIds: selectedArray,
        }));
    };

    return (
        <div>
            {button ? (
                <button onClick={onOpen}>{button}</button>
            ) : (
                <Button onPress={onOpen} color="primary" className="flex items-center gap-x-1">
                    {mode === "Add" ? <Plus className="h-5 w-5" /> : <Send className="h-5 w-5" />}
                    {mode} Task
                </Button>
            )}
            <Modal isOpen={isOpen} onClose={onClose} placement="top-center">
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalBody>
                        {/* Only show status field in Edit mode */}
                        {isEditMode ? (
                            <Select
                                name="status"
                                label="Status"
                                selectedKeys={[taskData.status]}
                                onChange={handleChange}
                                variant="bordered"
                            >
                                <SelectItem key="assigned">Assigned</SelectItem>
                                <SelectItem key="in_progress">In Progress</SelectItem>
                                <SelectItem key="completed">Completed</SelectItem>
                                <SelectItem key="on_hold">On Hold</SelectItem>
                                <SelectItem key="cancelled">Cancelled</SelectItem>
                                <SelectItem key="review">Review</SelectItem>
                                <SelectItem key="approved">Approved</SelectItem>
                            </Select>
                        ) : (
                            <>
                                <Input
                                    name="title"
                                    label="Task Title"
                                    type="text"
                                    value={taskData.title}
                                    onChange={handleChange}
                                    variant="bordered"
                                    disabled={isViewMode}

                                />
                                <Input
                                    name="dueDate"
                                    label="Due Date"
                                    type="date"
                                    value={taskData.dueDate}
                                    onChange={handleChange}
                                    variant="bordered"
                                    disabled={isViewMode}
                                />
                                <Select
                                    name="priority"
                                    label="Task Priority"

                                    selectedKeys={[taskData.priority]}
                                    onChange={handleChange}
                                    variant="bordered"
                                >
                                    <SelectItem key="medium">Medium</SelectItem>
                                    <SelectItem key="high">High</SelectItem>
                                    <SelectItem key="low">Low</SelectItem>
                                    <SelectItem key="critical">Critical</SelectItem>
                                </Select>

                                <Select
                                    items={usersData.users}
                                    variant="bordered"
                                    isMultiline={true}
                                    selectionMode="multiple"
                                    placeholder="Assign to Employees"
                                    labelPlacement="outside"
                                    // @ts-ignore
                                    onSelectionChange={handleSelectionChange}
                                    selectedKeys={new Set(selectedUsers)}
                                    classNames={{
                                        base: "w-full",
                                        trigger: "min-h-12 py-2",
                                    }}
                                    renderValue={(items) => (
                                        <div className="flex flex-wrap gap-2">
                                            {items.map((item) => (
                                                <Chip key={item.key}>{item.data.full_name}</Chip>
                                            ))}
                                        </div>
                                    )}
                                >
                                    {(user: any) => (
                                        <SelectItem key={user._id} textValue={user.full_name}>
                                            <div className="flex gap-2 items-center">
                                                <div className="flex flex-col">
                                                    <span className="text-small">{user.full_name}</span>
                                                    <span className="text-tiny text-default-400">{user.email}</span>
                                                </div>
                                            </div>
                                        </SelectItem>
                                    )}
                                </Select>
                                <Textarea
                                    name="task"
                                    label="Task Description"
                                    value={taskData.task}
                                    onChange={handleChange}
                                    variant="bordered"
                                    disabled={isViewMode}
                                />
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="flat" onPress={onClose}>
                            Close
                        </Button>
                        {!isViewMode && (
                            <Button color="primary" onPress={handleConfirm}>
                                {buttonText}
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
};

export default TaskModal;
