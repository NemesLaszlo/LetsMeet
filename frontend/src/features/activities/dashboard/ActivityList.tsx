import React, { Fragment } from 'react'
import { observer } from 'mobx-react-lite'
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import ActivityListItem from './ActivityListItem'

const ActivityList = () => {
    const {activityStore} = useStore()
    const {qroupedActivities} = activityStore

    return (
        <>
            {qroupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='teal'>
                        {group}
                    </Header>
                        {activities.map(activity => (
                            <ActivityListItem key={activity.id} activity={activity} />
                        ))}
                </Fragment>
            ))}
        </>
    )
}

export default observer(ActivityList)