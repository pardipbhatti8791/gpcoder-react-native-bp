import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
// @ts-ignore
import styled from 'styled-components/native';

import { useDrawer } from './drawer-config';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { clearAll } from 'storage';
import { useActions } from 'hooks/useActions';
import navigationStrings from 'navigation/navigationStrings';
import { persistor } from '../store';
import ListCard from '@root/components/ListCard';

function CustomDrawer(props: any) {
    const { routesConfig } = useDrawer();
    const { colors }: any = useTheme();
    const { setAuthentication } = useActions();

    const logout = async () => {
        await clearAll();
        await persistor.flush();
        await persistor.purge();
        setAuthentication(false);
        props.navigation.navigate(navigationStrings.LOGIN);
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
            <DrawerWrapper backgroundColor={colors.secondary}>
                <ListCard />

                <DrawerFirstSection>
                    {routesConfig.map((item, i) => {
                        return (
                            <DrawerItem
                                key={i}
                                label={item?.label}
                                labelStyle={{
                                    color: colors.text,
                                }}
                                onPress={() =>
                                    props.navigation.navigate(item?.url)
                                }
                            />
                        );
                    })}
                </DrawerFirstSection>
                <DrawerSecondSection>
                    <TouchableOpacity onPress={() => logout()}>
                        <LogoutText textColor={colors.text}>Logout</LogoutText>
                    </TouchableOpacity>
                </DrawerSecondSection>
            </DrawerWrapper>
        </SafeAreaView>
    );
}

export default CustomDrawer;

type DrawerWrapperProps = {
    backgroundColor: string;
};

type TextColorProps = {
    textColor: string;
};


const LogoutText = styled.Text<TextColorProps>`
    color: ${({ textColor }: any) => textColor};
`;

const DrawerWrapper = styled.View<DrawerWrapperProps>`
    flex: 1;
    background-color: ${({ backgroundColor }: any) => backgroundColor};
  margin-top: 30px;
`;
const DrawerFirstSection = styled.View`
    flex: 0.8;
    margin-top: 75px;
`;
const DrawerSecondSection = styled.View`
    flex: 0.1;
    margin-left: 16px;
`;
const DrawerThreeSection = styled.View`
    flex: 0.1;
    margin-left: 32px;
`;
