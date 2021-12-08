import React from 'react';
import { Text } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

export const Login = () => {
    return (
        <Wrapper>
            <Text>Login</Text>
        </Wrapper>
    );
};

const Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: white;
`;
