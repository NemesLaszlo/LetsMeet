import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

interface Props {
    inverted?: boolean; // ? optional paramter
    content?: string;
}

const LoadingComponent = ({inverted = true, content = 'Loading ...' }: Props) => {
    return (
        <Dimmer active={true} inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}

export default LoadingComponent