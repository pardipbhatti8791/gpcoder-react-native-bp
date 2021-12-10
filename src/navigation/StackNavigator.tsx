import React, { useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './index';
import navigationStrings from '@root/navigation/navigationStrings';
import DashboardTabs from '@root/navigation/Tabbar';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { getData } from 'storage';
import { Text, View } from 'react-native';
import MainDrawer from 'navigation/Drawer';

const Stack = createStackNavigator();

function StackNavigator() {
    const { isAuthenticated } = useTypedSelector((state) => state.auth);

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
        </Stack.Navigator>
    );
}

export default StackNavigator;
