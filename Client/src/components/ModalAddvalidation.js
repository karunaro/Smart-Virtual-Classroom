import {
    Modal,
    Form
} from "react-bootstrap";
import axios from "axios";
import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';
export default class ModalAddvalidation extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,

            topic: undefined,
            session: undefined,
            asked_work: undefined

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
                    Add Question
                    {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                    <Icon >send</Icon>

                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Validation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Validation Topic</Form.Label>
                                <Form.Control type="text" placeholder="Enter Topic" onChange={(data) =>this.setState({topic : data.target.value}) } />
                                <Form.Text className="text-muted">
                                    Feel free to ask
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Session</Form.Label>
                                <Form.Control type="text" placeholder="session" onChange={(data) =>this.setState({session : data.target.value}) } />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Asked work</Form.Label>
                                <Form.Control type="text" placeholder="Asked  work" onChange={(data) =>this.setState({asked_work : data.target.value}) } />
                            </Form.Group>




                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={ async () => { await axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/validations/` , { topic : this.state.topic  , question : this.state.question , professor : this.props.userid}) }}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>

        );
    }


}

