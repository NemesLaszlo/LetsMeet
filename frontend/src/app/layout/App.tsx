import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Container, List } from 'semantic-ui-react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:44392/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  return (
    <>

      <NavBar />

      <Container style={{marginTop: '7em'}}>

        <List>
            {activities.map((activity) => (
              <List.Item key={activity.id}>
                {activity.title}
              </List.Item>
            ))}
        </List>

      </Container>

    </>
  );
}

export default App
