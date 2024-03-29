import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";


import HomePage from "./components/Home";
import ManageVideos from "./components/ManageVideos";
import EditVideoPage from "./components/EditVideo";
import ShowVideo from "./components/ShowVideo";
import Channel from "./components/Channel";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/videos">
            <HomePage />
          </Route>
          <Route path="/videos/:videoId">
            <ShowVideo />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/manage/edit/:videoId">
            <EditVideoPage user={sessionUser}/>
          </Route>
          <Route path="/manage">
            <ManageVideos user={sessionUser}/>
          </Route>
          <Route path="/channels/:userId">
            <Channel user={sessionUser}/>
          </Route>
          
        </Switch>
      )}
    </>
  );
}

export default App;
