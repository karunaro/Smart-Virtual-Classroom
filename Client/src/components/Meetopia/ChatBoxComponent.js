/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from "react";
import SVG from "react-inlinesvg";
import {Dropdown} from "react-bootstrap";
import {DropdownCustomToggler, DropdownMenu1} from "../../_metronic/_partials/dropdowns";
import {toAbsoluteUrl} from "../../_metronic/_helpers";
import { io } from "socket.io-client";


export function ChatBoxComponent({ className }) {
    const socket = io('http://localhost:30002/')
    socket.on('connection', () => console.log('im connected'))
  return (
    <>
      <div className={`card card-custom ${className}`}>
        {/* Header */}
        <div className="card-header align-items-center border-0 mt-4">
          <h3 className="card-title align-items-start flex-column">
            <span className="font-weight-bolder text-dark">
              ChatBox
            </span>
            <span className="text-muted mt-3 font-weight-bold font-size-sm">
              35 Students Present
            </span>
          </h3>
        </div>
        {/* Body */}
        <div className="card-body pt-0">
          <div className="timeline timeline-5 mt-3">
            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3">
                08:42
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-success icon-xxl"></i>
              </div>

              <div className="timeline-content text-dark-50">
                Outlines of the recent activities that happened last weekend
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3">
                3 hr
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-danger icon-xxl"></i>
              </div>

              <div className="timeline-content d-flex">
                <span className="mr-4 font-weight-bolder text-dark-75">
                  AEOL meeting with
                </span>

                <div className="d-flex align-items-start mt-n2">
                  <a
                    href="#"
                    className="symbol symbol-35 symbol-light-success mr-2"
                  >
                    <span className="symbol-label">
                      <SVG
                        className="h-75 align-self-end"
                        src={toAbsoluteUrl("/media/svg/avatars/004-boy-1.svg")}
                      ></SVG>
                    </span>
                  </a>

                  <a href="#" className="symbol symbol-35 symbol-light-success">
                    <span className="symbol-label">
                      <SVG
                        className="h-75 align-self-end"
                        src={toAbsoluteUrl("/media/svg/avatars/002-girl.svg")}
                      ></SVG>
                    </span>
                  </a>
                </div>
              </div>
            </div>

            <div className="timeline-item align-items-start">
              <div className="timeline-label font-weight-bolder text-dark-75 font-size-lg text-right pr-3">
                14:37
              </div>

              <div className="timeline-badge">
                <i className="fa fa-genderless text-info icon-xxl"></i>
              </div>

              <div className="timeline-content font-weight-bolder text-dark-75">
                Submit initial budget -
                <a href="#" className="text-primary">
                  USD 700
                </a>
              </div>
            </div>
            
          </div>
        </div>
        <input type="text" placeholder="Your Message..." className="form-control" />
        <button className="btn btn-outline-success" >Send !</button>
        <input type="file" className="form-control"/>
      </div>
    </>
  );
}
