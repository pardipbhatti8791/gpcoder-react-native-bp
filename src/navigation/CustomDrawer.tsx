import React, {useEffect, useState} from 'react';
import {DrawerItem} from '@react-navigation/drawer';
// @ts-ignore
import styled from 'styled-components/native';
import {useDrawer} from './drawer-config';
import {useTheme} from '@react-navigation/native';
import {Image, SafeAreaView, Text, TouchableOpacity} from 'react-native';
import {clearAll} from 'storage';
import {useActions} from 'hooks/useActions';
import navigationStrings from 'navigation/navigationStrings';
import {persistor} from '@root/store';
import ListCard from '@root/components/ListCard';
import {Switch} from 'react-native'
import {withTheme} from "styled-components";

function CustomDrawer(props: any) {
    const {routesConfig} = useDrawer();
    const {colors}: any = useTheme();
    const {setAuthentication} = useActions();
    const [on, setOn] = useState();

    const logout = async () => {
        await clearAll();
        await persistor.flush();
        await persistor.purge();
        setAuthentication(false);
        props.navigation.navigate(navigationStrings.LOGIN);
    };


    // @ts-ignore
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.secondary}}>
            <DrawerWrapper backgroundColor={colors.secondary}>
                <ListCard/>
                <Divider backgroundColor={colors.divider}/>

                <SwitchHorizontalWrapper>
                    <TextImageWrapper>
                        <Image
                            source={require('@root/assets/bellIcon/bellIcon.png')}
                        />
                        <TextWrapper textColor={colors.text} >
                            Notifications
                        </TextWrapper>


                    </TextImageWrapper>

                    <Switch
                        renderActiveText={false}
                        renderInActiveText={false}
                    />

                </SwitchHorizontalWrapper>
                <Divider backgroundColor={colors.divider}/>
                <SwitchHorizontalWrapper>
                    <TextImageWrapper>
                        <Image
                            source={require('@root/assets/setting/setting.png')}
                        />
                        <TextWrapper textColor={colors.text}>
                            Setting
                        </TextWrapper>


                    </TextImageWrapper>


                </SwitchHorizontalWrapper>
                <Divider backgroundColor={colors.divider}/>
                <AccountOrgWrapper>
                    <TextWrapper textColor={colors.text}>
                        Accounts and Orgs
                    </TextWrapper>
                </AccountOrgWrapper>

                <VerticalWrapper>
                <SwitchHorizontalWrapper>
                    <Image
                        source={require('@root/assets/setting/setting.png')}
                    />

                    <VerticalWrapper >
                        <TextWrapper textColor={colors.text}>Bob</TextWrapper>
                        <TextWrapper textColor={colors.text}>bob@guard.com</TextWrapper>
                    </VerticalWrapper>

                    <Image
                        source={require('@root/assets/setting/setting.png')}
                    />
                </SwitchHorizontalWrapper>
                    <Divider backgroundColor={colors.divider}/>
                </VerticalWrapper>


                <DrawerSecondSection>
                    <TouchableOpacity onPress={() => logout()}>
                        <LogoutText textColor={colors.text}>Logout</LogoutText>
                    </TouchableOpacity>
                </DrawerSecondSection>

                <DrawerSecondSection>
                    <VersionText textColor={colors.text}>V 1.0.2</VersionText>
                </DrawerSecondSection>
            </DrawerWrapper>
        </SafeAreaView>
    );
}

export default withTheme(CustomDrawer);


type DrawerWrapperProps = {
    backgroundColor: string;
};

type TextColorProps = {
    textColor: string;

};



const VerticalWrapper = styled.View`
  
`;

const AccountOrgWrapper = styled.View`
  background-color: #1F2732;
  padding: 16px;
  
`;

const TextImageWrapper = styled.View`
  display: flex;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 2px;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

const TextWrapper = styled.Text<TextColorProps>`
  color: ${({textColor}: any) => textColor};
  font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
  margin-left: 16px;
`;

const SwitchHorizontalWrapper = styled.View`
  flex-direction: row;
  margin: 10px 16px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const Divider = styled.View<DrawerWrapperProps>`
  height: 1px;
  margin-left: 40px;
  background-color: ${({backgroundColor}: any) => backgroundColor};
`;

const VersionText = styled.Text<TextColorProps>`
  color: ${({textColor}: any) => textColor};
  font-size: 16px;
`;

const LogoutText = styled.Text<TextColorProps>`
  color: ${({textColor}: any) => textColor};
`;

const DrawerWrapper = styled.View<DrawerWrapperProps>`
  flex: 1;
  background-color: ${({backgroundColor}: any) => backgroundColor};
  margin-top: 30px;
`;
const DrawerFirstSection = styled.View`
  flex: 0.8;
  margin-top: 75px;
`;
const DrawerSecondSection = styled.View`
  flex: 0.1;
  margin-left: 16px;
  margin-top: 16px;
`;
const DrawerThreeSection = styled.View`
  flex: 0.1;
  margin-left: 32px;
`;
