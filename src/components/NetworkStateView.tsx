import React, {useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import {withTheme} from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";

// @ts-ignore
export const NetworkStateView = () => {
    const [scannedData, setScannedData] = useState<any>();
    const {setScannedCheckPointsEntries,getShiftsCheckPointsEntries} = useActions();

    const orgID = useTypedSelector((state) => state.auth.orgID);
    AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
        setScannedData(asyncStorageRes)
    })
    return (
        <View>
            <Notification>
                <MessageText>Internet Avaliable</MessageText>
                <TouchableOpacity onPress={async () => {
                    AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
                        setScannedData(asyncStorageRes)
                    })

                    await setScannedCheckPointsEntries({
                        orgID: orgID,
                        item: JSON.parse(scannedData),
                    });

                     // @ts-ignore
                    AsyncStorage.setItem('SCANNED_ITEM','')

                }
                } style={{marginLeft: 'auto'}}>
                    <CtaBtn>Upload Now</CtaBtn>
                </TouchableOpacity>
            </Notification>
        </View>
    );
}


const Notification = styled.View`
  padding: 10px 15px;
  flex-direction: row;
  background-color: ${({theme}: any) => theme.colors.parrotGreen};
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
`;
const MessageText = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardDate}px;
  color: ${({theme}: any) => theme.colors.text};
  font-weight: 500;
`;
const CtaBtn = styled.Text`
  margin-left: auto;
  font-size: ${({theme}: any) => theme.fontSize.cardDate}px;
  color: ${({theme}: any) => theme.colors.text};
  font-weight: 500;
`;