"use client";

import React, { useState, useEffect } from "react";
import { TableWrapper } from "@/components/table/table";
import { IMeta } from "@/helpers/types";
import { RenderCell } from "./render-cell";

export const History = ({
    data,
    meta,
}: {
    data: any;
    meta: IMeta;
}) => {
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedWeek, setSelectedWeek] = useState(1);

    const columns = [
        { name: "Day", uid: "day" },
        { name: "Date", uid: "date" },
        // { name: "Time", uid: "time" },
        { name: "Signature", uid: "signature" },
    ];

    useEffect(() => {
        const currentMonth = new Date().toISOString().slice(0, 7);
        setSelectedMonth(currentMonth);
    }, []);

    const handleMonthChange = (e: any) => {
        setSelectedMonth(e.target.value);
    };

    const handleWeekChange = (e: any) => {
        setSelectedWeek(parseInt(e.target.value));
    };

    const getWeekOfMonth = (date: any) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
        const offset = date.getDay() - firstDay.getDay();
        return Math.ceil((date.getDate() + offset) / 7);
    };

    const filterData = (type: any) => {
        return data.timestamps
            .filter((timestamp: any) => {
                const eventDate = timestamp[type] ? new Date(timestamp[type]) : null;
                const eventMonth = eventDate ? eventDate.toISOString().slice(0, 7) : null;
                const eventWeek = eventDate ? getWeekOfMonth(eventDate) : null;

                return eventMonth === selectedMonth && eventWeek === selectedWeek;
            })
            .map((timestamp: any) => {
                const eventDate = timestamp[type] ? new Date(timestamp[type]) : null;

                return {
                    _id: timestamp._id,
                    day: eventDate ? eventDate.toLocaleDateString("en-US", { weekday: "long" }) : "N/A",
                    date: eventDate ? eventDate.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' }) : "N/A",
                    // time: eventDate ? eventDate.toLocaleTimeString() : "N/A",
                    signature: data.name ? data.name : "Anonymous"
                };
            });
    };

    const checkInData = filterData("sign_in");
    const checkOutData = filterData("sign_out");

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">

                <h1>

                </h1>
                <div className="flex items-center gap-x-4">
                    <input
                        type="month"
                        value={selectedMonth}
                        onChange={handleMonthChange}
                        className="p-2 border rounded-lg"
                    />
                    <select
                        value={selectedWeek}
                        onChange={handleWeekChange}
                        className="p-2 border rounded-lg"
                    >
                        {[1, 2, 3, 4, 5].map((week) => (
                            <option key={week} value={week}>
                                Week {week}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="max-w-[95rem] mx-auto w-full">
                <h4 className="text-lg font-semibold mb-4">Check-In History</h4>
                <TableWrapper
                    meta={meta}
                    RenderCell={RenderCell}
                    data={checkInData}
                    columns={columns}
                />
            </div>
            <div className="max-w-[95rem] mx-auto w-full mt-8">
                <h4 className="text-lg font-semibold mb-4">Check-Out History</h4>
                <TableWrapper
                    meta={meta}
                    RenderCell={RenderCell}
                    data={checkOutData}
                    columns={columns}
                />
            </div>
        </div>
    );
};
