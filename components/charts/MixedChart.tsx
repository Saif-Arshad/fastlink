"use client";

import React from "react";
import {
    Chart as ChartJS,
    BarElement,
    LineElement,
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

// Register the components needed for the chart
ChartJS.register(BarElement, LineElement, CategoryScale, LinearScale, Tooltip, Legend);

// Define the simplePlugin with shadow effect for lines
let _stroke: null | (() => void) = null;
const simplePlugin: Plugin<"line"> = {
    id: "piaf",
    beforeDatasetsDraw: function (chart) {
        if (!_stroke) _stroke = chart.ctx.stroke;
        chart.ctx.stroke = function () {
            if (!chart.ctx) return;
            chart.ctx.save();
            chart.ctx.shadowColor = "rgba(0, 0, 0, 0.15)";
            chart.ctx.shadowBlur = 10;
            chart.ctx.shadowOffsetX = 0;
            chart.ctx.shadowOffsetY = 10;
            _stroke!.apply(this, arguments as any);
            chart.ctx.restore();
        };
    },
};

// Your chart component
const MixedChart = () => {
    // Dummy data for the bar (earnings) and line (performance)
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
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
        <div className="p-6 bg-white rounded-xl w-full lg:w-[70%] shadow">
            <h2 className="text-lg font-semibold mb-4 text-gray-600">Monthly Earning Performance</h2>
            <div className="h-64">
                {/* Register the plugin here */}
                {/* @ts-ignore */}
                <Line data={data} options={options} plugins={[simplePlugin]} />
            </div>
        </div>
    );
};

export default MixedChart;
