import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Space, Table, Row, Col, Button, Modal } from "antd";
import {
  forEach as _forEach,
  isEmpty as _isEmpty,
  find as _find,
} from "lodash-es";
import {
  DeleteFilled,
  EditFilled,
  PlusCircleFilled,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import ManageUserForm from "../ManageUserForm/ManageUserForm";

const UserManagement = () => {
  const currentUserDetails = useSelector((state) => state.auth?.user);
  const UserList = useSelector((state) => state.userList);
  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [mode, setMode] = useState("");

  const onUpdateRecord = useCallback((id) => {
    setMode("edit");
    setSelectedItem(id);
    onOpenModalEvent(true);
  }, []);

  const onDeleteRecord = useCallback((id) => {}, []);

  // ! Modal Open events
  const onOpenModalEvent = () => setOpenModal(true);

  // ! Modal Close events
  const onCloseModalEvent = () => {
    setOpenModal(false);
    setSelectedItem("");
    setMode("");
    // form.resetFields();
  };

  useEffect(() => {
    const updatedUserList = [];
    _forEach(UserList?.data, (user) => {
      updatedUserList.push({
        ...user,
        action: {
          id: user?.id,
          role: user?.role,
          createdBy: user?.createdBy,
        },
      });
    });
    setList(updatedUserList);
  }, [UserList]);

  // ! Table Columns
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "15%",
      render: (text) => <span className="c-heading size-5">{text}</span>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "20%",
      render: (text) => <span className="c-heading size-5">{text}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
      render: (text) => <span className="c-heading size-5">{text}</span>,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
      render: (text) => <span className="c-heading size-5">{text}</span>,
    },
    {
      title: "Status",
      dataIndex: "isApproved",
      key: "isApproved",
      width: "15%",
      render: (text) => (
        <span className="c-heading size-5">
          <Space>
            {text === true ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <ExclamationCircleTwoTone twoToneColor="#FA8C16" />
            )}
            {text === true ? "Approved" : "Pending"}
          </Space>
        </span>
      ),
    },
    ...(currentUserDetails?.featureConfig?.editDataItem ||
    currentUserDetails?.featureConfig?.deleteDataItem
      ? [
          {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "15%",
            align: "right",
            render: (obj) => (
              <Space size="middle">
                {currentUserDetails?.id !== obj?.id ? (
                  <>
                    {currentUserDetails?.featureConfig?.editDataItem &&
                      obj?.role !== "super_admin" && (
                        <Button
                          icon={<EditFilled />}
                          onClick={() => onUpdateRecord(obj?.id)}
                        />
                      )}
                    {currentUserDetails?.featureConfig?.deleteDataItem && (
                      <Button
                        icon={<DeleteFilled />}
                        type="primary"
                        danger
                        onClick={() => onDeleteRecord(obj?.id)}
                      />
                    )}
                  </>
                ) : (
                  "Current User"
                )}
              </Space>
            ),
          },
        ]
      : []),
  ];

  const findSelectedItemDetails =
    _find(list, (item) => item?.id === selectedItem) || {};

  return (
    <div className="c-card">
      <Row className="mb-2">
        <Col md={20}>
          <span className="c-heading size-3 bold">User Management</span>
        </Col>
        {currentUserDetails?.featureConfig?.createUser && (
          <Col md={4} align="right">
            <Button type="primary" icon={<PlusCircleFilled />}>
              Create New User
            </Button>
          </Col>
        )}
      </Row>

      <Table columns={columns} dataSource={list} />

      {!_isEmpty(mode) && (
        <Modal
          title={findSelectedItemDetails?.name || "Create New Record"}
          open={openModal}
          onCancel={onCloseModalEvent}
          footer={null}
          width={640}
        >
          <ManageUserForm
            list={list}
            selectedItem={selectedItem}
            mode={mode}
            onCloseModalEvent={onCloseModalEvent}
          />
        </Modal>
      )}
    </div>
  );
};

export default UserManagement;
