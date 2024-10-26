"use client";
import React from "react";
import { TableWrapper } from "@/components/table/table";
import { IMeta } from "@/helpers/types";
import { RenderCell } from "./render-cell";
import useUpdateSearchParams from "../hooks/useUpdateSearchParams";

export const History = ({
    data,
    meta,
}: {
    data: any;
    meta: IMeta;
}) => {
    console.log("🚀 ~ data:", data)

    const columns = [
        { name: "Day", uid: "day" },
        { name: "Date", uid: "date" },
        { name: "Login Time", uid: "loginTime" },
        { name: "Logout Time", uid: "logoutTime" },
    ];

    const formattedData = data.timestamps.map((timestamp: any) => {
        const loginDate = timestamp.login ? new Date(timestamp.login) : null;
        const logoutDate = timestamp.logOut ? new Date(timestamp.logOut) : null;
        console.log("🚀 ~ formattedData ~ loginDate:", loginDate?.toLocaleTimeString())

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
        };
    });


    return (
        <div className="my-10 px-4 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
            <div className="flex justify-between flex-wrap gap-4 items-center">
                <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
                    <h3 className="text-xl regular-fontss font-semibold">My History</h3>
                </div>
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
