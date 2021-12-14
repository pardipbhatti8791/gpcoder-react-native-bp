import React from 'react';
import {
    Button,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import BackgroundGlobal from '@root/components/BackgroundGlobal';

const data = [
    {
        name: 'Westmead Hospital - 20 Mins ago',
        email: 'The northern door in sector 4 is going to be locked today, please use the attached route instead.',
    },
    {
        name: 'Westmead Hospital - 20 Mins ago',
        email: 'The northern door in sector 4 is going to be locked today, please use the attached route instead.',
    },
];

export const Messages = () => {
    return (
        <BackgroundGlobal>
            <StatusBar translucent={true}></StatusBar>
            <MainFrame>
                <ScrollView>
                    {data.map((item, i) => (
                        <TouchableOpacity key={i}>
                            <ShiftItemLayout>
                                <ContentWrapper>
                                <TitleText>{item.name}</TitleText>
                                <ExpireText>{item.email}</ExpireText>

                                <ItemBottom>
                                    <Text> Mark As Read </Text>
                                    <Button title={'View Image'}/>
                                </ItemBottom>
                                </ContentWrapper>
                            </ShiftItemLayout>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </MainFrame>
        </BackgroundGlobal>
    );
};

const TitleText = styled.Text`
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 18px;
    text-transform: capitalize;
    color: #e5e5e5;
`;

const ExpireText = styled.Text`
    font-style: normal;
    font-weight: bold;
    margin-top: 10px;
    font-size: 16px;
    line-height: 18px;
    text-transform: capitalize;
    color: #e5e5e5;
`;

const ItemBottom = styled.View`
    margin-top: 15px;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const ContentWrapper = styled.View``

const ShiftItemLayout = styled.View`
  flex-direction: row;
    background: #17907a;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 14px;
    display: flex;
    align-items: center;
`;

const MainFrame = styled.View`
    padding: 16px;
    height: 100%;
`;
