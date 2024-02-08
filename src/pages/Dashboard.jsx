import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/dashSidebar";
import DashProfile from "../components/dashProfile";
import DashPosts from "../components/DashPosts";
import DashUsers from "../components/DashUsers";

const Dashboard = () => {
  const [tab, setTab] = useState("profile");
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-56">
        <DashSidebar />
      </div>
      {/* hero */}
      {tab === "profile" && <DashProfile />}
      {/* posts */}
      {tab === "posts" && <DashPosts />}
      {/* users */}
      {tab === "users" && <DashUsers />}
    </div>
  );
};

export default Dashboard;
