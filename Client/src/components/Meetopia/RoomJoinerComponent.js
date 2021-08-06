import { Button, Modal } from "react-bootstrap";
import React from "react";
import axios from 'axios'
export default class RoomJoinerComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = { show: true, roomId: '', roomTitle: '' };

    }

    handleClose() {
        //this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    createNewRoomAndRedirect ( parent ){
        if(parent.props.user.role !== 'student')
            axios.post(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT 
            + '/Meetopia/AddNewMeetopia', { title: parent.state.roomTitle, profId: parent.props.user._id } ).then( (data) => data.data != '0' && parent.props.history.push('/Meetopia/' + data.data) )
        else
            parent.props.history.push('/Meetopia/' + parent.state.roomId)
    }

    render() {
        return (
            <>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        {this.props.user.role !== 'student' ? <Modal.Title>Create A New Room !</Modal.Title>
                         : <Modal.Title>Join A Room !</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                            <input type="text" onChange={ (e) => this.props.user.role !== 'student' ? 
                            this.setState( { roomTitle: e.target.value }) : this.setState( { roomId: e.target.value } ) } 
                            className="form-control" placeholder="Enter The Room That You Want To Join..."/>
                        </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={ () => this.props.history.goBack() } >{'Go Back' }</Button>
                        <Button variant="primary" onClick={ () => this.createNewRoomAndRedirect(this) } >{this.props.user.role !== 'student' ? 'Create Room !' : 'Join Room !' }</Button>    
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}