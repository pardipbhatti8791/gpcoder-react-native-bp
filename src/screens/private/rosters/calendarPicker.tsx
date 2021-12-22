import React, {useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';

import BackgroundGlobal from '@root/components/BackgroundGlobal';
import {useTypedSelector} from '@root/hooks/useTypedSelector';
import HomeRosters from '@root/components/rosters/HomeRosters';
import {MainParentWrapper, NotFound} from '../../../utils/globalStyle';
import {apiUri} from '@root/service/apiEndPoints';
import {format} from 'date-fns';
import {useActions} from '@root/hooks/useActions';
import ModalManager from '@root/store/global_modal/manager';
import {navigationRef} from "../../../navigation/RootNavigation";



// @ts-ignore
export function RosterCalender (props:any) {
    const isFocused = useIsFocused();
    const {getRosters} = useActions();

    const {rosterData, roasterLoading} = useTypedSelector(
        (state) => state.rostersByDays,
    );

    useEffect(() => {
        if (isFocused) {
            getRosters({
                uri: `${apiUri.shifts.shiftsByDay}` + format(new Date(), 'd'),
            });
        }
    }, [isFocused]);

    // @ts-ignore
    const onDateChange = (date) => {
        getRosters({
            uri: `${apiUri.shifts.shiftsByDay}` + format(new Date(date), 'd'),
        });
    };

    return (
        <MainParentWrapper>
            <BackgroundGlobal>
                <View style={{marginTop: 16, marginHorizontal: 8}}>
                    <CalendarPicker
                        style={{backgroundColor: '#19212C'}}
                        startFromMonday={true}
                        allowRangeSelection={false}
                        minDate={new Date(2018, 1, 1)}
                        maxDate={new Date(2050, 6, 3)}
                        weekdays={[
                            'Mon',
                            'Tue',
                            'Wed',
                            'Thur',
                            'Fri',
                            'Sat',
                            'Sun',
                        ]}
                        months={[
                            'January',
                            'Febraury',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ]}
                        previousTitle="Previous"
                        nextTitle="Next"
                        todayBackgroundColor="#808080"
                        selectedDayColor="#F18122"
                        selectedDayTextColor="#000000"
                        scaleFactor={375}
                        textStyle={{
                            fontFamily: 'Cochin',
                            color: '#FFFFFF',
                        }}
                        onDateChange={onDateChange}
                    />
                    <View>

                        {roasterLoading ? (
                            <NotFound>Loading...</NotFound>
                        ) : rosterData.length > 0 ? (
                            <FlatList
                                nestedScrollEnabled={true}
                                data={rosterData}
                                renderItem={({item}) => {
                                    return <HomeRosters item={item} navigation={props.navigation} />;
                                }}
                            />


                        ) : (
                            <NotFound>No Rosters Data Found</NotFound>
                        )}
                    </View>
                </View>
            </BackgroundGlobal>
            <ModalManager/>
        </MainParentWrapper>
    );
}
