import React, {useEffect, useState} from 'react'
import {View, Text, TouchableOpacity} from 'react-native';
import {withTheme} from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {SHIFT_ID} from "../utils/constants";

// @ts-ignore
export const NetworkStateView = () => {
    const [isClear, setIsClear] = useState(true)
    const [scannedData, setScannedData] = useState<any>();
    const [shiftID, setShiftID] = useState<any>();
    const {setScannedCheckPointsEntries} = useActions();
    const orgID = useTypedSelector((state) => state.auth.orgID);

    useEffect(() => {
        AsyncStorage.getItem(SHIFT_ID).then(resp => {
            if(resp) {
                setIsClear(false)
            }
        })
    }, [isClear])

    return (

        <View>
            {!isClear && <Notification>
                <MessageText>Internet Avaliable</MessageText>
                <TouchableOpacity onPress={async () => {

                    try {
                       const scannedObject = await AsyncStorage.getItem('SCANNED_ITEM')
                        if(scannedObject) {
                            setScannedData(scannedObject)
                        }

                        const shiftIDData = await AsyncStorage.getItem(SHIFT_ID)
                        if(shiftIDData) {
                            setShiftID(shiftIDData)
                        }

                        await setScannedCheckPointsEntries({
                            orgID: orgID,
                            item: {
                                shiftID: shiftID,
                                checkpointCode: JSON.parse(scannedData).checkpointCode,
                                scannedDateTime: JSON.parse(scannedData).scannedDateTime,
                                geoLocation: {
                                    latitude: JSON.parse(scannedData).geoLocation.latitude,
                                    longitude: JSON.parse(scannedData).geoLocation.longitude,
                                },
                            }
                        });

                        //@ts-ignore
                        await AsyncStorage.setItem('SCANNED_ITEM', '')
                        await AsyncStorage.setItem(SHIFT_ID, '')
                        setIsClear(true)

                    } catch (e) {
                        alert('Something went wrong, Please try again!');
                    }

                }
                } style={{marginLeft: 'auto'}}>
                    <CtaBtn>Upload Now</CtaBtn>
                </TouchableOpacity>
            </Notification>}
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