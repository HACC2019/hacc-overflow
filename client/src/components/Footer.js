import React from 'react';
import Container from '@material-ui/core/container';

export default function Footer(){
    return(
        <div>
            <Container style={{backgroundColor: "#ff0000"}}>
                <span>This is a footer</span>
            </Container>
        </div>
    );
}