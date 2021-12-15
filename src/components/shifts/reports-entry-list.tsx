import React from 'react';
import { Image } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';

const ReportsEntryList = ({ data }: any) => {
    return (
        data?.length > 0 &&
        data.map((item: any) => (
            <ReportsEntryList__Wrapper>
                <ReportsEntryList__Wrapper_Secondary>
                    <TitleText>{item.name}</TitleText>

                    <Image
                        source={require('@root/assets/iconright.png')}
                        style={{ width: 12, height: 14 }}
                    />
                </ReportsEntryList__Wrapper_Secondary>
            </ReportsEntryList__Wrapper>
        ))
    );
};

// @ts-ignore
export default withTheme(ReportsEntryList);

const TitleText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
`;

const ReportsEntryList__Wrapper_Secondary = styled.View`
    height: 80px;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    align-items: center;
    margin-bottom: 1px;
    background-color: ${({ theme }: any) => theme.colors.secondary};
`;

const ReportsEntryList__Wrapper = styled.View`
    flex: 1;
    background-color: ${({ theme }: any) => theme.colors.primary};
`;
