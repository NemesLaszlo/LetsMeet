import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router'
import {Grid} from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedChat from './ActivityDetailedChat'
import ActivityDetailedSidebar from './ActivityDetailedSidebar'

const ActivityDetails = () => {
    const {activityStore} = useStore()
    const {selectedActivity: activity, loadActivity, loadingInitial} = activityStore
    const {id} = useParams<{id: string}>()

    useEffect(() => {
        if(id) {
            loadActivity(id)
        }
    }, [id, loadActivity])
    
    if(loadingInitial || !activity) return <LoadingComponent content='Loading activity...' />

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailedHeader activity={activity}/>
                <ActivityDetailedInfo activity={activity}/>
                <ActivityDetailedChat />
            </Grid.Column>

            <Grid.Column width={6}>
                <ActivityDetailedSidebar attendees={activity.attendees!} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDetails)