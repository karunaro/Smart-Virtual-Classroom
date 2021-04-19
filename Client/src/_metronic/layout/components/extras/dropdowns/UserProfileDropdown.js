/* eslint-disable no-restricted-imports */
/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { useSelector } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import objectPath from "object-path";
import { useHtmlClassService } from "../../../_core/MetronicLayout";
import { toAbsoluteUrl } from "../../../../_helpers";
import { DropdownTopbarItemToggler } from "../../../../_partials/dropdowns";
import ModalChangepassword from "../offcanvas/ModalChangepassword";

import CameraIcon from "@material-ui/icons/Camera";
import FormImage from "../offcanvas/Formimage";

export function UserProfileDropdown() {
  const user = useSelector((state) => state.auth.user);
  const userrr = JSON.parse(localStorage.getItem("user"));
  const [open, setOpen] = React.useState(false);
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }
  console.log(userrr.email);
  const uiService = useHtmlClassService();
  const layoutProps = useMemo(() => {
    return {
      light:
        objectPath.get(uiService.config, "extras.user.dropdown.style") ===
        "light",
    };
  }, [uiService]);

  return (
    <Dropdown drop="down" alignRight>
      <Dropdown.Toggle
        as={DropdownTopbarItemToggler}
        id="dropdown-toggle-user-profile"
      >
        <div
          className={
            "btn btn-icon btn-hover-transparent-white d-flex align-items-center btn-lg px-md-2 w-md-auto"
          }
        >
          <span className="text-white opacity-70 font-weight-bold font-size-base d-none d-md-inline mr-1">
            Hi,
          </span>
          <span className="text-white opacity-90 font-weight-bolder font-size-base d-none d-md-inline mr-4">
            {user.firstname}
          </span>
          <span className="symbol symbol-35">
            <img src={userrr.image} alt="" />
          </span>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu className="dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim-up dropdown-menu-lg p-0">
        <>
          {/** ClassName should be 'dropdown-menu p-0 m-0 dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl' */}
          {layoutProps.light && (
            <>
              <div className="d-flex align-items-center p-8 rounded-top">
                <div>
                  <div className="symbol symbol-md bg-light-primary mr-3 flex-shrink-0">
                    <img src={userrr.image} alt="" />
                  </div>
                  <a
                    onClick={handleClickOpen}
                    href="#"
                    className=" text-center bg-hover-light"
                  >
                    <span className=" svg-icon-success">
                      <CameraIcon onClick={handleClickOpen}></CameraIcon>
                    </span>
                  </a>
                </div>
                <div>
                  <div className="text-dark m-0 flex-grow-1 mr-3 font-size-h5">
                    {" "}
                    {user.firstname} {user.lastname}
                  </div>
                  <div className="text-muted">{user.email}</div>
                </div>

                {/* <span className="label label-light-success label-lg font-weight-bold label-inline">3 messages</span> */}
              </div>
              <div className="separator separator-solid"></div>
            </>
          )}

          {!layoutProps.light && (
            <div
              className="d-flex align-items-center justify-content-between flex-wrap p-8 bgi-size-cover bgi-no-repeat rounded-top"
              style={{
                backgroundImage: `url(${toAbsoluteUrl(
                  "/media/misc/bg-1.jpg"
                )})`,
              }}
            >
              <div className="symbol bg-white-o-15 mr-3">
                <span className="symbol-label text-success font-weight-bold font-size-h4">
                  S
                </span>
                <img src={user.image} alt="x" />
              </div>
              <div className="text-white m-0 flex-grow-1 mr-3 font-size-h5">
                {user.firstname}
              </div>
            </div>
          )}
        </>

        <div className="navi navi-spacer-x-0 pt-5">
          <a className="navi-item px-8">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="flaticon2-calendar-3 text-success" />
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">
                  My Profile
                  <div className="col-6"></div>
                  <Dialog
                    fullScreen={false}
                    maxWidth={"sm"}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                  >
                    <DialogTitle id="responsive-dialog-title">
                      {"Edit Image Profile"}
                    </DialogTitle>
                    <DialogContent>
                      <FormImage></FormImage>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </a>

          <a className="navi-item px-8">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="flaticon2-mail text-warning"></i>
              </div>
              <div className="navi-text">
                <ModalChangepassword></ModalChangepassword>
              </div>
            </div>
          </a>

          <a className="navi-item px-8">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="flaticon2-rocket-1 text-danger"></i>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Activities</div>
                <div className="text-muted">Logs and notifications</div>
              </div>
            </div>
          </a>

          <a className="navi-item px-8">
            <div className="navi-link">
              <div className="navi-icon mr-2">
                <i className="flaticon2-hourglass text-primary"></i>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Tasks</div>
                <div className="text-muted">latest tasks and projects</div>
              </div>
            </div>
          </a>
          <div className="navi-separator mt-3"></div>

          <div className="navi-footer  px-8 py-5">
            <Link
              to="/logout"
              className="btn btn-light-primary font-weight-bold"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
}
