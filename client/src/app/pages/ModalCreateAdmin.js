import React, { useState } from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Modal
  } from 'antd';
  import "antd/dist/antd.css";
  import swal from 'sweetalert';
  import { QuestionCircleOutlined } from '@ant-design/icons';
  
  
  class ModalCreateAdmin extends React.Component {
      render() {
       
        
// Register Form
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  
  



 
  return (
    <Modal
    visible={visible}
    title="add admin"
    okText="add"
    cancelText="Cancel"
    onCancel={onCancel}
    onOk={() => {
      form
        .validateFields()
        .then((values) => {
          form.resetFields();
          onCreate(values);
        })
        .catch((info) => {
          console.log('Validate Failed:', info);
        });
    }}
  >
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      initialValues={{
        prefix: '86',
      }}
      scrollToFirstError
    >
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            validator(rule, value) {
                if (value.length < 8) {
                    return Promise.reject('The password provided is not long enough');
                  
                } 
                return Promise.resolve();
              },
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              } 
              return Promise.reject('The two passwords that you entered do not match!');
            },
           

          }),
        
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="firstname"
        label={
          <span>
            Firstname 
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your firstname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastname"
        label={
          <span>
            Lastname 
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
          </span>
        }
        rules={[
          {
            required: true,
            message: 'Please input your lastname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>     
    </Form>
    </Modal>
  );
};
//popup and form code


const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);


 //With this, we will get all field values.
  const onCreate = (values) => {
    {axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/users/register_admin`,{email:values.email , firstname:values.firstname,lastname: values.lastname,password: values.password,password2:values.password}).then((data) => {  if(data.data )
        setVisible(false); 
        setData(data.data);
        swal("success!", "You create a new admin ! ", "success");
         }).catch( (err) => {console.log(err.request.response)
            swal("error!", err.response.data.email , "error");
        } )}

    console.log('Received values of form: ', values);
    
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Admin
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
return (
<div className="MainDiv">



    
<CollectionsPage 

/>
  
</div>
);


}
}
  
 export default ModalCreateAdmin
