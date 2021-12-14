import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActionDetail, Login } from './index';
import navigationStrings from '@root/navigation/navigationStrings';
import DashboardTabs from '@root/navigation/Tabbar';
import { useTypedSelector } from 'hooks/useTypedSelector';
import {useTheme} from "@react-navigation/native";

const Stack = createStackNavigator();

function StackNavigator() {
    const { colors }: any = useTheme();
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
            <Stack.Screen
                name={navigationStrings.ACTION_DETAILS}
                component={ActionDetail}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text
                    }
                }}

            />
        </Stack.Navigator>
    );
}

export default StackNavigator;
