import TaskSummaryCard from "@/components/charts/Dashboard-Card";
import MixedChart from "@/components/charts/MixedChart";
import ProjectCard from "@/components/charts/Progress-Card";
import TaskChart from "@/components/charts/TaskChart";
import PerformanceCard from "@/components/charts/TeamPerformance";

const Home = async () => {


  return <div className="flex-col  p-5 mt-7">

    <TaskSummaryCard />
    <div className="flex flex-col md:flex-row items-start my-4 sm:space-x-4">

      <ProjectCard />
      <TaskChart />
    </div>

    <div className="flex flex-col md:flex-row items-start my-4 sm:space-x-4">

      <PerformanceCard />
      <MixedChart />
    </div>
  </div>
};

export default Home;
