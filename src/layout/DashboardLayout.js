import { Outlet } from "react-router-dom";
import DashboardLeftSide from "../Dashboard/DashboardLeftSide";


const DashboardLayout = () => {
    return (
        <div className="flex flex-col lg:flex-row">
                <div className="lg:w-[20%]">
                <DashboardLeftSide></DashboardLeftSide>
                </div>
                <div className="lg:w-[80%] bg-slate-200 h-screen">
                <Outlet></Outlet>
                </div>
        </div>
    );
};

export default DashboardLayout;