import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import {

    TouchableOpacity,

} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

import { Home, Rosters, Shifts, Actions, Messages } from './index';
import navigationStrings from './navigationStrings';
import { TabBarIcon } from './TabbarIcon';
import { navigaionIcon } from '@root/utils/assets';

const Tab = createBottomTabNavigator();

function DashboardTabs(props: any) {
    const { colors, type }: any = useTheme();

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
