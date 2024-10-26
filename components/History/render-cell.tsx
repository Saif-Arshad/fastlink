import React from "react";


interface Props {
    item: any;
    columnKey: string | React.Key;
}

export const RenderCell = ({ item, columnKey }: Props) => {
    const cellValue = item[columnKey as keyof typeof item];

    switch (columnKey) {
        case "day":
            return <div>{cellValue}</div>;

        case "date":
            return (
                <div>
                    {new Date(cellValue).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                    })}
                </div>
            );

        case "loginTime":
            return (
                <div>
                    {cellValue.toLocal}
                </div>
            );

        case "logoutTime":
            return (
                <div>
                    {cellValue !== "N/A"

                        ?
                        <>
                            {cellValue}
                        </>
                        : "N/A"}
                </div>
            );

        default:
            return <div>{cellValue}</div>;
    }
};
