import React, {useEffect, useState} from 'react';
import { FlatList } from 'react-native';
import { Appearance } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

import ActionItem from '@root/screens/private/actions/actionItem';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { useIsFocused } from '@react-navigation/native';
import { NotFound, NotFoundWrapper } from '@root/utils/globalStyle';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import {NetworkStateView} from "@root/components/NetworkStateView";
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Actions = (props: any) => {
    let mode = Appearance.getColorScheme();
    const { navigation } = props;
    const { getActions } = useActions();
    const isFocused = useIsFocused();
    const [scannedData, setScannedData] = useState();
    const { orgID } = useTypedSelector((state) => state.auth);
    const { actionsData, loading } = useTypedSelector((state) => state.actions);
    const  netInfo = useNetInfo()

    AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
        // @ts-ignore
        setScannedData(asyncStorageRes)
    }).catch(() => {

    });
    useEffect(() => {
        if (isFocused) {
            getActions({
                'g-org': JSON.stringify(orgID),
                'status': '',
            });
        }
    }, [isFocused]);

    return (
        <BackgroundGlobal>
            <MainFrame>
                {loading ? (
                    <NotFoundWrapper>
                        <NotFound>Loading...</NotFound>
                    </NotFoundWrapper>
                ) : actionsData.length > 0 ? (
                    <FlatList
                        nestedScrollEnabled={true}
                        data={actionsData}
                        renderItem={({ item }) => {
                            return (
                                <ActionItem
                                    item={item}
                                    navigation={navigation}
                                    key={1}
                                    actionTitle={true}
                                />
                            );
                        }}
                    />
                ) : (
                    <NotFound>No Data Found</NotFound>
                )}
            </MainFrame>
            {
                netInfo.isInternetReachable === true && scannedData != null ? (
                    <NetworkStateView/>
                ) : null
            }
        </BackgroundGlobal>
    );
};

const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
`;
