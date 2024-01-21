import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/dashSidebar";
import DashProfile from "../components/dashProfile";

const Dashboard = () => {
  const [tab, setTab] = useState("profile");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* hero */}
      {tab === "profile" && <DashProfile />}
    </div>
  );
};

export default Dashboard;
