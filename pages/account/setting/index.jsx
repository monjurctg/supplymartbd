import {
  Button,
  Card,
  Col,
  Form,
  Image,
  Input,
  message,
  notification,
  Row,
  Select,
  Upload,
} from 'antd';
import ImgCrop from 'antd-img-crop';
import useBreakpoint from 'antd/lib/grid/hooks/useBreakpoint';
import React, { useEffect, useState } from 'react';
import { requestData } from '../../../api/requestData';
import AccountMenu from '../../../components/AccountMenu';
import withAuth from '../../../config/withAuth';

function Setting() {
  const screens = useBreakpoint();
  const [form] = Form.useForm();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let res = await requestData(true, 'get', '/user/profile');
      setData(res);
    }
    fetchData();
  }, []);
  let delivery_method = [
    { name: 'Office Collection', value: 'office-collection' },
    { name: 'Sundarban', value: 'sundarban' },
    { name: 'Sa Paribahan', value: 'sa-paribahan' },
    { name: 'Redx', value: 'redx' },
    { name: 'eCourier', value: 'ecourier' },
  ];

  useEffect(() => {
    if (data && data.data) {
      let {
        name,
        phone,
        emergency_phone,
        email,
        delivery_method,
        image,
        address,
        city,
        district,
      } = data.data;
      form.setFieldsValue({
        name,
        phone,
        emergency_phone,
        email,
        delivery_method,
        image,
        city: city,
        district: district,
        street: address,
      });
    }
  }, [data, form]);

  const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description,
    });
  };

  const onFailedSubmit = (error) => {
    openNotificationWithIcon(
      'error',
      'Failed to submit',
      'You have missed some important information. Please fill those up to complete action.',
    );
  };

  const onSubmitForm = async (values) => {
    console.log(values);
    setLoading(true);
    let formdata = new FormData();
    formdata.append('name', values.name);
    if (values.email) {
      formdata.append('email', values.email);
    }

    if (values.emergency_phone)
      formdata.append('emergency_phone', values.emergency_phone);

    if (values.delivery_method)
      formdata.append('delivery_method', values.delivery_method);
    if (values.city) formdata.append('city', values.city);
    if (values.district) formdata.append('district', values.district);
    if (values.street) formdata.append('address', values.street);
    if (fileList && fileList.length > 0) {
      formdata.append('image', fileList[fileList.length - 1]);
    }
    let res = await requestData(true, 'POST', '/user/update-profile', formdata);
    if (res) {
      afterAsync(true);
    } else {
      afterAsync(false);
    }
  };

  const afterAsync = (result) => {
    setLoading(false);
    if (result) {
      openNotificationWithIcon(
        'success',
        'Success',
        'Profile updated successfully',
      );
    } else {
      openNotificationWithIcon('error', 'Failed', 'Profile update failed');
    }
  };

  function beforeUpload(file) {
    if (
      file.type === 'image/png' ||
      file.type === 'image/jpeg' ||
      file.type === 'image/jpeg'
    ) {
      setFileList((state) => [...state, file]);
    } else {
      message.error(`${file.name} is not a valid file`);
    }
    return false;
  }

  function getImage() {
    if (fileList && fileList.length > 0) {
      return URL.createObjectURL(fileList[fileList.length - 1]);
    } else {
      if (data && data?.data?.picture) {
        return data.data.picture;
      }
      return require('../../../assets/vector/user.png').default.src;
    }
  }

  return (
    <div>
      <Row gutter={[8, 8]} style={{ margin: 0 }}>
        {screens.xs && (
          <Col xs={{ span: 24 }}>
            <AccountMenu />
          </Col>
        )}
        <Col xs={{ span: 24 }}>
          <Card className="table" style={{ border: '1px solid #dedede' }}>
            <Form
              name="basic"
              layout="vertical"
              form={form}
              onFinish={(e) => {
                onSubmitForm(e);
              }}
              onFinishFailed={() => {}}
            >
              <Row gutter={[16, 0]}>
                <Col xs={{ span: 24 }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <Image
                      width={110}
                      height={110}
                      style={{
                        objectFit: 'contain',
                      }}
                      src={getImage()}
                      alt=""
                    />
                  </div>
                  <Form.Item name="image">
                    <ImgCrop rotate aspect={1}>
                      <Upload
                        multiple={false}
                        showUploadList={false}
                        fileList={fileList}
                        beforeUpload={beforeUpload}
                      >
                        <Button>Select Image</Button>
                      </Upload>
                    </ImgCrop>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item
                    name="name"
                    label="Name"
                    rules={[
                      {
                        required: true,
                        message: 'This field is required !',
                      },
                    ]}
                  >
                    <Input placeholder="Name" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }}>
                  <Form.Item
                    name="phone"
                    label="Phone"
                    rules={[
                      {
                        required: true,
                        message: 'This field is required !',
                      },
                    ]}
                  >
                    <Input placeholder="Phone" disabled />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: 'This field is required !',
                      },
                    ]}
                  >
                    <Input placeholder="Email" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    name="emergency_phone"
                    label="Emergency Contact"
                    rules={[
                      {
                        required: true,
                        message: 'This field is required !',
                      },
                    ]}
                  >
                    <Input placeholder="Emergency Contact" />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    name="delivery_method"
                    label="Delivery Method"
                    rules={[
                      {
                        required: true,
                        message: 'This field is required !',
                      },
                    ]}
                  >
                    <Select placeholder="Select Status">
                      {delivery_method.map((el) => (
                        <Select.Option key={el.value} value={el.value}>
                          {el.name}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    name="district"
                    label="District"
                    rules={[
                      {
                        required: true,
                        message: 'This field is required !',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      autoComplete="none"
                      aria-autocomplete="none"
                      style={{ width: '100%' }}
                      placeholder="Select District"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                        optionA.children
                          .toLowerCase()
                          .localeCompare(optionB.children.toLowerCase())
                      }
                    >
                      <Select.Option value="Dhaka">Dhaka</Select.Option>
                      <Select.Option value="Barguna">Barguna</Select.Option>
                      <Select.Option value="Barisal">Barisal</Select.Option>
                      <Select.Option value="Bhola">Bhola</Select.Option>
                      <Select.Option value="Jhalokati">Jhalokati</Select.Option>
                      <Select.Option value="Patuakhali">
                        Patuakhali
                      </Select.Option>
                      <Select.Option value="Pirojpur">Pirojpur</Select.Option>
                      <Select.Option value="Bandarban">Bandarban</Select.Option>
                      <Select.Option value="Brahmanbaria">
                        Brahmanbaria
                      </Select.Option>
                      <Select.Option value="Chandpur">Chandpur</Select.Option>
                      <Select.Option value="Chittagong">
                        Chittagong
                      </Select.Option>
                      <Select.Option value="Comilla">Comilla</Select.Option>
                      <Select.Option value="Cox's Bazar">
                        {"Cox's Bazar"}
                      </Select.Option>
                      <Select.Option value="Feni">Feni</Select.Option>
                      <Select.Option value="Khagrachhari">
                        Khagrachhari
                      </Select.Option>
                      <Select.Option value="Lakshmipur">
                        Lakshmipur
                      </Select.Option>
                      <Select.Option value="Noakhali">Noakhali</Select.Option>
                      <Select.Option value="Rangamati">Rangamati</Select.Option>
                      <Select.Option value="Faridpur">Faridpur</Select.Option>
                      <Select.Option value="Gazipur">Gazipur</Select.Option>
                      <Select.Option value="Gopalganj">Gopalganj</Select.Option>
                      <Select.Option value="Kishoreganj">
                        Kishoreganj
                      </Select.Option>
                      <Select.Option value="Madaripur">Madaripur</Select.Option>
                      <Select.Option value="Manikganj">Manikganj</Select.Option>
                      <Select.Option value="Munshiganj">
                        Munshiganj
                      </Select.Option>
                      <Select.Option value="Narayanganj">
                        Narayanganj
                      </Select.Option>
                      <Select.Option value="Narsingdi">Narsingdi</Select.Option>
                      <Select.Option value="Rajbari">Rajbari</Select.Option>
                      <Select.Option value="Shariatpur">
                        Shariatpur
                      </Select.Option>
                      <Select.Option value="Tangail">Tangail</Select.Option>
                      <Select.Option value="Bagerhat">Bagerhat</Select.Option>
                      <Select.Option value="Chuadanga">Chuadanga</Select.Option>
                      <Select.Option value="Jessore">Jessore</Select.Option>
                      <Select.Option value="Jhenaidah">Jhenaidah</Select.Option>
                      <Select.Option value="Khulna">Khulna</Select.Option>
                      <Select.Option value="Kushtia">Kushtia</Select.Option>
                      <Select.Option value="Magura">Magura</Select.Option>
                      <Select.Option value="Meherpur">Meherpur</Select.Option>
                      <Select.Option value="Narail">Narail</Select.Option>
                      <Select.Option value="Satkhira">Satkhira</Select.Option>
                      <Select.Option value="Jamalpur">Jamalpur</Select.Option>
                      <Select.Option value="Mymensingh">
                        Mymensingh
                      </Select.Option>
                      <Select.Option value="Netrokona">Netrokona</Select.Option>
                      <Select.Option value="Sherpur">Sherpur</Select.Option>
                      <Select.Option value="Bogra">Bogra</Select.Option>
                      <Select.Option value="Joypurhat">Joypurhat</Select.Option>
                      <Select.Option value="Naogaon">Naogaon</Select.Option>
                      <Select.Option value="Natore">Natore</Select.Option>
                      <Select.Option value="Chapainawabganj">
                        Chapainawabganj
                      </Select.Option>
                      <Select.Option value="Pabna">Pabna</Select.Option>
                      <Select.Option value="Rajshahi">Rajshahi</Select.Option>
                      <Select.Option value="Sirajganj">Sirajganj</Select.Option>
                      <Select.Option value="Dinajpur">Dinajpur</Select.Option>
                      <Select.Option value="Gaibandha">Gaibandha</Select.Option>
                      <Select.Option value="Kurigram">Kurigram</Select.Option>
                      <Select.Option value="Lalmonirhat">
                        Lalmonirhat
                      </Select.Option>
                      <Select.Option value="Nilphamari">
                        Nilphamari
                      </Select.Option>
                      <Select.Option value="Panchagarh">
                        Panchagarh
                      </Select.Option>
                      <Select.Option value="Rangpur">Rangpur</Select.Option>
                      <Select.Option value="Thakurgaon">
                        Thakurgaon
                      </Select.Option>
                      <Select.Option value="Habiganj">Habiganj</Select.Option>
                      <Select.Option value="Moulvibazar">
                        Moulvibazar
                      </Select.Option>
                      <Select.Option value="Sunamganj">Sunamganj</Select.Option>
                      <Select.Option value="Sylhet">Sylhet</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    name="city"
                    label="City"
                    rules={[
                      {
                        required: true,
                        message: 'This field is required !',
                      },
                    ]}
                  >
                    <Input
                      rows={3}
                      placeholder="City"
                      autoComplete="none"
                      aria-autocomplete="none"
                    />
                  </Form.Item>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 8 }}>
                  <Form.Item
                    name="street"
                    label="Street"
                    rules={[
                      {
                        required: true,
                        message: 'This field is required !',
                      },
                    ]}
                  >
                    <Input
                      rows={3}
                      placeholder="street"
                      autoComplete="none"
                      aria-autocomplete="none"
                    />
                  </Form.Item>
                </Col>
              </Row>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  marginTop: '0.5rem',
                }}
              >
                <Form.Item>
                  <Button type="primary" htmlType="submit" loading={false}>
                    {'Update Profile'}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default withAuth(Setting);
