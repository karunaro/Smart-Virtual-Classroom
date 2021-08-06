import {
    Modal,
    Form
} from "react-bootstrap";
import axios from "axios";
import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';
export default class ModalAddTask extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,

            Task: undefined,


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

                <Button variant="text" color="secondary" onClick={this.handleShow} >
                    Add Task
                    {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                    <Icon  >send</Icon>

                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add question</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Question Topic</Form.Label>
                                <Form.Control type="text" placeholder="Enter Question" onChange={(data) =>this.setState({Task : data.target.value}) } />
                                <Form.Text className="text-muted">
                                    Feel free to ask
                                </Form.Text>
                            </Form.Group>



                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={ async () => { await axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/project/addtasktodo/`+this.props.projectid+`/`+ this.state.Task); this.props.onChange(await  axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/project/taskstodo/`+this.props.projectid));}}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>

        );
    }


}

