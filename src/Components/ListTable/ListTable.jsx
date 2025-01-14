import React, { useCallback, useEffect, useState } from "react";
import {
  forEach as _forEach,
  isEmpty as _isEmpty,
  findIndex as _findIndex,
  cloneDeep,
  filter as _filter,
} from "lodash-es";
import { Modal, Space, Table, Row, Col, Button, Form, message } from "antd";
import {
  PlusCircleFilled,
  EditFilled,
  DeleteFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import ListItemForm from "../ListItemForm/ListItemForm";
import { nanoid } from "nanoid";
import "./ListTable.scss";

const { confirm } = Modal;

const ListTable = ({ tableData }) => {
  const UserData = useSelector((state) => state.auth?.user);
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [mode, setMode] = useState("");

  // ! Table Columns
  const columns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      width: "10%",
      render: (text) => <span className="c-heading size-5">{text}</span>,
    },
    {
      title: "Numeric Code",
      dataIndex: "numeric_code",
      key: "numeric_code",
      width: "10%",
      align: "right",
      render: (text) => <span className="c-heading size-5">{text}</span>,
    },
    {
      title: "Country Name",
      dataIndex: "country_name",
      key: "country_name",
      width: "20%",
      render: (text) => <span className="c-heading size-5">{text}</span>,
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
      width: "20%",
      render: (text) => <span className="c-heading size-5">{text}</span>,
    },
    {
      title: "Sub Area Name",
      dataIndex: "sub_area",
      key: "sub_area",
      align: "right",
      width: "10%",
      render: (text) => <span className="c-heading size-5">{text}</span>,
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
      align: "right",
      width: "10%",
      render: (text) => <span className="c-heading size-5">{text}</span>,
    },
    ...(UserData?.featureConfig?.editDataItem ||
    UserData?.featureConfig?.deleteDataItem
      ? [
          {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: "20%",
            align: "right",
            render: (obj) => (
              <Space size="middle">
                {UserData?.featureConfig?.editDataItem && (
                  <Button
                    icon={<EditFilled />}
                    onClick={() => onUpdateRecord(obj?.id)}
                  />
                )}
                {UserData?.featureConfig?.deleteDataItem && (
                  <Button
                    icon={<DeleteFilled />}
                    type="primary"
                    danger
                    onClick={() => onDeleteRecord(obj?.id)}
                  />
                )}
              </Space>
            ),
          },
        ]
      : []),
  ];

  // ! Form Submit event :: update
  const onUpdateAndSaveFormData = (values) => {
    // ? Final payload to send
    const payload = { ...values, id: selectedItem };

    // ? Clone of data
    let cloneOfData = cloneDeep(tableData?.data);

    // ? Find index of selected record to update
    const foundIndex = _findIndex(cloneOfData, { id: selectedItem });

    // ? Update respective record
    cloneOfData.splice(foundIndex, 1, payload);

    // ? Dispatch to redux store
    dispatch({
      type: "LIST_ITEM_UPDATE_SUCCESS",
      payload: { loading: false, error: false, data: cloneOfData },
    });

    // ? Close modal and show success / error message
    onCloseModalEvent();
    setMode("");
    messageApi.open({
      type: "success",
      content: "Record Updated.",
    });
  };

  // ! Form Submit event :: Create
  const onCreateAndSaveFormData = (values) => {
    // ? Final payload to send
    const payload = { ...values, id: nanoid() };

    // ? Clone of data
    let cloneOfData = cloneDeep(tableData?.data);
    cloneOfData.push(payload);

    // ? Dispatch to redux store
    dispatch({
      type: "LIST_ITEM_UPDATE_SUCCESS",
      payload: { loading: false, error: false, data: cloneOfData },
    });

    // ? Close modal and show success / error message
    onCloseModalEvent();
    setMode("");
    messageApi.open({
      type: "success",
      content: "Record Created.",
    });
  };

  // ! Modal Open events
  const onOpenModalEvent = () => setOpenModal(true);

  // ! Modal Close events
  const onCloseModalEvent = () => {
    setOpenModal(false);
    setSelectedItem("");
    setMode("");
    form.resetFields();
  };

  // ! Add action column with id here
  const onAddActionColumnData = useCallback((tableData) => {
    const data = [];
    _forEach(tableData?.data, (record) => {
      data.push({
        ...record,
        action: { id: record?.id },
      });
    });
    setList(data);
  }, []);

  useEffect(() => {
    onAddActionColumnData(tableData);
  }, [tableData]);

  // ! On delete selected record
  const onDeleteRecord = (id) => {
    confirm({
      title: "Do you want to delete these items?",
      icon: <ExclamationCircleFilled />,
      content: "Some descriptions",
      onOk() {
        // ? Clone of data
        let cloneOfData = cloneDeep(tableData?.data);

        // ? Filter array to delete selected record
        const filteredArray =
          _filter(cloneOfData, (item) => item?.id !== id) || [];

        // ? Dispatch to redux store
        dispatch({
          type: "LIST_ITEM_UPDATE_SUCCESS",
          payload: { loading: false, error: false, data: filteredArray },
        });

        // ? Close modal and show success / error message
        onCloseModalEvent();
        messageApi.open({
          type: "success",
          content: "Record Deleted.",
        });
      },
      onCancel() {
        onCloseModalEvent();
      },
    });
  };

  // ! On update selected record
  const onUpdateRecord = useCallback((id) => {
    setMode("edit");
    setSelectedItem(id);
    onOpenModalEvent(true);
  }, []);

  return (
    <div className="c-card">
      {contextHolder}
      <Row className="mb-2">
        <Col md={20}>
          <span className="c-heading size-3 bold">Current List</span>
        </Col>
        {UserData?.featureConfig?.createDataItem && (
          <Col md={4} align="right">
            <Button
              type="primary"
              icon={<PlusCircleFilled />}
              onClick={() => {
                setMode("create");
                onOpenModalEvent();
              }}
            >
              Create New
            </Button>
          </Col>
        )}
      </Row>

      <Table columns={columns} dataSource={list} />

      {!_isEmpty(mode) && (
        <Modal
          title={selectedItem || "Create New Record"}
          open={openModal}
          onCancel={onCloseModalEvent}
          footer={null}
          width={640}
        >
          <ListItemForm
            onUpdateAndSaveFormData={
              mode === "edit"
                ? onUpdateAndSaveFormData
                : onCreateAndSaveFormData
            }
            onCloseModalEvent={onCloseModalEvent}
            list={list}
            selectedItem={selectedItem}
            mode={mode}
          />
        </Modal>
      )}
    </div>
  );
};

export default ListTable;
