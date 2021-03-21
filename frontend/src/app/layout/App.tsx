import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'

const App = () => {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get<Activity[]>('https://localhost:44392/api/activities').then(response => {
      setActivities(response.data);
    })
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id))
  }

  const handleCancelActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelActivity()
    setEditMode(true)
  }

  const handleFormClose = () => {
    setEditMode(false)
  }

  return (
    <>
      <NavBar openForm={handleFormOpen}/>

      <Container style={{marginTop: '7em'}}>
        <ActivityDashboard 
          activities={activities} 
          selectedActivity = {selectedActivity}
          selectActivity = {handleSelectActivity}
          cancelSelectActivity = {handleCancelActivity}
          editMode = {editMode}
          openForm = {handleFormOpen}
          closeForm = {handleFormClose}
        />
      </Container>
    </>
  );
}

export default App
