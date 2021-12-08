import React from 'react';
import { Text } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

export const Actions = () => {
    return (
        <Wrapper>
            <Text>Actions</Text>
        </Wrapper>
    );
};

const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: white;
`;
