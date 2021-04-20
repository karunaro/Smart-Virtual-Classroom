import {
    Modal,
    Form
} from "react-bootstrap";
import axios from "axios";
import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';
export default class ModalAddGroup extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,

            name: undefined,
            description: undefined

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
                    Add Group
                    {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                    <Icon >send</Icon>

                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add New Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Group Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Question" onChange={(data) =>this.setState({name : data.target.value}) } />
                                <Form.Text className="text-muted">
                                    Enter the name proposed by your students
                                </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" placeholder="Question" onChange={(data) =>this.setState({description : data.target.value}) } />
                            </Form.Group>


                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" type="submit" onClick={ async () => { await axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/groups/` , { name : this.state.name  , description : this.state.description }) ; this.props.onChange(await axios.get(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/groups/`));}}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>

        );
    }


}

