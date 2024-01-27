import React from 'react';
import {Header, SmallLogo, Title,Line} from "./styles";



const HeaderComponent = ({ title, imgSrc}) => {
    return(
        <>
            <Header>
                <Title>{ title }</Title>
                <SmallLogo source={imgSrc} />
            </Header>
            <Line style={{ width: '80%' }} />

        </>

    );
}

export default HeaderComponent;