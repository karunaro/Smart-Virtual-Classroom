/* eslint-disable react/style-prop-object */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Dropdown, OverlayTrigger, Tooltip } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import {
  AcceptInvitation,
  InacceptedClass,
  RefuseInvitation,
} from "../../redux/Slices/invitations";
import { useDispatch, useSelector } from "react-redux";
import { UpdateListStudents } from "../../redux/Slices/classes";

const perfectScrollbarOptions = {
  wheelSpeed: 2,
  wheelPropagation: false,
};

export function ViewInacceptedClass() {
  const InacceptedClasses = useSelector(
    (state) => state.invitations.listClassInaccepted
  );
  const CurrentUser = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(InacceptedClass(CurrentUser._id));
  }, [dispatch]);

  const acceptInvitation = (idClass, idUser) => {
    dispatch(AcceptInvitation({ classOb: idClass, userOb: idUser })).then(
      () => {
        dispatch(InacceptedClass(CurrentUser._id));
        dispatch(UpdateListStudents({ classOb: idClass, userOb: idUser }));
      }
    );
  };

  const refuseInvitation = (idClass, idUser) => {
    dispatch(RefuseInvitation({ classOb: idClass, userOb: idUser })).then(
      () => {
        dispatch(InacceptedClass(CurrentUser._id));
      }
    );
  };
  return (
    <PerfectScrollbar
      options={perfectScrollbarOptions}
      className="scroll"
      style={{ maxHeight: "35vh", position: "relative" }}
    >
      {InacceptedClasses.length === 0 ? (
        <h1>No invitations to display</h1>
      ) : (
        InacceptedClasses.map((c, index) => (
          <>
            <div className="d-flex align-items-center justify-content-between p-8">
              <div className="d-flex flex-column mr-2">
                <a
                  href="#"
                  className="font-weight-bold text-dark-75 font-size-lg text-hover-primary"
                >
                  {"Class Name : "}
                  {c.classOb.name}
                </a>
                <span className="text-muted">
                  {"Class Section: "}
                  {c.classOb.section}
                </span>
                <div className="d-flex align-items-center mt-2">
                  <a
                    href="#"
                    onClick={() =>
                      acceptInvitation(c.classOb._id, c.userOb._id)
                    }
                    className="btn btn-lg btn-light-success btn-icon mr-2"
                  >
                    <i className="fas fa-check icon-lg"></i>
                  </a>
                  <a
                    href="#"
                    onClick={() =>
                      refuseInvitation(c.classOb._id, c.userOb._id)
                    }
                    className="btn btn-lg btn-light-danger btn-icon"
                  >
                    <i className="fas fa-times icon-lg"></i>
                  </a>
                </div>
              </div>
              <a href="#" className="symbol symbol-70 flex-shrink-0">
                <img
                  src={toAbsoluteUrl("/media/stock-600x400/img-1.jpg")}
                  alt=""
                />
              </a>
            </div>
            <div className="separator separator-solid"></div>
          </>
        ))
      )}
    </PerfectScrollbar>
  );
}
