import React from "react";
import {ListsWidget10, ListsWidget11, AdvanceTablesWidget1, MixedWidget6, MixedWidget10, MixedWidget11, MixedWidget12, TilesWidget1, TilesWidget3, TilesWidget10, TilesWidget11, TilesWidget12, TilesWidget13, TilesWidget14} from "../../_metronic/_partials/widgets";
import SessionDisplay from "../../components/SessionsDisplay"
import AddSession from "../../components/AddSession"
import CourseBar from "../../components/CourseBar"

export   function SessionsPage() {
    return <>
        {/* begin::Dashboard */}
        {/* begin::Row */}


        <div className="row">
           <div className="col-xl-3"> <CourseBar> </CourseBar></div>
<div className="col-xl-9">
    <AddSession></AddSession>
<br/>

            <SessionDisplay></SessionDisplay>
</div>


        </div>


        {/* end::Row */}





        {/* end::Dashboard */}
    </>;
}
