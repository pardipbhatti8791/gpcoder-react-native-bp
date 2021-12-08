import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

import MainDrawer from '@root/navigation/Drawer';
import { navigationTheme } from 'theme/theme';

type RouteProps = {
    scheme: string | null;
};

const Routes: React.FC<RouteProps> = (props: any) => {
    console.log('props:----', props);
    return (
        <NavigationContainer
            theme={
                props.scheme === 'dark'
                    ? navigationTheme.dark
                    : navigationTheme.light
            }>
            <MainDrawer />
        </NavigationContainer>
    );
};

export default Routes;
