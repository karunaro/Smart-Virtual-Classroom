import {
    Modal,
    Form
} from "react-bootstrap";
import axios from "axios";
import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';
export default class ModalAddProject extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,

            title: undefined,
            topic: undefined

        };


    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <>

                <Button variant="contained" color="primary" onClick={this.handleShow} >
                    Add Project
                    {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                    <Icon >send</Icon>

                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Project</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Project Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter Project Title" onChange={(data) =>this.setState({title : data.target.value}) } />
                                <Form.Text className="text-muted">
                                    Enter the name proposed by your students
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Topic</Form.Label>
                                <Form.Control type="text" placeholder="Topic" onChange={(data) =>this.setState({topic : data.target.value}) } />
                            </Form.Group>


                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={ async () => { await axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/project/` , { title : this.state.title  , topic : this.state.topic }) ; this.props.onChange(await axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/project/`));}}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>

        );
    }


}

