import React from 'react';
import { DrawerItem } from '@react-navigation/drawer';
// @ts-ignore
import styled from 'styled-components/native';

import { useDrawer } from './drawer-config';
import { useTheme } from '@react-navigation/native';
import { TouchableOpacity, SafeAreaView } from 'react-native';

function CustomDrawer(props: any) {
    const { routesConfig } = useDrawer();
    const { colors }: any = useTheme();
    return (
        <DrawerWrapper backgroundColor={colors.secondary}>
            <DrawerThreeSection>
                <HeaderWrapper>
                    <ImageWrapper>
                        <ImageContent
                            source={require('../assets/user/user.png')}
                        />
                    </ImageWrapper>
                    <HeadingWrapper>
                        <HeadingWrapper__Content>
                            <HeadingWrapper__Content__Title
                                textColor={colors.accentColor}>
                                Rodi
                            </HeadingWrapper__Content__Title>
                            <HeadingWrapper__Content__Status
                                textColor={colors.text}>
                                Unmarried
                            </HeadingWrapper__Content__Status>
                        </HeadingWrapper__Content>
                        <HeadingWrapper__RightArrow>
                            <HeadingWrapper__RightArrow_ImageContent
                                source={require('../assets/rightArrowWhite/rightArrow.png')}
                            />
                        </HeadingWrapper__RightArrow>
                    </HeadingWrapper>
                </HeaderWrapper>
            </DrawerThreeSection>

            <DrawerFirstSection>
                {routesConfig.map((item, i) => {
                    return (
                        <DrawerItem
                            key={i}
                            label={item?.label}
                            labelStyle={{
                                color: colors.text,
                            }}
                            onPress={() => props.navigation.navigate(item?.url)}
                        />
                    );
                })}
            </DrawerFirstSection>
            <DrawerSecondSection>
                <TouchableOpacity onPress={() => alert('Exited')}>
                    <LogoutText textColor={colors.text}>Logout</LogoutText>
                </TouchableOpacity>
            </DrawerSecondSection>
        </DrawerWrapper>
    );
}

export default CustomDrawer;

type DrawerWrapperProps = {
    backgroundColor: string;
};

type TextColorProps = {
    textColor: string;
};

const HeaderWrapper = styled.View`
    flex-direction: row;
    margin-top: 50px;
    align-items: center;
`;

const ImageWrapper = styled.View`
    width: 60px;
    height: 60px;
    background-color: wheat;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;
const ImageContent = styled.Image``;
const HeadingWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
`;
const HeadingWrapper__Content = styled.View`
    flex-direction: column;
`;
const HeadingWrapper__Content__Title = styled.Text<TextColorProps>`
    font-size: 20px;
    font-weight: 400;
    color: ${({ textColor }: any) => textColor};
`;
const HeadingWrapper__Content__Status = styled.Text<TextColorProps>`
    color: ${({ textColor }: any) => textColor};
    font-weight: 400;
    font-size: 15px;
`;
const HeadingWrapper__RightArrow = styled.View`
    margin-right: 20px;
`;
const HeadingWrapper__RightArrow_ImageContent = styled.Image`
    width: 10px;
    height: 15px;
`;

const LogoutText = styled.Text<TextColorProps>`
    color: ${({ textColor }: any) => textColor};
`;

const DrawerWrapper = styled.View<DrawerWrapperProps>`
    flex: 1;
    background-color: ${({ backgroundColor }: any) => backgroundColor};
`;
const DrawerFirstSection = styled.View`
    flex: 0.8;
    margin-top: 75px;
    margin-left: 32px;
`;
const DrawerSecondSection = styled.View`
    flex: 0.1;
    margin-left: 32px;
`;
const DrawerThreeSection = styled.View`
    flex: 0.1;
    margin-left: 32px;
`;
