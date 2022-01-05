import React, { Component, useEffect, useState } from 'react';

import { Linking } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
// @ts-ignore
import styled from 'styled-components/native';
import { getUserLocation } from '@root/utils/common-methods';
import { useActions } from '@root/hooks/useActions';
import { NotFound, NotFoundWrapper } from '../../utils/globalStyle';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CHECKPOINT_ID,SHIFT_ID,LATITUDE,LONGITUDE,CURRENT_TIME} from "@root/utils/constants";

type LocationProps = {
    latitude: number;
    longitude: number;
};

const ScanScreen = (props: any) => {
    const { setScannedCheckPointsEntries } = useActions();
    const [scannedData, setScannedData] = useState<boolean>(true);
    const [location, setLocation] = useState<LocationProps>({
        latitude: 0,
        longitude: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const data = useTypedSelector((state) => state.activeShift);
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const netInfo = useNetInfo();

    useEffect(() => {
        getUserCurrentLocation();
    }, []);

    const getUserCurrentLocation = async () => {
        setLoading(true);
        try {
            const data: any = await getUserLocation();
            setLocation({
                latitude: data.latitude,
                longitude: data.longitude,
            });
        } catch (e) {
            alert('You need to enable location from your settings!');
            props.navigation.goBack();
        }

        setLoading(false);
    };

    const onSuccess = async (e: any) => {
        if (netInfo.isInternetReachable===true)
        {
            if (scannedData) {
                if (Object.keys(e).length > 0) {
                    setScannedData(false);
                    try {
                        await setScannedCheckPointsEntries({
                            orgID: orgID,
                            item: {
                                shiftID: data && data.activeShift.shiftID,
                                checkpointCode:
                                    e.data.substr(7),
                                scannedDateTime: new Date(),
                                geoLocation: {
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                },
                            },
                        });
                        alert('Scanned Success!');

                    } catch (e) {
                        alert('Something went wrong, Please try again!');
                    }

                }
            }
        } else {
            AsyncStorage.setItem('SCANNED_ITEM',JSON.stringify({
                shiftID: data && data.activeShift.shiftID,
                checkpointCode:
                    e.data.substr(7),
                scannedDateTime: new Date(),
                geoLocation: {
                    latitude: location.latitude,
                    longitude: location.longitude,
                },
            }))
            alert('Internet not reachable...')
            props.navigation.goBack();
        }

    };

    return (
        <QRWrapper>
            {loading ? (
                <NotFoundWrapper>
                    <NotFound>Fetching your current location!</NotFound>
                </NotFoundWrapper>
            ) : (
                <QRCodeScanner
                    onRead={onSuccess}
                    reactivate={true}
                    showMarker={true}
                />
            )}
        </QRWrapper>
    );
};

export default ScanScreen;

const QRWrapper = styled.View`
    height: 100%;
    width: 100%;
`;
