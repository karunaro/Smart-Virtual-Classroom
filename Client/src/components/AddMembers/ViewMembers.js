/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useEffect } from "react";
import { Image } from "react-bootstrap";
import SVG from "react-inlinesvg";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteStudentFromList,
  getListStudentInClass,
} from "../../redux/Slices/classes";
import {
  getListStudentsByClass,
  RefuseInvitation,
} from "../../redux/Slices/invitations";
import { toAbsoluteUrl } from "../../_metronic/_helpers";
import ModalGroup from "../ModalGroup";

export function ViewMembers() {
  const listStudentsByClass = useSelector(
    (state) => state.classes.listStudents
  );
  const userConnected = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListStudentInClass(localStorage.getItem("classURL")));
  }, [dispatch]);

  const removeStudentFromList = (idUser) => {
    const obj = {
      classOb: localStorage.getItem("classURL"),
      userOb: idUser,
    };
    dispatch(DeleteStudentFromList(obj)).then(() => {
      dispatch(RefuseInvitation(obj));
      dispatch(getListStudentInClass(localStorage.getItem("classURL")));
    });
  };
  return (
    <div className="card-stretch gutter-b">
      {/* begin::Header */}
      {userConnected.role === "professor" || userConnected.role === "admin" ? (
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              List of Students that accepted your invitation
            </span>
          </h3>
        </div>
      ) : (
        <div className="card-header border-0 py-5">
          <h3 className="card-title align-items-start flex-column">
            <span className="card-label font-weight-bolder text-dark">
              List of Students
            </span>
          </h3>
        </div>
      )}

      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-0">
        {/* begin::Table */}
        <div className="table-responsive">
          <table
            className="table table-head-custom table-vertical-center"
            id="kt_advance_table_widget_1"
          >
            <thead>
              {userConnected.role === "professor" ? (
                <tr className="text-left">
                  <th className="pr-0" style={{ width: "50px" }}>
                    Students
                  </th>
                  <th style={{ minWidth: "200px" }} />

                  <th className="pr-0 text-right" style={{ minWidth: "150px" }}>
                    action
                  </th>
                </tr>
              ) : (
                <tr className="text-left">
                  <th className="pr-0" style={{ width: "50px" }}>
                    Students
                  </th>
                  <th style={{ minWidth: "200px" }} />
                </tr>
              )}
            </thead>
            <tbody>
              {listStudentsByClass.map((c, index) => (
                <tr>
                  <td className="pr-0">
                    <div className="symbol symbol-50 symbol-light mt-1">
                      <Image
                        style={{
                          margin: "2px",
                          height: "70px",
                          width: "50px",
                        }}
                        src={c.image}
                        className="h-75 align-self-end"
                        thumbnail
                      />
                    </div>
                  </td>
                  <td className="pl-0">
                    <a
                      href="#"
                      className="text-dark-75 font-weight-bolder text-hover-primary mb-1 font-size-lg"
                    >
                      {c.fistname}
                      {""} {c.lastname}
                    </a>
                    <span className="text-muted font-weight-bold text-muted d-block">
                      {c.email}
                    </span>
                  </td>
                  {userConnected.role === "professor" ||
                  userConnected.role === "admin" ? (
                    <td className="pr-0 text-right">
                      <a
                        href="#"
                        className="btn btn-icon btn-light btn-hover-primary btn-sm"
                        onClick={() => removeStudentFromList(c._id)}
                      >
                        <span className="svg-icon svg-icon-md svg-icon-primary">
                          <SVG
                            src={toAbsoluteUrl(
                              "/media/svg/icons/General/Trash.svg"
                            )}
                          ></SVG>
                        </span>
                      </a>
                    </td>
                  ) : (
                    <></>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* end::Table */}
      </div>
      {/* end::Body */}
    </div>
  );
}
