import {
    Modal
} from "react-bootstrap";
import React from "react";
import ModalGroupform from './ModalGroupform'
import Button from '@material-ui/core/Button';
export default class ModalGroup extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
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

                <Button variant="outlined" color="primary" onClick={this.handleShow}>
                    Assigned Projects
                </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Student to Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalGroupform></ModalGroupform>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}

