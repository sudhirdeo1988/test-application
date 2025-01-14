import React, { useEffect } from "react";
import { find as _find, map as _map } from "lodash-es";
import { Space, Row, Col, Button, Form, Input, Select } from "antd";
import countryDetails from "../../Utilities/CountryDetails.json";

const { Option } = Select;

const ListItemForm = ({
  onUpdateAndSaveFormData,
  onCloseModalEvent,
  list,
  selectedItem,
  mode,
}) => {
  const [form] = Form.useForm();

  const isEditMode = mode === "edit";

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
      name="control-hooks"
      onFinish={onUpdateAndSaveFormData}
      style={{
        maxWidth: 600,
      }}
    >
      <Row gutter={12}>
        <Col md={12}>
          <div className="mb-2">
            <span className="c-heading size-6 bold mb-1">Type</span>
            <Form.Item
              name="type"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select
                placeholder="Select a option and change input text above"
                allowClear
              >
                {_map(countryDetails, (country) => (
                  <Option
                    value={country?.countryCode}
                    key={country?.countryCode}
                  >
                    {country?.countryCode}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Col>
        <Col md={12}>
          <div className="mb-2">
            <span className="c-heading size-6 bold mb-1">Numeric Code</span>
            <Form.Item
              name="numeric_code"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select Numeric Code" allowClear>
                {_map(countryDetails, (country) => (
                  <Option value={country?.dailCode} key={country?.dailCode}>
                    {country?.dailCode}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Col>
        <Col md={12}>
          <div className="mb-2">
            <span className="c-heading size-6 bold mb-1">Country Name</span>
            <Form.Item
              name="country_name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select Country Name" allowClear>
                {_map(countryDetails, (country) => (
                  <Option
                    value={country?.countryName}
                    key={country?.countryName}
                  >
                    {country?.countryName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Col>
        <Col md={12}>
          <div className="mb-2">
            <span className="c-heading size-6 bold mb-1">Currency</span>
            <Form.Item
              name="currency"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Select Currency" allowClear>
                {_map(countryDetails, (country) => (
                  <Option
                    value={country?.currencyCode}
                    key={country?.currencyCode}
                  >
                    {country?.currencyCode} ({country?.currencySymbol})
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </div>
        </Col>
        <Col md={12}>
          <div className="mb-2">
            <span className="c-heading size-6 bold mb-1">Sub Area Name</span>
            <Form.Item
              name="sub_area"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Enter Sub Area Name" />
            </Form.Item>
          </div>
        </Col>
        <Col md={12}>
          <div className="mb-2">
            <span className="c-heading size-6 bold mb-1">Region</span>
            <Form.Item
              name="region"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="Enter Region" />
            </Form.Item>
          </div>
        </Col>
        <Col md={24} align="right">
          <Space>
            <Button htmlType="button" onClick={onCloseModalEvent}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Update" : "Create"}
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default ListItemForm;
