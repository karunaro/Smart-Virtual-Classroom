import React from "react";
import EditSectionModal from "./EditSectionModal";
import ModalDeleteSection from "./ModalDeleteSection";

export default function DropdownSectionActions(props) {
  return (
    <div>
      {/*begin::Naviigation*/}
      <ul className="navi">
        {/* <li className="navi-separator mb-3 opacity-70"></li> */}
        <EditSectionModal idSection={props.idSection}></EditSectionModal>
        <ModalDeleteSection
          idSection={props.idSection}
          name={props.name}
        ></ModalDeleteSection>
      </ul>

      {/*end::Naviigation*/}
    </div>
  );
}
