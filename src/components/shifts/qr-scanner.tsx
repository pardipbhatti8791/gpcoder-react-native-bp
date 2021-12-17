import React, { Component, useEffect, useState } from 'react';

import { Linking } from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
// @ts-ignore
import styled from 'styled-components/native';
import { getUserLocation } from '../../utils/common-methods';
import { useActions } from '../../hooks/useActions';
import { NotFound, NotFoundWrapper } from '../../utils/globalStyle';
import { useTypedSelector } from '../../hooks/useTypedSelector';

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
        if (scannedData) {
            if (Object.keys(e).length > 0) {
                setScannedData(false);
                try {
                    await setScannedCheckPointsEntries({
                        orgID: orgID,
                        item: {
                            shiftID: data && data.activeShift.shiftID,
                            checkpointCode:
                                'F9449EFC-4B1E-4FA9-9BE2-2A26605F3E7C',
                            scannedDateTime: new Date(),
                            geoLocation: {
                                latitude: location.latitude,
                                longitude: location.longitude,
                            },
                        },
                    });
                    alert('Scanned Success!');
                    props.navigation.goBack();
                } catch (e) {
                    alert('Something went wrong, Please try again!');
                }
            }
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
