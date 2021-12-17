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

const Tab = createBottomTabNavigator();

function DashboardTabs(props: any) {
    const { colors, type }: any = useTheme();
    const { activeShift } = useTypedSelector((state) => state.activeShift);

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
                                        navigationStrings.ROSTER_CALENDAR,
                                    )
                                }>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={calendarIcon}
                                />
                            </TouchableOpacity>
                        );
                    } else if (route.name === 'SHIFTS') {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    alert('End Shift');
                                }}
                                style={{ padding: 5 }}>
                                <PrimaryButton
                                    onPress={() => endShift()}
                                    btnText={'End Shift'}
                                />
                            </TouchableOpacity>
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
