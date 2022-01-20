import React, {useEffect, useState} from 'react';
import {DrawerItem} from '@react-navigation/drawer';
// @ts-ignore
import styled from 'styled-components/native';
import {useDrawer} from './drawer-config';
import {useTheme} from '@react-navigation/native';
import {Appearance, Image, Modal, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import {clearAll} from 'storage';
import {useActions} from 'hooks/useActions';
import navigationStrings from 'navigation/navigationStrings';
import {persistor} from '@root/store';
import ListCard from '@root/components/ListCard';
import {Switch} from 'react-native'
import {withTheme} from "styled-components";
import {useTypedSelector} from "../hooks/useTypedSelector";

function CustomDrawer(props: any) {
    const {colors}: any = useTheme();
    const {setAuthentication, getMode} =useActions();
    const {modeState} = useTypedSelector((state) => state.mode);
    const [theme, setTheme] =useState<any>(modeState);

    const toggleRememberPin = (value) => {
        setTheme(value);
    };

    useEffect(() => {
          getMode({mode:theme});

    },[theme])

    const logout = async () => {
        await clearAll();
        await persistor.flush();
        await persistor.purge();
        setAuthentication(false);
        props.navigation.reset({
            index: 0,
            routes: [{name: navigationStrings.LOGIN}],
        });
    };


    // @ts-ignore
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: colors.secondary}}>
            <ScrollView>
                <DrawerWrapper backgroundColor={colors.secondary}>
                    <ListCard/>
                    <Divider backgroundColor={colors.divider}/>
                    <SwitchHorizontalWrapper>
                        <TextImageWrapper>
                            <Image
                                source={require('@root/assets/bellIcon/bellIcon.png')}
                            />
                            <TextWrapper textColor={colors.text}>
                                Notifications
                            </TextWrapper>


                        </TextImageWrapper>

                        <Switch
                            onValueChange={toggleRememberPin}
                            renderActiveText={false}
                            value={theme}
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
                                source={require('@root/assets/changeaccount/changeaccount.png')}
                            />

                            <VerticalWrapper>
                                <TextWrapper textColor={colors.text}>Bob</TextWrapper>
                                <TextWrapper textColor={colors.text}>bob@guard.com</TextWrapper>
                            </VerticalWrapper>

                            <Image
                                source={require('@root/assets/checkbox/checkbox.native.png')}
                            />
                        </SwitchHorizontalWrapper>
                        <Divider backgroundColor={colors.divider}/>


                        <SwitchHorizontalWrapper>
                            <TouchableOpacity onPress={() => {
                                props.navigation.closeDrawer()
                                    // ,setVisible(true)
                            }}>
                                <TextImageWrapper>
                                    <Image
                                        source={require('@root/assets/addWhite/addWhite.png')}
                                    />
                                    <TextWrapper textColor={colors.text}>
                                        Add Account
                                    </TextWrapper>
                                </TextImageWrapper>
                            </TouchableOpacity>
                        </SwitchHorizontalWrapper>


                    </VerticalWrapper>


                    <DrawerSecondSection>
                        <TouchableOpacity onPress={() => {
                            logout(),
                                props.navigation.closeDrawer()
                        }}>
                            <LogoutText textColor={colors.text}>Logout</LogoutText>
                        </TouchableOpacity>
                    </DrawerSecondSection>

                    <DrawerSecondSection>
                        <VersionText textColor={colors.text}>V1.0.4</VersionText>
                    </DrawerSecondSection>
                </DrawerWrapper>

            </ScrollView>

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
  font-size: ${({theme}: any) => theme.fontSize.cardTitle};
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
