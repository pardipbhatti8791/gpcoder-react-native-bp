import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from '@root/navigation/StackNavigator';
import { WINDOW_DEVICE_HEIGHT } from '@root/utils/constants';
import { Image } from 'react-native';
import CustomDrawer from '@root/navigation/CustomDrawer';
import { useTheme } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function MainDrawer() {
    const { colors }: any = useTheme();

    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerContentContainerStyle: {
                    height: WINDOW_DEVICE_HEIGHT,
                },
                drawerActiveTintColor: 'white',
                drawerActiveBackgroundColor: 'transparent',
            }}>
            <Drawer.Screen name="Profile" component={StackNavigator} />
        </Drawer.Navigator>
    );
}

export default MainDrawer;
