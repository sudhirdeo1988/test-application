import { useSelector } from "react-redux";
import ListTable from "../ListTable/ListTable";
import UserManagement from "../UserManagement/UserManagement";
import { Divider } from "antd";

const WidgetDashboard = () => {
  const listData = useSelector((state) => state.listData);
  const currentUserDetails = useSelector((state) => state.auth?.user);
  return (
    <>
      <div>
        <ListTable tableData={listData} />
        {currentUserDetails?.featureConfig?.viewUser && (
          <>
            <Divider />
            <UserManagement />
          </>
        )}
      </div>
    </>
  );
};

export default WidgetDashboard;
