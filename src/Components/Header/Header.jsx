import React from "react";
import {
  BellTwoTone,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Space, Button, Popover, Menu } from "antd";
import { onLogOutUser } from "Redux/Actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Assets/images/accelya.svg";
import "./Header.scss";

const Header = () => {
  const dispatch = useDispatch();
  const currentUserDetails = useSelector((state) => state.auth?.user);
  return (
    <>
      <header className="containerHeader">
        <div className="left">
          <img src={Logo} alt="logo" height="34" />
        </div>
        <div className="right">
          <Space size={12}>
            <Button shape="circle" variant="outlined">
              <BellTwoTone />
            </Button>
            <Popover
              placement="bottomRight"
              title={
                <>
                  <span className="c-heading size-5 bold">
                    {currentUserDetails?.name}
                  </span>
                  <span className="c-heading size-6 bold">
                    {currentUserDetails?.role}
                  </span>
                </>
              }
              content={
                <Menu
                  defaultSelectedKeys={[]}
                  items={[
                    {
                      key: "1",
                      icon: <LogoutOutlined />,
                      label: "User Settings",
                      onClick: () => console.log("clickec", "key"),
                    },
                    {
                      key: "2",
                      icon: <SettingOutlined />,
                      label: "Logout",
                      onClick: () => dispatch(onLogOutUser()),
                    },
                  ]}
                  className="userProfileMenu"
                />
              }
            >
              <div className="userBadge">
                <Space>
                  <Avatar size="large" icon={<UserOutlined />} />
                  <div>
                    <span className="c-heading size-5 bold">
                      {currentUserDetails?.name}
                    </span>
                    <span className="c-heading size-6 bold">
                      {currentUserDetails?.role}
                    </span>
                  </div>
                </Space>
              </div>
            </Popover>
          </Space>
        </div>
      </header>
    </>
  );
};

export default Header;
