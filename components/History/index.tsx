"use client"

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
    const columns = [
        { name: "Day", uid: "day" },
        { name: "Date", uid: "date" },
        { name: "Check In", uid: "loginTime" },
        { name: "Check Out", uid: "logoutTime" },
        { name: "Total Time", uid: "totalTime" },
        { name: "Signature", uid: "signature" },
    ];
    useEffect(() => {
        const currentMonth = new Date().toISOString().slice(0, 7);
        setSelectedMonth(currentMonth);
    }, []);

    const handleMonthChange = (e: any) => {
        setSelectedMonth(e.target.value);
    };

    const formattedData = data.timestamps
        .filter((timestamp: any) => {
            const loginMonth = timestamp.sign_in ? new Date(timestamp.sign_in).toISOString().slice(0, 7) : null;
            return loginMonth === selectedMonth;
        })
        .map((timestamp: any) => {
            const loginDate = timestamp.sign_in ? new Date(timestamp.sign_in) : null;
            const logoutDate = timestamp.sign_out ? new Date(timestamp.sign_out) : null;

            let totalTime = 'N/A';
            if (loginDate && logoutDate) {
                const duration = logoutDate.getTime() - loginDate.getTime();
                const hours = Math.floor(duration / 3600000);
                const minutes = Math.floor((duration % 3600000) / 60000);
                totalTime = `${hours}h ${minutes}m`;
            }

            return {
                _id: timestamp._id,
                day: loginDate && !isNaN(loginDate.getTime())
                    ? loginDate.toLocaleDateString("en-US", { weekday: "long" })
                    : "N/A",
                date: loginDate && !isNaN(loginDate.getTime())
                    ? loginDate.toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' })
                    : "N/A",
                loginTime: loginDate && !isNaN(loginDate.getTime())
                    ? loginDate.toLocaleTimeString()
                    : "N/A",
                logoutTime: logoutDate && !isNaN(logoutDate.getTime())
                    ? logoutDate.toLocaleTimeString()
                    : "N/A",
                totalTime,
                signature: data.name ? data.name : "Anonymous"
            };
        });

    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                    <h3 className="text-xl regular-fontss font-semibold">Schedule History</h3>
                </div>
                <input
                    type="month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    className="p-2 border rounded-lg"
                />
            </div>
            <div className="max-w-[95rem] mx-auto w-full">
                <TableWrapper
                    meta={meta}
                    RenderCell={RenderCell}
                    data={formattedData}
                    columns={columns}
                />
            </div>
        </div>
    );
};
