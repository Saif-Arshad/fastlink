import axiosInstance from "@/config/axios";



export async function userStats() {
    try {
        const response = await axiosInstance.get("/api/stats/users");
        console.log(response.data)
        return { userStatsData: response.data };
    } catch (error: any) {
        console.log("🚀 ~ userStats ~ error:", error)
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Failed to Fetch users stats";
        // console.error("Fetch users failed:", errorMessage);
        return { error: errorMessage };
    }
}
export async function getTableStats() {
    try {
        const response = await axiosInstance.get("/api/stats/tables");
        console.log(response.data)
        return { tableStatsData: response.data };
    } catch (error: any) {
        console.log("🚀 ~ tables ~ error:", error)
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Failed to tables users stats";
        // console.error("Fetch users failed:", errorMessage);
        return { error: errorMessage };
    }
}
export async function getCardsStats() {
    try {
        const response = await axiosInstance.get("/api/stats/card-stats");
        console.log(response.data)
        return { statusData: response.data.statusData, totalProducts: response.data.totalProducts };
    } catch (error: any) {
        console.log("🚀 ~ tables ~ error:", error)
        // Extract detailed error message if available
        const errorMessage = error.response?.data?.error || "Failed to tables users stats";
        // console.error("Fetch users failed:", errorMessage);
        return { error: errorMessage };
    }
}