import React, {useState, useEffect} from "react";
import { useSelector } from 'react-redux'
import Peer from 'peerjs';

export function VideoComponent({ className }) {
  const result = useSelector(state => state.auth.user)
  const doItOnce = { done: 0 }
	const peer = new Peer(result.username, { host: 'localhost', port: '9000' });
	peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
  });

function giveStreamOnRequest_Student(stream){
peer.on('call', function(call) {
  const myscreen = document.createElement('video')
    call.answer(stream); // Answer the call with an A/V stream.
    call.on('stream', function( remoteStream ) {
      
      if(doItOnce.done == 1){
        if(call.peer === 'admin'){
          const mainScreen = document.getElementById('myVid')
          mainScreen.srcObject = remoteStream
          mainScreen.muted = true
          mainScreen.addEventListener('loadedmetadata', () => {mainScreen.play()})
        }else{
          myscreen.srcObject = remoteStream
        myscreen.muted = true
        myscreen.width = 250
        myscreen.height = 200
        myscreen.addEventListener('loadedmetadata', () => {myscreen.play()})
        document.getElementById('webCams').append(myscreen)
        }
        doItOnce.done = 0}
        else if(doItOnce.done == 0)
        doItOnce.done = 1
    });
});}

function giveStreamOnRequest_Professor(stream){
  const myscreen = document.createElement('video')
  peer.on('call', function(call) {
      call.answer(stream); // Answer the call with an A/V stream.
      call.on('stream', function(remoteStream) {
        if(doItOnce.done == 1){
        
        myscreen.srcObject = remoteStream
        myscreen.muted = true
        myscreen.width = 250
        myscreen.height = 200
        myscreen.addEventListener('loadedmetadata', () => {myscreen.play()})
        document.getElementById('webCams').append(myscreen)
        doItOnce.done = 0}
        else if(doItOnce.done == 0)
        doItOnce.done = 1
      });
  });}

function requestWebcamStreams(user_id, stream){
  var call = peer.call(user_id, stream);
  
  const myscreen = document.createElement('video')
  
  call.on('stream', function(remoteStream) {
  if(doItOnce.done == 1){
  
  myscreen.srcObject = remoteStream
  myscreen.muted = true
  myscreen.width = 250
  myscreen.height = 200
  myscreen.addEventListener('loadedmetadata', () => {myscreen.play()})
  document.getElementById('webCams').append(myscreen)
  doItOnce.done = 0}
  else if(doItOnce.done == 0)
  doItOnce.done = 1
  });
  
}

  function shareDesktop(user_id, stream){
    var call = peer.call(user_id, stream);
    
    const myscreen = document.createElement('video')
    
    call.on('stream', function(remoteStream) {
    if(doItOnce.done == 1){
    
    myscreen.srcObject = remoteStream
    myscreen.muted = true
    myscreen.width = 250
    myscreen.height = 200
    myscreen.addEventListener('loadedmetadata', () => {myscreen.play()})
    document.getElementById('webCams').append(myscreen)
    doItOnce.done = 0}
    else if(doItOnce.done == 0)
    doItOnce.done = 1
    });
    
  }

  function requestDesktopStream(user_id, stream){
    var call = peer.call(user_id, stream);
    
    const myscreen = document.createElement('video')
    
    call.on('stream', function(remoteStream) {
    if(doItOnce.done == 1){
        const mainScreen = document.getElementById('myVid')
        mainScreen.srcObject = remoteStream
        mainScreen.muted = true
        mainScreen.addEventListener('loadedmetadata', () => {mainScreen.play()})
        doItOnce.done = 0}
        else if(doItOnce.done == 0)
        doItOnce.done = 1
    });
    
  }

  useEffect(() => {
    const myVid = document.getElementById('myVid')
    const myVidfds = document.getElementById('myVidfds')

  if(result.username ==='admin'){
    navigator.mediaDevices.getDisplayMedia({video: true, audio: true}).then( (stream) => {
      myVid.srcObject = stream
      giveStreamOnRequest_Professor(stream)
      shareDesktop('guest', stream)
      shareDesktop('user', stream)
      } )
    }
  else if(result.username ==='guest')
  {
    navigator.mediaDevices.getDisplayMedia({video: true, audio: true}).then( (stream) => {
      myVidfds.srcObject = stream
      requestDesktopStream('admin', stream)
      giveStreamOnRequest_Student(stream)
      requestWebcamStreams('user', stream)
    })
  }
  else if(result.username ==='user')
  {
    navigator.mediaDevices.getUserMedia({video: true, audio: true}).then( (stream) => {
      myVidfds.srcObject = stream
      requestDesktopStream('admin', stream)
      giveStreamOnRequest_Student(stream)
      requestWebcamStreams('guest', stream)
    })
  }
})
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Video
          </span>
        </h3>
        <div className="card-toolbar">
        </div>
      </div>
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
            <video id="myVid" controls autoPlay style={{ width: "100%" }}/>
        </div>
        <div class="d-flex justify-content-around flex-wrap" id="webCams" >
          <video id="myVidfds" class="mt-1" controls autoPlay width="250" height="200" />
        </div>
      </div>
    </div>
  );
}
