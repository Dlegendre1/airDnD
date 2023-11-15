import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotDetailsPage from "./components/SpotDetailsPage";
import SpotCardList from "./components/SpotCardList";
import CreateASpot from "./components/SpotCreationForm";
import UserSpots from "./components/UserSpots";
import EditASpot from "./components/SpotEditPage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded &&
        <Switch>
          <Route exact path="/" component={SpotCardList} />
          <Route path="/spots/new" component={CreateASpot} />
          <Route path='/spots/:spotId/edit' component={EditASpot} />
          <Route path='/spots/current' component={UserSpots} />
          <Route path="/spots/:spotId" component={SpotDetailsPage} />
        </Switch>
      }
    </>
  );
}

export default App;
