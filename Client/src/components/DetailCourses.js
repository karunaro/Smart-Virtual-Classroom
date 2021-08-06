import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetCoursesById } from "../redux/Slices/courses";
import ReactTimeAgo from "react-time-ago/commonjs/ReactTimeAgo";
import SVG from "react-inlinesvg";
import { Figure, Image } from "react-bootstrap";

export default function DetailCourses() {
  const course = useSelector((state) => state.courses.coursesById);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetCoursesById(localStorage.getItem("coursesId")));
  }, [localStorage.getItem("coursesId")]);
  return (
    <>
      {!course ? (
        "NoCourse"
      ) : (
        <div className="row">
          <div className="col-xl-12">
            <div className={`card card-custom card-stretch gutter-b`}>
              {/* begin::Body */}
              <div className="card-body d-flex flex-column">
                <div className="flex-grow-1 pb-5">
                  {/* begin::Info */}
                  <div className="d-flex align-items-center pr-2 mb-6">
                    <span className="text-muted font-weight-bold font-size-lg flex-grow-1">
                      <ReactTimeAgo date={course.dateCreation} locale="en-US" />
                    </span>
                  </div>
                  {/* end::Info */}

                  {/* begin::Link */}
                  <a
                    href="#"
                    className="text-dark font-weight-bolder text-hover-primary font-size-h4"
                  >
                    {course.name}
                  </a>
                  {/* end::Link */}

                  {/* begin::Desc */}
                  <p className="text-dark-50 font-weight-normal font-size-lg mt-6">
                    {course.description}
                  </p>
                  {/* end::Desc */}
                </div>
                {/* begin::Team */}
                <div className="d-flex align-items-center">
                  {/* begin::Pic */}
                  {course.files.map((f, index) => (
                    <a href={f} target="_blank" rel="noopener noreferrer">
                      {f.split(".").pop() === "png" ||
                      f.split(".").pop() === "jpg" ||
                      f.split(".").pop() === "jpeg" ||
                      f.split(".").pop() === "gif" ? (
                        <div>
                          <Figure>
                            <Image
                              style={{
                                margin: "2px",
                                height: "150px",
                                width: "150px",
                              }}
                              src={f}
                              className="h-75 align-self-end"
                              thumbnail
                            />
                            <Figure.Caption
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                              }}
                            >
                              <b>{f.split("-").pop()}</b>
                            </Figure.Caption>
                          </Figure>
                        </div>
                      ) : f.split(".").pop() === "doc" ||
                        f.split(".").pop() === "docx" ||
                        f.split(".").pop() === "pdf" ||
                        f.split(".").pop() === "css" ||
                        f.split(".").pop() === "csv" ||
                        f.split(".").pop() === "html" ||
                        f.split(".").pop() === "js" ||
                        f.split(".").pop() === "xml" ||
                        f.split(".").pop() === "mp4" ||
                        f.split(".").pop() === "pptx" ||
                        f.split(".").pop() === "zip" ? (
                        <div>
                          <Figure>
                            <SVG
                              style={{
                                margin: "2px",
                                height: "150px",
                                width: "150px",
                              }}
                              src={
                                process.env.PUBLIC_URL +
                                "/media/svg/files/" +
                                f.split(".").pop() +
                                ".svg"
                              }
                              className="h-75 align-self-end"
                            ></SVG>
                            <Figure.Caption
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                              }}
                            >
                              <b>{f.split("-").pop()}</b>
                            </Figure.Caption>
                          </Figure>
                        </div>
                      ) : (
                        <div>
                          <Figure>
                            <SVG
                              style={{
                                margin: "2px",
                                height: "150px",
                                width: "150px",
                              }}
                              src={
                                process.env.PUBLIC_URL +
                                "/media/svg/icons/Files/Deleted-file.svg"
                              }
                              className="h-75 align-self-end"
                            ></SVG>
                            <Figure.Caption
                              style={{
                                textAlign: "center",
                                fontSize: "13px",
                              }}
                            >
                              <b>{f.split("-").pop()}</b>
                            </Figure.Caption>
                          </Figure>
                        </div>
                      )}
                    </a>
                  ))}
                </div>
                {/* end::Team */}
              </div>
              {/* end::Body */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
