import React, {useEffect, useState} from 'react';
import {TouchableOpacity, Text, FlatList} from 'react-native';

// @ts-ignore
import styled from 'styled-components/native';
import {withTheme} from 'styled-components';
import {MainParentWrapper, NotFound} from '@root/utils/globalStyle';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import {useIsFocused} from '@react-navigation/native';
import {useActions} from '@root/hooks/useActions';
import {useTypedSelector} from '@root/hooks/useTypedSelector';
import ModalManager from '@root/store/global_modal/manager';
import CaseActiveShiftItem from './case-active-shift-item';
import CaseScannedShiftItem from './case-scanned-shift-item';
import {FloatingAction} from "react-native-floating-action";
import {actionsButtonIcons} from "../../utils/common-methods";
import {navigationRef} from "../../navigation/RootNavigation";
import navigationStrings from "../../navigation/navigationStrings";
import {NetworkStateView} from "../NetworkStateView";
import {useNetInfo} from "@react-native-community/netinfo";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CaseActiveShiftProps = {
    item: any;
};
const CaseActiveShift: React.FC<CaseActiveShiftProps> = ({item}) => {
    const [tab, setTab] = useState<string>('1');
    const {getShiftsReportsEntries, getShiftsCheckPointsEntries,closeModal} =
        useActions();
    const {shiftReportData, shiftReportLoading} = useTypedSelector(
        (state) => state.shiftReports,
    );
    const {shiftCheckpointsData, shiftCheckoutLoading} = useTypedSelector(
        (state) => state.checkpoints,
    );
    const {modalProps} = useTypedSelector(state => state.modalSheet)
    const isFocused = useIsFocused();
    const netInfo = useNetInfo();
    const [scannedData, setScannedData] = useState();

    AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
        // @ts-ignore
        setScannedData(asyncStorageRes)
    }).catch(() => {

    });
    useEffect(() => {
        if (isFocused) {
            if (modalProps !== null) {
                closeModal()
            }
            getShiftsReportsEntries({id: item.shiftID});
        }
    }, [isFocused]);

    // @ts-ignore
    return (
        <MainParentWrapper>
            <BackgroundGlobal>
                <TabHorizontal>
                    <TouchableOpacity
                        onPress={() => {
                            setTab('1');
                            getShiftsReportsEntries({id: item.shiftID});
                        }}
                        style={{width: '50%'}}>
                        <Tabs
                            style={[
                                tab === '1'
                                    ? {backgroundColor: '#F18122'}
                                    : {backgroundColor: '#28303D'},
                            ]}>
                            <Text
                                style={[
                                    tab === '1'
                                        ? {color: '#000000'}
                                        : {color: '#FFFFFF'},
                                    {textAlign: 'center'},
                                ]}>
                                Shift Report Entries
                            </Text>
                        </Tabs>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            setTab('2');
                            getShiftsCheckPointsEntries({id: item.shiftID});
                        }}
                        style={{width: '50%'}}>
                        <Tabs
                            style={
                                tab === '2'
                                    ? {backgroundColor: '#F18122'}
                                    : {backgroundColor: '#28303D'}
                            }>
                            <Text
                                style={[
                                    tab === '1'
                                        ? {color: '#FFFFFF'}
                                        : {color: '#000000'},
                                    {textAlign: 'center'},
                                ]}>
                                Scanned Checkpoints
                            </Text>
                        </Tabs>
                    </TouchableOpacity>
                </TabHorizontal>
                {tab === '1' && (
                    <MainWrapper>
                        {shiftReportLoading ? (
                            <NotFound>Loading...</NotFound>
                        ) : (
                            <CaseActiveShiftItem
                                shiftItem={item}
                                shiftReportData={shiftReportData}
                            />
                        )}
                    </MainWrapper>
                )}

                {tab === '2' && (
                    <MainWrapper>
                        {shiftCheckoutLoading ? (
                            <NotFound>Loading...</NotFound>
                        ) : (
                            <FlatList
                                data={shiftCheckpointsData}
                                renderItem={({item}) => {
                                    return (
                                        <CaseScannedShiftItem
                                            checkpoint={item.checkpoint}
                                            checkpointID={item.checkpointID}
                                            scannedDateTime={
                                                item.scannedDateTime
                                            }
                                        />
                                    );
                                }}
                            />
                        )}


                    </MainWrapper>
                )}
            </BackgroundGlobal>
            <ModalManager/>

            <FloatingAction
                actions={actionsButtonIcons}
                onPressItem={(name) => {
                    navigationRef.current.navigate(navigationStrings.QRSCAN)
                }}
                overlayColor={'rgba(255, 255, 255, 0)'}
                color={'#16a086'}
            />

            {
                netInfo.isInternetReachable === true && scannedData != null ? (
                    <NetworkStateView/>
                ) : null
            }
        </MainParentWrapper>
    );
};

// @ts-ignore
export default withTheme(CaseActiveShift);

const MainWrapper = styled.View`
  flex: 1;
  padding-left: 16px;
  padding-right: 16px;
  margin-top: 32px;
`;

const TabHorizontal = styled.View`
  margin: 20px auto 0 auto;
  display: flex;
  width: 75%;
  height: 50px;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  background-color: #28303d;
`;

const Tabs = styled.View`
  padding-left: 15px;
  padding-right: 15px;
  height: 50px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #28303d;
`;
