import React, { useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from './index';
import navigationStrings from '@root/navigation/navigationStrings';
import DashboardTabs from '@root/navigation/Tabbar';

const Stack = createStackNavigator();

function StackNavigator() {
    const [auth] = useState(false);

    return (
        <Stack.Navigator initialRouteName={navigationStrings.LOGIN}>
            <Stack.Screen
                name={navigationStrings.LOGIN}
                component={Login}
                options={{
                    headerShown: false,
                    animationTypeForReplace: auth ? 'push' : 'pop',
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
