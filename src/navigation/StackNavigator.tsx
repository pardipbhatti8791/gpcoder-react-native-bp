import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ActionDetail, Login, Patrol, ScanScreen} from './index';
import navigationStrings from '@root/navigation/navigationStrings';
import DashboardTabs from '@root/navigation/Tabbar';
import {useTypedSelector} from 'hooks/useTypedSelector';
import {useTheme} from '@react-navigation/native';
// @ts-ignore
import styled from 'styled-components/native';
import {galleryIcon} from '@root/utils/assets';
import {RosterCalender} from '@root/screens/private/rosters/calendarPicker';
import {TouchableOpacity} from 'react-native';
import {useActions} from '@root/hooks/useActions';
import StartManualShift from "../screens/private/shifts/manualShift";
import AutoShiftStart from "../screens/private/shifts/autoShiftStart";

const Stack = createStackNavigator();

function StackNavigator(props: any) {
    const {colors}: any = useTheme();
    const {isAuthenticated} = useTypedSelector((state) => state.auth);
    const {openModal} = useActions();

    // @ts-ignore
    return (
        <Stack.Navigator
            initialRouteName={
                isAuthenticated
                    ? navigationStrings.TAB_BAR_HOME
                    : navigationStrings.LOGIN
            }>
            <Stack.Screen
                name={navigationStrings.LOGIN}
                component={Login}
                options={{
                    headerShown: false,
                    animationTypeForReplace: isAuthenticated ? 'push' : 'pop',
                }}
            />
            <Stack.Screen
                name={navigationStrings.TAB_BAR_HOME}
                component={DashboardTabs}
                options={{
                    headerShown: false,
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name={navigationStrings.ACTION_DETAILS}
                component={ActionDetail}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.START_MANUAL_SHIFT}
                component={StartManualShift}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />
            <Stack.Screen
                name={navigationStrings.ROSTER_CALENDAR}
                component={RosterCalender}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.QRSCAN}
                component={ScanScreen}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.PATROL}
                component={Patrol}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (props: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });

                                }}>
                                <NavigationBurgerIcon
                                    style={{marginRight: 15}}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.AUTO_SHIFT_START}
                component={AutoShiftStart}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />


        </Stack.Navigator>
    );
}

export default StackNavigator;

const NavigationBurgerIcon = styled.Image`
  margin-left: 16px;
`;
