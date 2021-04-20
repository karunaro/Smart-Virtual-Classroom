import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import "react-dropzone-uploader/dist/styles.css";
import Dropzone from "react-dropzone-uploader";
import axios from "axios";
import swal from 'sweetalert';

import { Button, Form } from "react-bootstrap";

function FormImage() {
  
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState([]);
  useEffect(()=>console.log(files),[files])
  useEffect(()=>console.log(image),[image])
  const userrr = JSON.parse(localStorage.getItem('user'));
 
  



  



  

  const addImage = (e) => {
      
    e.preventDefault();
    
    const imagee= image;
    console.log(imagee);
    axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + "/users/user-profile", {_id :userrr._id,image:imagee}).then((result) => {
     console.log(result.data.image); 
     userrr.image=result.data.image;
     console.log(userrr.image);
     localStorage.setItem("user", JSON.stringify(userrr));
     swal("success!", "you change your image with success", "success");

    });
  };

  const handleChangeStatus = async ({ meta, file }, status) => {
    console.log(status, meta, file);
    console.log(status);
    console.log(file)
    if (status === "done") {
      // setImage(file)
      var formData = new FormData();
      formData.append("files", file);
      await axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + "/course/upload", formData).then(
        (response) => {
            setImage(response.data.result.reqFiles[0]);
          console.log(response.data.result.reqFiles[0]);
          
        }
      );
    }
    if (status === "removed") {     
        let multiple_resource = files.slice();
        multiple_resource = files.filter((u) => {
          return u !== file;
        });
        setFiles(multiple_resource);
      }
  };

  return (
    <div>
      <Form>

        <Form.Group controlId="formBasicDropezone">
          <Form.Label>Choose your image</Form.Label>
          <Dropzone
            styles={{ dropzone: { minHeight: 120, maxHeight: 250 } }}
            canCancel={true}
            canRemove={true}
            canRestart={true}
            onChangeStatus={handleChangeStatus}
          />
        </Form.Group>
        <br />
        <Button
          variant="primary"
          type="submit"
          position="right"
          onClick={addImage}
        >
          Add
        </Button>
      </Form>
    </div>
  );
}

export default FormImage;
