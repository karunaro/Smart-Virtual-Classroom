import React from "react";
import {
    MixedWidget1,
    MixedWidget14,
    ListsWidget9,
    StatsWidget11,
    StatsWidget12,
    ListsWidget1,
    AdvanceTablesWidget2,
    AdvanceTablesWidget4,
    ListsWidget3,
    ListsWidget4,
    ListsWidget8
} from "../../../_metronic/_partials/widgets";
import { ChatBoxComponent } from '../../../components/Meetopia/ChatBoxComponent'
import { VideoComponent } from '../../../components/Meetopia/VideoComponent'
export function MeetopiaPage() {
    return (<>
            <div className="row">
                <div className="col-lg-8 col-xxl-9">
                    <VideoComponent className="card-stretch gutter-b"/>
                </div>
                <div className="col-lg-6 col-xxl-3">
                    <ChatBoxComponent className="card-stretch gutter-b"/>
                </div>
            </div>
    </>);
}
