import {
    Modal,
    Form
} from "react-bootstrap";
import axios from "axios";
import React from "react";
import Icon from "@material-ui/core/Icon";
import Button from '@material-ui/core/Button';
export default class ModalAddQuestion extends React.Component {

    constructor(props, context) {
        super(props, context);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
//alert(this.props.questionsetter)
        //this.props.([])
        this.state = {
            show: false,

            answer: undefined,


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
                    Answer
                    {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                    <Icon >send</Icon>

                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Answer Student's questions</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formText">
                                <Form.Label>Professor Answer</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Answer" onChange={(data) =>this.setState({answer : data.target.value}) } />
                                <Form.Text className="text-muted">

                                </Form.Text>
                            </Form.Group>



                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="contained" color="primary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <label> </label>
                        <Button variant="contained" color="primary" type="submit" onClick={ () => {this.props.onChange(this.state.answer); axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT+`/questions/addanswer/`+ this.props.questionid , { answer : this.state.answer } );
                        }}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>

        );
    }


}


