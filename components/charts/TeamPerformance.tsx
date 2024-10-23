"use client"

import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const PerformanceCard = () => {
    // Dummy data
    const completedTasks = 124;
    const completionPercentage = 86; // This is for the orange arc
    const score = 79;
    const improvement = 5;

    // Chart.js data and options
    const data = {
        datasets: [
            {
                data: [30, 40, 30],
                backgroundColor: ["#FF6B6B", "#E5E5E5", "#05549F"],
                borderWidth: 0,
                hoverBackgroundColor: ["#FF6B6B", "#E5E5E5", "#05549F"],
            },
        ],
    };

    const options = {
        cutout: "70%", // Creates the "donut hole"
        rotation: -90, // Rotates chart for a half-circle appearance
        circumference: 180, // Limits the chart to a semi-circle
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
        },
    };

    return (
        <div className="bg-white p-6 rounded-xl border-2 border-slate-50 w-full lg:w-[30%] text-center">
            <div className="text-lg font-semibold mb-6 text-gray-600">
                Your Team Performance This Week
            </div>

            <div className="relative w-36 h-36 mx-auto mb-4">
                <Doughnut data={data} options={options} />
                {/* Adjusted Score Styling for perfect alignment */}
                <div className="absolute top-[74%] left-1/2 transform -translate-x-1/2 -translate-y-[60%] text-center">
                    <div className="text-4xl font-bold">{score}</div>
                    <div className="text-sm text-gray-500">Score</div>
                </div>
            </div>

            <div className="text-sm text-gray-500 mb-4">
                Your team performance is {improvement}% better this week.
            </div>

            <button className="bg-teal-500 text-white py-2 px-8 rounded-full mb-6 hover:bg-teal-600 transition">
                View Details
            </button>

            <div className="flex justify-between items-center text-sm px-4 border-t pt-2">
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-purple-500 rounded-full mr-2"></span>
                    Completed {completedTasks}
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    Percentage {completionPercentage}%
                </div>
            </div>
        </div>
    );
};

export default PerformanceCard;
