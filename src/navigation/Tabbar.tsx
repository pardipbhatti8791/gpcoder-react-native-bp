import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

import { Home, Rosters, Shifts, Actions, Messages } from './index';
import navigationStrings from './navigationStrings';
import { TabBarIcon } from './TabbarIcon';
import { calendarIcon, navigaionIcon } from '@root/utils/assets';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import PrimaryButton from '@root/components/Button';
import { useActions } from '../hooks/useActions';
import { getUserLocation } from '../utils/common-methods';

const Tab = createBottomTabNavigator();

function DashboardTabs(props: any) {
    const { colors, type }: any = useTheme();
    const { endShiftAction, getActiveShift } = useActions();
    const { isActiveShift } = useTypedSelector((state) => state.activeShift);
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const { endShiftLoading } = useTypedSelector((state) => state.shiftReports);

    const endShift = () => {};

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => (
                    <TabBarIcon color={color} routeName={route.name} />
                ),
                tabBarStyle: { backgroundColor: colors.secondary },
                tabBarActiveTintColor: colors.accentColor,
                tabBarInactiveTintColor: colors.inactive,
                headerStyle: {
                    backgroundColor: colors.secondary,
                },
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => props.navigation.openDrawer()}>
                        <NavigationBurgerIcon
                            source={
                                type === 'dark' ? navigaionIcon : navigaionIcon
                            }
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => {
                    if (route.name === 'ROSTER') {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.navigate(
                                        navigationStrings.ROSTER_CALENDAR,{ navigation:props.navigation}
                                    )
                                }>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={calendarIcon}
                                />
                            </TouchableOpacity>
                        );
                    } else if (route.name === 'SHIFTS' && isActiveShift) {
                        return (
                            <BtnWrapper>
                                <PrimaryButton
                                    heightBT={38}
                                    onPress={async () => {
                                        try {
                                            const uLocationData: any =
                                                await getUserLocation();
                                            await endShiftAction({
                                                orgID: orgID,
                                                item: {
                                                    latitude:
                                                        uLocationData.latitude,
                                                    longitude:
                                                        uLocationData.longitude,
                                                },
                                            });


                                            getActiveShift({ orgID: orgID });
                                        } catch (e) {
                                            alert(
                                                'Please enable the location from settings!',
                                            );
                                        }
                                    }}
                                    btnText={
                                        endShiftLoading
                                            ? 'Ending...'
                                            : 'End Shift'
                                    }
                                />
                            </BtnWrapper>
                        );
                    }
                },
            })}>
            <Tab.Screen
                name={navigationStrings.TAB_BAR_HOME}
                component={Home}
            />

            <Tab.Screen
                name={navigationStrings.TAB_BAR_ROSTERS}
                component={Rosters}
            />

            <Tab.Screen
                name={navigationStrings.TAB_BAR_SHIFTS}
                component={Shifts}
            />
            <Tab.Screen
                name={navigationStrings.TAB_BAR_ACTIONS}
                component={Actions}
            />
            <Tab.Screen
                name={navigationStrings.TAB_BAR_MESSAGES}
                component={Messages}
            />
        </Tab.Navigator>
    );
}

export default DashboardTabs;

const NavigationBurgerIcon = styled.Image`
    margin-left: 16px;
`;

const BtnWrapper = styled.View`
    margin: 8px;
`;
