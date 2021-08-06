import React, { useEffect } from "react";
import { ChatBoxComponent } from '../../../components/Meetopia/ChatBoxComponent'
import { VideoComponent } from '../../../components/Meetopia/VideoComponent'
import { WhiteBoardComponent } from '../../../components/Meetopia/WhiteBoardComponent'
import { WhiteBoardToolBoxComponent } from '../../../components/Meetopia/WhiteBoardToolBoxComponent'
import { io } from "socket.io-client";
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';
import { handleNewMessage } from './handleNewMessage'
import { handleWhiteBoard } from './handleWhiteBoard'
import RoomJoinerComponent from "../../../components/Meetopia/RoomJoinerComponent";
import axios from 'axios'

export function MeetopiaPage(props) {
    const history = useHistory()
    const thisRoom = history.location.pathname.split('/')[2]
    const socket = io( process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT)
    const user = useSelector(state => state.auth.user)
    let hasRoom = false


    socket.on('connection', () => console.log('im connected'))
    
    useEffect(() => {
        if(thisRoom)
            {
                handleNewMessage(socket, user)
                handleWhiteBoard(socket)
            }
        } )
    
    
    if(thisRoom){
        axios.put(process.env.REACT_APP_BACKEND_PROTOCOL + process.env.REACT_APP_BACKEND_IP + ':' + process.env.REACT_APP_BACKEND_PORT + '/Meetopia/MarkPresence/' + thisRoom + '/' + user._id)
        socket.emit('JoinRoom', { thisRoom, username: user._id } )
        hasRoom = true
        return (<>
            <div className="row">
                <div className="col-lg-6 col-xxl-9">
                    <VideoComponent hasRoom={hasRoom} socket={socket} className="card-stretch gutter-b"/>
                </div>
                <div className="col-lg-6 col-xxl-3">
                    <ChatBoxComponent user={user} socket={socket} className="card-stretch gutter-b"/>
                </div>
                <div className="col-lg-6 col-xxl-9">
                    <WhiteBoardComponent className="card-stretch gutter-b"/>
                </div>
                <div className="col-lg-6 col-xxl-3">
                    <WhiteBoardToolBoxComponent className="card-stretch gutter-b"/>
                </div>
            </div>
    </>);
    }
        
    else{
        return (
        <>
            <RoomJoinerComponent {...props} user={user} />
        </>
        );
    }
        

    
     
    
    
    
}
