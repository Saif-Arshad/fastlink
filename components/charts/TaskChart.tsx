"use client";
import React, { useState } from "react";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Plugin,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { defaults } from "chart.js/auto";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// Custom plugin for adding shadow effect to lines with individual shadow colors
const shadowPlugin: Plugin<"line"> = {
    id: "coloredShadows",
    beforeDatasetDraw: function (chart, args) {
        const { ctx } = chart;
        const datasetIndex = args.index;
        const dataset = chart.data.datasets[datasetIndex];

        // Apply shadow color based on the dataset's line color
        const lineColor = dataset.borderColor as string;

        if (lineColor === "rgba(255, 99, 132, 1)") {
            // Red line shadow
            ctx.shadowColor = "rgba(255, 99, 132, 0.5)"; // Red shadow
        } else if (lineColor === "rgba(54, 162, 235, 1)") {
            // Blue line shadow
            ctx.shadowColor = "rgba(54, 162, 235, 0.5)"; // Blue shadow
        }

        // Apply shadow properties
        ctx.shadowBlur = 30;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 20;

        // Save the current context state for each line
        ctx.save();
    },
    afterDatasetDraw: function (chart) {
        const { ctx } = chart;
        // Restore context after each line is drawn to reset the shadow
        ctx.restore();
    },
};

const TaskChart = () => {
    // State to manage the current view (Day, Week, Month)
    const [view, setView] = useState("week");

    // Dummy data for each view
    const dataByView = {
        day: {
            labels: ["8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM"],
            datasets: [
                {
                    label: "Tasks Created",
                    data: [3, 4, 2, 5, 7, 4, 6],
                    borderColor: "rgba(255, 99, 132, 1)", // Red line
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    tension: 0.4,
                },
                {
                    label: "Tasks Completed",
                    data: [2, 3, 3, 4, 6, 3, 5],
                    borderColor: "rgba(54, 162, 235, 1)", // Blue line
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    tension: 0.4,
                },
            ],
        },
        week: {
            labels: ["Apr 01", "Apr 02", "Apr 03", "Apr 04", "Apr 05", "Apr 06", "Apr 07"],
            datasets: [
                {
                    label: "Tasks Created",
                    data: [14, 16, 12, 16, 18, 10, 15],
                    borderColor: "rgba(255, 99, 132, 1)", // Red line
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    tension: 0.4,
                },
                {
                    label: "Tasks Completed",
                    data: [10, 12, 11, 14, 13, 8, 12],
                    borderColor: "rgba(54, 162, 235, 1)", // Blue line
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    tension: 0.4,
                },
            ],
        },
        month: {
            labels: ["Apr 01", "Apr 05", "Apr 10", "Apr 15", "Apr 20", "Apr 25", "Apr 30"],
            datasets: [
                {
                    label: "Tasks Created",
                    data: [50, 55, 45, 60, 58, 62, 57],
                    borderColor: "rgba(255, 99, 132, 1)", // Red line
                    backgroundColor: "rgba(255, 99, 132, 0.2)",
                    tension: 0.4,
                },
                {
                    label: "Tasks Completed",
                    data: [40, 48, 42, 50, 53, 55, 52],
                    borderColor: "rgba(54, 162, 235, 1)", // Blue line
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    tension: 0.4,
                },
            ],
        },
    };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true,
                mode: "nearest",
                intersect: false,
            },
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: "rgba(200, 200, 200, 0.2)",
                },
            },
        },
    };

    // Handle the toggle for Day, Week, Month views
    const handleToggle = (view: any) => {
        setView(view);
    };

    return (
        <div className="p-6 bg-white rounded-xl w-full lg:w-[70%] shadow dark:bg-[#18181b]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300ss">Task Created Vs Task Completed</h2>
                <div className="flex items-center gap-x-3">
                    <span className="font-semibold text-base">Sort By</span>
                    <div className="relative">
                        <select
                            className="border p-2 rounded-lg"
                            value={view}
                            onChange={(e) => handleToggle(e.target.value)}
                        >
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Line chart */}
            <div className="h-64">
                {/* Registering the custom plugin for colored shadows */}
                {/* @ts-ignore */}
                <Line data={dataByView[view]} options={options} plugins={[shadowPlugin]} />
            </div>
        </div>
    );
};

export default TaskChart;
