import React, {useState, useEffect} from "react";

export function WhiteBoardComponent({ className }) {
  return (
    <div className={`card card-custom ${className}`}>
      {/* Head */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            WhiteBoard
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
        <canvas class="whiteboard"></canvas>
        </div>
      </div>
    </div>
  );
}
