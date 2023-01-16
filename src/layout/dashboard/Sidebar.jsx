import React from "react";
import { Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useGetChatsByUserQuery } from "features/chat/chatAPI";

const Sidebar = () => {
  const { role, _id } = useSelector((state) => state.auth.user);
  const { data: conversations = [] } = useGetChatsByUserQuery(_id, {
    skip: !_id,
  });
  const candidateRoutes = [
    { displayName: "My Profile", path: "/dashboard" },
    { displayName: "Applied Jobs", path: "applied-jobs" },
  ];
  const employerRoutes = [
    { displayName: "My Profile", path: "/dashboard" },
    { displayName: "My Jobs", path: "my-jobs" },
    { displayName: "Add Job", path: "add-job" },
  ];
  return (
    <div className="bg-primary/10 col-span-2 h-screen sticky top-0">
      <ul className="flex flex-col gap-2 w-full h-full  p-3">
        <div className="flex justify-between items-center text-primary my-1">
          <Link to="/" className="flex items-center">
            <FaChevronLeft />
            <h1>Back</h1>
          </Link>
          <h1 className="text-xl">Dashboard</h1>
        </div>
        {role === "employer"
          ? employerRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                  to={route.path}
                >
                  {route.displayName}
                </Link>
              </li>
            ))
          : candidateRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
                  to={route.path}
                >
                  {route.displayName}
                </Link>
              </li>
            ))}
        {role && conversations?.length ? (
          <li>
            <Link
              className="hover:bg-primary hover:text-white bg-primary/10 transition-all w-full block py-2 px-3 rounded-full"
              to={`/dashboard/messenger/${conversations[0]?._id}`}
            >
              Messenger
            </Link>
          </li>
        ) : null}
      </ul>
    </div>
  );
};

export default Sidebar;
