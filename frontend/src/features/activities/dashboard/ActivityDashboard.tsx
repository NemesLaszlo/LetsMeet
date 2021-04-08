import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Grid, Loader } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import ActivityList from './ActivityList'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import ActivityFilters from './ActivityFilters'
import { PagingParams } from '../../../app/models/pagination'
import InfiniteScroll from 'react-infinite-scroller'

const ActivityDashboard = () => {
    const {activityStore} = useStore()
    const {loadActivities, activityRegistry, setPagingParams, pagination} = activityStore
    const [loadingNext, setLoadingNext] = useState(false);

    const handleGetNext = () => {
        setLoadingNext(true);
        setPagingParams(new PagingParams(pagination!.currentPage + 1))
        loadActivities().then(() => setLoadingNext(false));
    }

    useEffect(() => {
      if(activityRegistry.size <= 1) {
        loadActivities()
      } 
    }, [activityRegistry.size, loadActivities])
  
    if (activityStore.loadingInitial && !loadingNext) return <LoadingComponent content='Loading activities...' />

    return (
        <Grid>
            <Grid.Column width='10'>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <ActivityList />
                </InfiniteScroll>
            </Grid.Column>

            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>

            <Grid.Column width={10}>
                <Loader active={loadingNext} />
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard)