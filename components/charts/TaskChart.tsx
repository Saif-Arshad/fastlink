"use client";

import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    Plugin,
    ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { defaults } from "chart.js/auto";
import axios from 'axios';

// Override Chart.js default settings
defaults.maintainAspectRatio = false;
defaults.responsive = true;

// Register Chart.js components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// Define the TaskStatistic interface
interface TaskStatistic {
    label: string;
    tasksCreated: number;
    tasksCompleted: number;
}

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

const TaskChart: React.FC = () => {
    // State to manage the current view (Day, Week, Month)
    const [view, setView] = useState<"day" | "week" | "month">("week");
    const [taskStatistics, setTaskStatistics] = useState<TaskStatistic[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from API whenever 'view' changes
    useEffect(() => {
        const fetchTaskStatistics = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/stats/task-statistics`, {
                    params: { view }
                });
                console.log(response.data)
                setTaskStatistics(response.data.taskStatistics);
            } catch (err) {
                console.error('Error fetching task statistics:', err);
                setError('Failed to load data.');
            } finally {
                setLoading(false);
            }
        };

        fetchTaskStatistics();
    }, [view]);

    // Prepare data for the chart
    const chartData = {
        labels: taskStatistics.map(item => item.label),
        datasets: [
            {
                label: "Tasks Created",
                data: taskStatistics.map(item => item.tasksCreated),
                borderColor: "rgba(255, 99, 132, 1)", // Red line
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                tension: 0.4,
            },
            {
                label: "Tasks Completed",
                data: taskStatistics.map(item => item.tasksCompleted),
                borderColor: "rgba(54, 162, 235, 1)", // Blue line
                backgroundColor: "rgba(54, 162, 235, 0.2)",
                tension: 0.4,
            },
        ],
    };

    // Chart options
    const options: ChartOptions<"line"> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                enabled: true,
                mode: "nearest",
                intersect: false,
            },
            legend: {
                display: true, // Show legend for better user experience
                position: 'top', // Valid value
                labels: {
                    color: 'rgba(0,0,0,0.7)', // Adjust based on theme
                },
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    color: 'rgba(0,0,0,0.7)', // Adjust based on theme
                },
            },
            y: {
                grid: {
                    color: "rgba(200, 200, 200, 0.2)",
                },
                ticks: {
                    color: 'rgba(0,0,0,0.7)', // Adjust based on theme
                },
                beginAtZero: true,
            },
        },
    };

    // Handle the toggle for Day, Week, Month views
    const handleToggle = (selectedView: "day" | "week" | "month") => {
        setView(selectedView);
    };

    return (
        <div className="p-6 bg-white rounded-xl w-full lg:w-[70%] shadow dark:bg-[#18181b]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                    Task Created Vs Task Completed
                </h2>
                <div className="flex items-center gap-x-3">
                    <span className="font-semibold text-base">Sort By</span>
                    <div className="relative">
                        <select
                            className="border p-2 rounded-lg"
                            value={view}
                            onChange={(e) => handleToggle(e.target.value as "day" | "week" | "month")}
                        >
                            <option value="day">Day</option>
                            <option value="week">Week</option>
                            <option value="month">Month</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Handle loading and error states */}
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-gray-500">Loading...</p>
                </div>
            ) : error ? (
                <div className="flex justify-center items-center h-64">
                    <p className="text-red-500">{error}</p>
                </div>
            ) : (
                // Line chart
                <div className="h-64">
                    {/* Registering the custom plugin for colored shadows */}
                    <Line data={chartData} options={options} plugins={[shadowPlugin]} />
                </div>
            )}
        </div>
    );
};

export default TaskChart;
