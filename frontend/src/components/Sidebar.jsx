import React, { useState ,useEffect} from "react";
import {
  HomeIcon,
  BarChartIcon,
  FileTextIcon,
  LayersIcon,
  BookmarkIcon,
  ImageIcon,
  GearIcon,
  ChevronRightIcon,
  ExitIcon,
  ChevronLeftIcon,
} from "@radix-ui/react-icons";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/slices/userSlice";

const menuItems = [
  { name: "Dashboard", icon: <HomeIcon />, path: "/admin/dashboard" },
  { name: "Analysis", icon: <BarChartIcon />, path: "/admin/analysis" },
  { name: "Post", icon: <FileTextIcon />, path: "/admin/post" },
  { name: "Categories", icon: <LayersIcon />, path: "/admin/categories" },
  { name: "Tags", icon: <BookmarkIcon />, path: "/admin/tags" },
  { name: "Media", icon: <ImageIcon />, path: "/admin/media" },
  { name: "Projects", icon: <LayersIcon />, path: "/admin/projects" },
  { name: "Settings", icon: <GearIcon />, path: "/admin/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logoutUser()); 
  };

  return (
    <div
      className={`bg-gray-800 text-white h-screen flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Top: Menu */}
      <div>
        {/* Collapse Button */}
        <div className="flex justify-end p-2">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-2 rounded hover:bg-gray-700"
          >
            {collapsed ? (
              <ChevronRightIcon className="h-5 w-5" />
            ) : (
              <ChevronLeftIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="mt-5 flex flex-col space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors"
            >
              <span className="w-6 h-6 flex items-center justify-center">
                {item.icon}
              </span>
              {!collapsed && <span>{item.name}</span>}
            </Link>
          ))}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded-md transition-colors w-full text-left"
          >
            <span className="w-6 h-6 flex items-center justify-center">
              <ExitIcon />
            </span>
            {!collapsed && <span>Logout</span>}
          </button>
        </nav>
      </div>

      {/* Bottom: User Profile */}
      <div className="p-4 border-t border-gray-700 flex items-center gap-3">
        <img
          src="https://res.cloudinary.com/do88eor6e/image/upload/v1758426115/cms/jmhaw8ba7fwtwup1ubv8.png "
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        {!collapsed && user && (
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-gray-400">{user.email}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
