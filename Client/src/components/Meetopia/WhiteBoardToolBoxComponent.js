import React from "react";

export function WhiteBoardToolBoxComponent({ className }) {
  return (
    <div className={`card card-custom ${className}`}>
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label font-weight-bolder text-dark">
            WhiteBoard ToolBox
          </span>
        </h3>
        <div className="card-toolbar">
        </div>
      </div>
      <div className="card-body pt-3 pb-0">
        <div className="table-responsive d-flex flex-column">
        <div><label>Choose A Color: </label><input className="ml-2" type="color" id="WritingColor" /></div>
         <input type="button" width="100%" className="btn btn-outline-success mt-2" id="DownloadWhiteBoard" value="Download !" />
         <button className="btn btn-outline-success mt-2" width="100%" id="ClearWhiteBoard" >Clear WhiteBoard</button>
        </div>
      </div>
    </div>
  );
}