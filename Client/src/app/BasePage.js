import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { LayoutSplashScreen, ContentRoute } from "../_metronic/layout";
import { BuilderPage } from "./pages/BuilderPage";
import { MyPage } from "./pages/MyPage";
import { MeetopiaPage } from "./pages/Meetopia/Meetopia";
import { DashboardPage } from "./pages/DashboardPage";
import { GroupPage } from "./pages/GroupPage";
import { ViewMeetopias } from "./pages/Meetopia/ViewMeetopias";
import { MyQuizzes } from "./pages/Quizz/MyQuizzes";
import { NewQuizzPage } from "./pages/Quizz/NewQuizzPage";
import { ValidationsPage } from "./pages/ValidationsPage";
import { QuestionsPage } from "./pages/QuestionsPage";
import { Allgroups } from "./pages/Allgroups";
import { ProjectsPage } from "./pages/ProjectsPage";
import { ProfessorsPage } from "./pages/ProfessorsPage";
import { AdminsPage } from "./pages/AdminsPage";
import { useSelector } from "react-redux";

import ListCLassesGroup from "../components/ListCLassesGroup";
import ListCLasses from "../components/ListClasses";
import insideClass from "../components/InsideClass";

const GoogleMaterialPage = lazy(() =>
  import("./modules/GoogleMaterialExamples/GoogleMaterialPage")
);

const ECommercePage = lazy(() =>
  import("./modules/ECommerce/pages/eCommercePage")
);

export default function BasePage() {
  const user = useSelector((state) => state.auth.user);
  // useEffect(() => {
  //   console.log('Base page');
  // }, []) // [] - is required if you need only one call
  // https://reactjs.org/docs/hooks-reference.html#useeffect

  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/dashboard" />
        }
        {user.role === "admin" ? (
          <Switch>
            <ContentRoute path="/professors" component={ProfessorsPage} />

            <ContentRoute path="/admins" component={AdminsPage} />

            <ContentRoute path="/classesGroupe" component={ListCLassesGroup} />
            <ContentRoute path="/classes" component={ListCLasses} />
            <ContentRoute path="/insideClass" component={insideClass} />
            <ContentRoute path="/listCourses" component={insideClass} />
            <ContentRoute path="/DetailCourses" component={insideClass} />
          </Switch>
        ) : (
          <Switch>
            <ContentRoute path="/dashboard" component={DashboardPage} />
            <ContentRoute path="/builder" component={BuilderPage} />
            <ContentRoute path="/my-page" component={MyPage} />
            <ContentRoute path="/Meetopia" component={MeetopiaPage} />
            <ContentRoute path="/MyMeetopias" component={ViewMeetopias} />
            <ContentRoute path="/MyQuizzes" component={MyQuizzes} />
            <ContentRoute path="/CreateNewQuizz" component={NewQuizzPage} />
            <ContentRoute path="/allgroups" component={Allgroups} />
            <ContentRoute path="/group" component={GroupPage} />

            <ContentRoute path="/projects" component={ProjectsPage} />
            <ContentRoute path="/validations" component={ValidationsPage} />
            <ContentRoute path="/questions" component={QuestionsPage} />

            <ContentRoute path="/classesGroupe" component={ListCLassesGroup} />
            <ContentRoute path="/classes" component={ListCLasses} />
            <ContentRoute path="/insideClass" component={insideClass} />
            <ContentRoute path="/listCourses" component={insideClass} />
            <ContentRoute path="/DetailCourses" component={insideClass} />

            <Route path="/google-material" component={GoogleMaterialPage} />
          </Switch>
        )}
        <Route path="/e-commerce" component={ECommercePage} />
        <Redirect to="error/error-v1" />
      </Switch>
    </Suspense>
  );
}
