import { useTheme } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Text,
    Image,
    Appearance,
    ScrollView,
    ImageBackground,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Button,
} from 'react-native';
import { Formik } from 'formik';
import TextField from '@root/components/TextField';
import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import { LOGIN_SCHEMA } from '@root/screens/public/login/helpers';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { LoginInterface } from 'interfaces/loginInterface';
import navigationStrings from 'navigation/navigationStrings';
import PrimaryButton from 'components/Button';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { returnThemeTypeData } from '@root/utils/theme-type';
import { MainParentWrapper } from '@root/utils/globalStyle';
import ModalManager from '@root/store/global_modal/manager';

const Login = (props: any) => {
    const { login, openModal } = useActions();
    const { loading, error, isAuthenticated } = useTypedSelector(
        (state) => state.auth,
    );
    const [currentRef, setCurrentRef] = useState<any>(null);
    const { theme } = props;
    console.log(theme);

    useEffect(() => {
        if (error !== null) {
            alert(error);
        }
    }, [error]);

    useEffect(() => {
        if (isAuthenticated) {
            props.navigation.replace(navigationStrings.TAB_BAR_HOME);
        }
    }, [isAuthenticated]);

    const handleLogin = (values: LoginInterface) => {
        login(values);
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <MainParentWrapper>
            <BackgroundGlobal>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <MainWrapper>
                        <LogoWrapper
                            style={{
                                marginTop: 90,
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}>
                            <Image
                                source={require('@root/assets/images/login1.png')}
                            />
                        </LogoWrapper>
                        <HeadingText>Login</HeadingText>
                        <SubHeading>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.
                        </SubHeading>
                        <View>
                            <Formik
                                validationSchema={LOGIN_SCHEMA}
                                initialValues={{
                                    userName: '',
                                    password: '',
                                }}
                                onSubmit={(values) => {
                                    handleLogin(values);
                                }}>
                                {({ setFieldValue, handleSubmit, errors }) => (
                                    <View>
                                        <TextField
                                            accessibilityLabel="Email"
                                            onChangeText={(value: any) => {
                                                setFieldValue(
                                                    'userName',
                                                    value,
                                                );
                                            }}
                                            placeholder="email"
                                            icon={returnThemeTypeData({
                                                screenName: 'login',
                                                lightKey:
                                                    'userIconsDarkTextFiled',
                                                darkKey:
                                                    'userIconLightTextField',
                                                appearance: props.theme.type,
                                            })}
                                            keyboardType={'email-address'}
                                            autoCapitalize={'none'}
                                            error={
                                                errors ? errors.userName : null
                                            }
                                        />
                                        <TextField
                                            accessibilityLabel="Password"
                                            onChangeText={(value: any) => {
                                                setFieldValue(
                                                    'password',
                                                    value,
                                                );
                                            }}
                                            placeholder="********"
                                            icon={returnThemeTypeData({
                                                screenName: 'login',
                                                lightKey:
                                                    'lockIconsDarkTextFiled',
                                                darkKey:
                                                    'lockIconsLightTextFiled',
                                                appearance: props.theme.type,
                                            })}
                                            secureTextEntry={true}
                                            error={
                                                errors ? errors.password : null
                                            }
                                        />

                                        <ForgPasswordWrapper>
                                            <ForgPasswordWrapper__Text>
                                                Forgot password?
                                            </ForgPasswordWrapper__Text>
                                        </ForgPasswordWrapper>

                                        <ButtonWrapper>
                                            <PrimaryButton
                                                onPress={handleSubmit}
                                                btnText={'LOGIN'}
                                                loading={loading}
                                            />
                                        </ButtonWrapper>
                                    </View>
                                )}
                            </Formik>
                        </View>

                        <ChangeProfileWrapper>
                            <ChangeProfileWrapper_TextTitle>
                                Previous Title
                            </ChangeProfileWrapper_TextTitle>

                            <ChangeProfileWrapper_TextDescription>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut lab
                            </ChangeProfileWrapper_TextDescription>

                            <ChooseProfileBtnWrapper>
                                <PrimaryButton
                                    heightBT={40}
                                    onPress={() => {
                                        // @ts-ignore
                                        openModal('AccountModalSheet', {
                                            abc: 'hello',
                                            height: '40%',
                                        });
                                    }}
                                    btnText={'Choose Profile'}
                                />
                            </ChooseProfileBtnWrapper>
                        </ChangeProfileWrapper>
                    </MainWrapper>
                </ScrollView>
            </BackgroundGlobal>

            <ModalManager />
        </MainParentWrapper>
    );
};

export default withTheme(Login);

const ChooseProfileBtnWrapper = styled.View`
    height: 45px;
`;

const ChangeProfileWrapper_TextDescription = styled.Text`
    font-size: 14px;
    margin-bottom: 5px;
    color: ${({ theme }: any) => theme.colors.text};
    text-align: center;
`;

const ChangeProfileWrapper_TextTitle = styled.Text`
    font-size: 20px;
    margin-bottom: 5px;
    color: ${({ theme }: any) => theme.colors.text};
`;

const ChangeProfileWrapper = styled.View`
    align-items: center;
    padding: 25px;
    border-radius: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: ${({ theme }: any) => theme.colors.primary};
`;

const ButtonWrapper = styled.View`
    flex: 1;
    margin-top: 25px;
`;

const ForgPasswordWrapper__Text = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: 15px;
`;

const ForgPasswordWrapper = styled.View`
    flex: 1;
    align-items: center;
    margin-top: 15px;
`;

const SubHeading = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
`;

const HeadingText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: 400;
`;

const LogoWrapper = styled.View``;

const MainWrapper = styled.View`
    padding-left: ${({ theme }: any) => theme.spacing.horizontal}px;
    padding-right: ${({ theme }: any) => theme.spacing.horizontal}px;
`;
