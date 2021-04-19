import React, { useState } from "react"

export function ChatBoxComponent({ user, socket, className }) {
  const [ textToSend, setTextToSend ] = useState()
  const [ nbrOfStudents, setNbrOfStudents ] = useState(0)

  socket.on('NbrOfStudents', (newnbrOfStudents) => setNbrOfStudents(newnbrOfStudents) )
  return (
    <>
      <div className={`card card-custom ${className}`}>
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">
              ChatBox
            </span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              { nbrOfStudents } Students Present
            </span>
          </h3>
        </div>
        <div className="card-body pt-0">
          <div id="ChatBox" className="timeline timeline-5 mt-3 list-group text-nowrap overflow-auto" >
            
          </div>
        </div>
        <input type="text" placeholder="Your Message..." className="form-control" value={textToSend} onChange={ (event) => setTextToSend(event.target.value) } />
        <button className="btn btn-outline-success" onMouseUp={() => { if(textToSend){ socket.emit('ChatMessageToServer', {username: user.firstname, msg: textToSend} ); setTextToSend('') } } } >Send !</button>
      </div>
    </>
  );
}
