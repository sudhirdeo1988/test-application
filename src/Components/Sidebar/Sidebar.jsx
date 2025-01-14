import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { map as _map } from "lodash-es";
import { Space } from "antd";
import "./Sidebar.scss";
import {
  ApartmentOutlined,
  AreaChartOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";

const Sidebar = () => {
  const UserData = useSelector((state) => state.auth?.user);
  const location = useLocation();

  // id to icon mapper
  const labelToIconMapper = {
    insights: <AreaChartOutlined />,
    user: <UserOutlined />,
    data: <ProfileOutlined />,
    workflow: <ApartmentOutlined />,
  };

  return (
    <aside className="containerSidebar left">
      <div className="head p-3 mb-2"></div>
      <div className="d-flex flex-column gap-3 step-container p-3">
        <nav className="c-menuBar">
          {_map(UserData?.permittedRoutes, (item) => (
            <Link
              key={item.label}
              to={item.route}
              className={`link ${
                location.pathname === item.route ? "active" : ""
              }`}
            >
              <Space>
                {labelToIconMapper[item?.id] || <ProfileOutlined />}
                {item.label}
              </Space>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
