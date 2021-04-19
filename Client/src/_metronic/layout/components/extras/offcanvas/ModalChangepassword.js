
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
  import swal from 'sweetalert';
  import "antd/dist/antd.css";
  import { QuestionCircleOutlined } from '@ant-design/icons';
  
  
  class ModalChangepassword extends React.Component {
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
        name="curentpassword"
        label="curent Password"
        rules={[
          {
            required: true,
            message: 'Please input your curent password!',
          },
          {
            validator(rule, value) {
                if (value.length < 7) {
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
        name="newpassword"
        label="new Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
          {
            validator(rule, value) {
                if (value.length < 7) {
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
        dependencies={['newpassword']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('newpassword') === value) {
                return Promise.resolve();
              } 
              return Promise.reject('The two passwords that you entered do not match!');
            },
           

          }),
        
        ]}
      >
        <Input.Password />
      </Form.Item>

  
    
    </Form>
    </Modal>
  );
};
//popup and form code


const CollectionsPage = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);

  const userrr = JSON.parse(localStorage.getItem('user'));
 //With this, we will get all field values.
  const onCreate = (values) => {
    {axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/users/changePWD`,{newpassword:values.newpassword ,password: values.curentpassword,_id:userrr._id}).then((data) => {  if(data.data )
        setVisible(false); 
        setData(data.data);
        swal("success!", "You changed your password ! ", "success");
         }).catch( (err) => {console.log(err.response.data.passwordincorrect)
         console.log(err.request.response)
         swal("error!", err.response.data.passwordincorrect , "error");
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
        Change Password
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
  
 export default ModalChangepassword
