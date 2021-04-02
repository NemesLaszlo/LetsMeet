import React from 'react'
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';

const ProfilePage =  () => {
    return (
        <Grid>

            <Grid.Column width={16}>
                <ProfileHeader />
            </Grid.Column>

        </Grid>
    )
}

export default observer(ProfilePage)