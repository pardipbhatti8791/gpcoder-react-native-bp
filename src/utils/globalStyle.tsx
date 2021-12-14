// @ts-ignore
import styled from 'styled-components/native';

export const NotFoundWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

export const NotFound = styled.Text`
    font-size: 18px;
    color: ${({ theme }: any) => theme.colors.text};
  
`;
