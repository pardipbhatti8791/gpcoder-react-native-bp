import React, { useEffect } from 'react';
import { Text } from 'react-native';
import { Appearance } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

export const Home = () => {
    useEffect(() => {
        console.log('mode', Appearance.getColorScheme());
    });

    return (
        <Wrapper>
            <Text>Home</Text>
        </Wrapper>
    );
};

const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: white;
`;
