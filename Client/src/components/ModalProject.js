import {
    Button,
    Modal

} from "react-bootstrap";
import React from "react";
import ModalProjectform from './ModalProjectForm';
import SVG from "react-inlinesvg";
export default class ModalProject extends React.Component {
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


                <a
                    onClick={this.handleShow}
                    className="btn btn-icon btn-light btn-hover-primary btn-sm"
                >
                    <span className="svg-icon svg-icon-md svg-icon-primary">
                      <SVG
                          src={(
                              "../../media/svg/icons/General/Settings-1.svg"
                          )}
                      ></SVG>
                    </span>
                </a>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Project to Group</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ModalProjectform projectid={this.props.projectid}></ModalProjectform>
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

