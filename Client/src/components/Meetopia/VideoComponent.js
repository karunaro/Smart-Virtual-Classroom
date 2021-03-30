/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {useState, useEffect} from "react";
import { Nav, Tab } from "react-bootstrap";
import SVG from "react-inlinesvg";
import {toAbsoluteUrl} from "../../_metronic/_helpers";

export function VideoComponent({ className }) {
  const [key, setKey] = useState("Month");
  useEffect(() => {const myVid = document.getElementById('myVid')
  navigator.mediaDevices.getUserMedia({video: true, audio: true}).then( (stream) => {myVid.srcObject = stream} )
})
  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            Video
          </span>
          <span className="text-muted mt-3 font-weight-bold font-size-sm">
            More than 400+ new members
          </span>
        </h3>
        <div className="card-toolbar">
        </div>
      </div>
      {/* Body */}
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive">
            <video id="myVid" controls autoPlay style={{ width: "100%" }}/>
        </div>
      </div>
    </div>
  );
}
