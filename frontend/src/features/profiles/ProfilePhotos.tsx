import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { Card, Header, Tab, Image, Grid, Button } from 'semantic-ui-react'
import { Profile } from '../../app/models/profile'
import { useStore } from '../../app/stores/store'
import PhotoUploadWidget from '../../app/common/imageUpload/PhotoUploadWidget'

interface Props {
    profile: Profile;
}

const ProfilePhotos = ({ profile }: Props) => {
    const { profileStore: { isCurrentUser, uploadPhoto, uploading } } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    const handlePhotoUpload = (file: Blob) => {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    return (
        <Tab.Pane>

            <Grid>

                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentUser && (
                        <Button floated='right' basic 
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'} 
                            onClick={() => setAddPhotoMode(!addPhotoMode)} />
                    )}
                </Grid.Column>

                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} />
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile.photos?.map(photo => (
                                <Card key={photo.id}>
                                    <Image src={photo.url} />
                                </Card>
                            ))}
                        </Card.Group>
                    )}    
                </Grid.Column>

            </Grid>

        </Tab.Pane>
    )
}

export default observer(ProfilePhotos)