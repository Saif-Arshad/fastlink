import React from "react";

// Example JSON data for the cards with one avatar image
const cardData = [
    {
        title: "Master Dashboard",
        progress: "46%",
        due: "in 3 days",
        avatar: "/avatar_stack.png", // Single image for avatars
    },
    {
        title: "Skill Checklist",
        progress: "46%",
        due: "in 5 days",
        avatar: "/avatar_stack.png", // Single image for avatars
    },
    {
        title: "Personal UI Project",
        progress: "46%",
        due: "in 6 days",
        avatar: "/avatar_stack.png",
    },
    {
        title: "Master UI Project",
        progress: "26%",
        due: "in 5 days",
        avatar: "/avatar_stack.png",
    },
];

const ProjectCard = () => {
    return (
        <div className="space-y-4 w-full lg:w-[30%]">
            {cardData.map((card, index) => (
                <div
                    key={index}
                    className="bg-white p-2 rounded-xl shadow hover:scale-105 transition-all cursor-pointer  flex items-center justify-between dark:bg-[#18181b]"
                >
                    <div className="flex items-center">
                        <img
                            src={card.avatar}
                            alt="Avatars"
                            className="w-20 h-9 rounded-lg contain mr-6"
                        />
                    </div>

                    <div className="h-[45px] w-[2px] bg-green-500"></div>
                    <div className="flex-1 pl-4">
                        <div className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                            {card.title}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-600 flex items-center gap-x-6">
                            <span>{card.progress}</span>
                            <span className="ml-2 text-xs text-gray-400">due {card.due}</span>
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default ProjectCard;
