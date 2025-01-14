import React, { useEffect } from "react";
import { Space, Row, Col, Button, Form, Checkbox, Switch, Divider } from "antd";
import {
  isEmpty as _isEmpty,
  find as _find,
  map as _map,
  filter as _filter,
} from "lodash-es";
import { routes } from "../../Routes/routes";

const ManageUserForm = (props) => {
  const { list, selectedItem, mode, onCloseModalEvent } = props;
  const [form] = Form.useForm();

  const isEditMode = mode === "edit";

  const findSelectedItemDetails =
    _find(list, (item) => item?.id === selectedItem) || {};

  // ! Set form initial values dynamically if mode is edit
  useEffect(() => {
    if (isEditMode) {
      const findSelectedItemDetails =
        _find(list, (item) => item?.id === selectedItem) || {};
      form.setFieldsValue(findSelectedItemDetails);
    }
  }, [selectedItem, mode]);

  return (
    <Form
      form={form}
      name="update User"
      style={{
        maxWidth: 600,
      }}
    >
      <Row gutter={12}>
        <Col md={12}>
          <div className="mb-2">
            <span className="c-heading size-6 bold mb-1">
              Approve / Enable User
            </span>
            <Form.Item valuePropName="checked">
              <Switch defaultChecked={findSelectedItemDetails?.isApproved} />
            </Form.Item>
          </div>
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        <Col md={24}>
          <span className="c-heading bold size-3 mb-1">
            Edit Configurations access
          </span>
        </Col>
        {_map(
          Object.entries(findSelectedItemDetails?.featureConfig),
          (feature) => {
            const [key, value] = feature;
            console.log({ value, key });
            return (
              <Col md={8}>
                <Checkbox
                  checked={value}
                  value={value}
                  onChange={(v) => console.log(key, v.target.value)}
                >
                  <span className="c-heading bold size-5">{key}</span>
                </Checkbox>
              </Col>
            );
          }
        )}
      </Row>
      <Divider />
      <Row gutter={[12, 12]}>
        <Col md={24}>
          <span className="c-heading bold size-3 mb-1">Edit Menu access</span>
        </Col>
        {_map(
          _filter(routes, (rt) => rt?.isProtected),
          (route) => {
            const isRouteAvailable =
              _find(
                findSelectedItemDetails?.permittedRoutes,
                (r) => r.id === route?.id
              ) || {};
            console.log({ isRouteAvailable });
            return (
              <Col md={8}>
                <Checkbox
                  checked={!_isEmpty(isRouteAvailable)}
                  value={route?.id}
                  onChange={(v) => console.log(route?.id, v.target.value)}
                >
                  <span className="c-heading bold size-5">{route?.label}</span>
                </Checkbox>
              </Col>
            );
          }
        )}
      </Row>
      <Divider />
      <div className="text-right">
        <Space>
          <Button onClick={onCloseModalEvent} htmlType="button">
            Cancel
          </Button>
          <Button type="primary">Update</Button>
        </Space>
      </div>
    </Form>
  );
};

export default ManageUserForm;
