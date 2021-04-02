import React from 'react'
import { observer } from 'mobx-react-lite';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';

const ProfilePage =  () => {
    return (
        <Grid>

            <Grid.Column width={16}>
                <ProfileHeader />
                <ProfileContent />
            </Grid.Column>

        </Grid>
    )
}

export default observer(ProfilePage)
