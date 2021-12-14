import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';

import { View, Text, Linking } from 'react-native';
import BackgroundGlobal from '@root/components/BackgroundGlobal';

export const ActionDetail = () => {
    return (
        <BackgroundGlobal>
            <MainFrame>
                <View style={{ alignItems: 'center' }}>
                    <Text style={[{ color: '#D93F3C' }, { marginTop: 16 }]}>
                        OverDue
                    </Text>
                </View>

                <ShiftItemLayout>
                    <View style={{ alignItems: 'center' }}>
                        <JobDetailView>
                            <TitleText>Job Detail:</TitleText>
                            <TextDesc>John </TextDesc>
                        </JobDetailView>
                        <JobDetailView>
                            <TitleText>Licence Number:</TitleText>
                            <TextDesc>1515154</TextDesc>
                        </JobDetailView>
                        <JobDetailView>
                            <TitleText>Issue Date:</TitleText>
                            <TextDesc>12 </TextDesc>
                        </JobDetailView>
                        <JobDetailView>
                            <TitleText>Expiry Date:</TitleText>
                            <TextDesc>05-02-2025</TextDesc>
                        </JobDetailView>

                        <JobDetailView>
                            <TitleText>Licence Date:</TitleText>
                            <TextDesc>02/05/2021</TextDesc>
                        </JobDetailView>
                        <JobDetailView>
                            <TitleText>Date of Birth:</TitleText>
                            <TextDesc>03/05/1991 </TextDesc>
                        </JobDetailView>
                    </View>
                </ShiftItemLayout>

                <Text style={{ color: '#FFFFFF' }}>
                    To update your security license, go to the QLD Gvt' website
                    and let Always Synergy know when the license is renewed
                </Text>

                <Text
                    style={{
                        color: '#F18122',
                        marginTop: 16,
                        textDecorationLine: 'underline',
                    }}
                    onPress={() => {
                        Linking.openURL('http://google.com');
                    }}>
                    http://google.com
                </Text>
            </MainFrame>
        </BackgroundGlobal>
    );
};

const MainFrame = styled.View`
    padding: 16px;
`;

const ShiftItemLayout = styled.View`
  background: #29313e;
  border: 2px solid #29313E;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 16px;
  padding: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const JobDetailView = styled.View`
    display: flex;
    margin-bottom: 4px;
    flex-direction: row;
`;
const TitleText = styled.Text`
    font-size: 17px;
    font-weight: 400;
    color: #a9acb1;
    text-align: right;
    width: 40%;
    padding-right: 8px;
`;
const TextDesc = styled.Text`
    font-size: 17px;
    font-weight: 400;
    color: #ffffff;
    width: 60%;
    padding-left: 8px;
`;
