import React from "react";

const data = [
    {
        title: "Tasks In Progress",
        current: 210,
        total: 237,
        label: "Current Month",
        img: "/card_1.png",
        border: true
    },
    {
        title: "Tasks Completed",
        current: 185,
        total: 457,
        label: "Current Month",
        img: "/card_2.png",
        border: true
    },
    {
        title: "Monthly Tasks Summary",
        current: 1240,
        total: 1452,
        label: "Current Month",
        img: "/card_3.png"
    },
];

const TaskSummaryCard = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:p-10 py-6 mb-6 border-t-2 border-b-2 border-gray-100 gap-4 bg-white ">
            {data.map((item, index) => (
                <div key={index} className={`w-full text-center flex gap-x-8 ${item.border && "md:border-r-2 border-gray-100"}`}>
                    <div className="flex flex-col">

                        <div className="text-sm text-gray-500 font-semibold mb-2">
                            {item.title}
                        </div>
                        <div className="flex justify-center items-center space-x-2 mb-2">
                            <span className={`text-xl font-semibold  ${index == 0 ? "text-orange-600" : index == 1 ? "text-purple-600" : "text-green-600"}`}>{item.current}</span>
                            <span className={`text-xs p-1 rounded-lg ${index == 0 ? "bg-orange-300" : index == 1 ? "bg-purple-300" : "bg-green-300"}`}>{item.total}</span>
                        </div>
                        <div className={`text-sm text-gray-400`}>{item.label}</div>
                    </div>
                    <div className="mt-4 h-16 flex justify-center">
                        <img src={item.img} alt="Bar chart" className="w-32 h-full object-contain" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskSummaryCard;
