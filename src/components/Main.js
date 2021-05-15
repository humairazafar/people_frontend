

import { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Index from "../pages/Index";
import Show from "../pages/Show";

function Main(props) {
  const [people, setPeople] = useState(null);

  const URL = "https://hz-people-api-backend.herokuapp.com/people/";

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  const updatePeople = async (person, id) => {
    //make a post req. to update a person
    await fetch(URL + id, {
      method: "put",
      headers:{
        "content-Type": "application/json"
      },
      body:JSON.stringify(person)
    })
    //update list of people
    getPeople()
  }

  const deletePeople = async (id) => {
    //make delete req. to dele person
    await fetch(URL + id, {
      method: "delete",
    })

    //update list of people
    getPeople()
  }

  useEffect(() => getPeople(), []);

  return (
    <main>
      <Switch>
        <Route exact path="/">
          <Index people={people} createPeople={createPeople} />
        </Route>
        <Route
          path="/people/:id"
          render={(rp) => (
            <Show
            people={people}
            updatePeople={updatePeople}
            deletePeople={deletePeople}
              {...rp}
            />
          )}
        />
      </Switch>
    </main>
  );
}

export default Main;