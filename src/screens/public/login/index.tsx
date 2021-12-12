import { useTheme } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    Appearance,
    ScrollView,
    ImageBackground,
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

const Login = (props: any) => {
    const { login } = useActions();
    const { loading, error, isAuthenticated } = useTypedSelector(
        (state) => state.auth,
    );

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

    const { colors } = useTheme();

    // var mode = testMode.mode.type;
    let mode = Appearance.getColorScheme();

    const handleLogin = (values: LoginInterface) => {
        login(values);
    };

    return (
        <ImageBackground
            resizeMode={'stretch'} // or cover
            style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
            source={
                mode === 'light'
                    ? require('@root/assets/loginbackground/login.png')
                    : require('@root/assets/loginLight/loginLight.png')
            }>
            <ScrollView>
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
                        typesetting industry.{' '}
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
                                            setFieldValue('userName', value);
                                        }}
                                        placeholder="email"
                                        icon={require('@root/assets/user/user.png')}
                                        keyboardType={'email-address'}
                                        autoCapitalize={'none'}
                                        error={errors ? errors.userName : null}
                                    />
                                    <TextField
                                        accessibilityLabel="Password"
                                        onChangeText={(value: any) => {
                                            setFieldValue('password', value);
                                        }}
                                        placeholder="********"
                                        icon={require('@root/assets/lock/lock.png')}
                                        secureTextEntry={true}
                                        error={errors ? errors.password : null}
                                    />

                                    {/* </CardV> */}

                                    {/*<ErrorView errors={errors} />*/}
                                    <ForgPasswordWrapper>
                                        <ForgPasswordWrapper__Text>
                                            Forgot password?
                                        </ForgPasswordWrapper__Text>
                                    </ForgPasswordWrapper>

                                    <ButtonWrapper>
                                        <PrimaryButton
                                            onPress={handleSubmit}
                                            btnText={'LOGIN'}
                                        />
                                    </ButtonWrapper>
                                </View>
                            )}
                        </Formik>
                    </View>
                </MainWrapper>
            </ScrollView>
        </ImageBackground>
    );
};

export default withTheme(Login);

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
