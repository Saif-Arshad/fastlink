"use client"

import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { defaults } from "chart.js/auto";


defaults.maintainAspectRatio = false;
defaults.responsive = true
// Register the components needed for the chart
ChartJS.register(
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const MixedChart = () => {
    // Dummy data for the bar (earnings) and line (performance)
    const data = {
        labels: [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ],
        datasets: [
            {
                type: "bar", // Bar chart for earnings
                label: "Earnings",
                data: [3000, 4000, 2000, 8000, 7000, 9000, 5000, 6000, 3000, 7000, 8000, 6000],
                backgroundColor: "rgba(54, 162, 235, 0.2)", // Light blue bars
                borderColor: "rgba(54, 162, 235, 1)", // Border for bars
                borderWidth: 1,
                borderRadius: 5, // Rounded bars like in your image
            },
            {
                type: "line", // Line chart for performance
                label: "Performance",
                data: [5000, 6000, 3000, 9000, 10000, 9000, 4000, 8000, 6000, 9000, 10000, 7000],
                borderColor: "rgba(255, 99, 132, 1)", // Red line color
                backgroundColor: "rgba(255, 99, 132, 0.2)", // Transparent red background
                fill: false, // Do not fill the area under the line
                tension: 0.4, // Smooth curve for the line
                pointRadius: 5, // Large points like in the image
                pointHoverRadius: 8,
                pointBackgroundColor: "#fff",
                pointBorderWidth: 2,
            },
        ],
    };

    // Chart options
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false, // Remove grid lines from x-axis
                },
            },
            y: {
                beginAtZero: true, // Y-axis should start at zero
                ticks: {
                    stepSize: 2000, // Control step size for the Y-axis
                },
                grid: {
                    color: "rgba(200, 200, 200, 0.2)", // Light grid lines for Y-axis
                },
            },
        },
        plugins: {
            legend: {
                display: false, // Hide the default legend
            },
            tooltip: {
                enabled: true,
                mode: "nearest",
                intersect: false,
            },
        },
    };

    return (
        <div className="p-6 bg-white rounded-lg w-full md:w-[70%] min-h-[400px]">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">Monthly Earning Performance</h2>
            <div className="h-64">
                {/* @ts-ignore */}
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default MixedChart;
