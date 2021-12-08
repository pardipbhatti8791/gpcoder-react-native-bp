import { useTheme } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    Appearance,
    TouchableOpacity,
    ScrollView,
    ImageBackground,
} from 'react-native';
import TextField from '@root/components/TextField';
import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';

const Login = (props: any) => {
    // Username: bob@guard.com
    // Password: FunF@CTS1
    const { colors } = useTheme();
    const [username, setUsername] = useState('bob@guard.com');
    const [password, setPassword] = useState('FunF@CTS1');
    const [showPassword, setShowPassword] = useState(true);

    // var mode = testMode.mode.type;
    var mode = Appearance.getColorScheme();

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
                        <TextField
                            accessibilityLabel="Email"
                            onChangeText={setUsername}
                            placeholder="email"
                            value={username}
                            icon={require('@root/assets/user/user.png')}
                            keyboardType={'email-address'}
                            autoCapitalize={'none'}
                        />

                        <TextField
                            accessibilityLabel="Password"
                            onChangeText={setPassword}
                            placeholder="********"
                            value={password}
                            icon={require('@root/assets/lock/lock.png')}
                            secureTextEntry={true}
                        />

                        {/* </CardV> */}

                        {/*<ErrorView errors={errors} />*/}
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{ color: '#1C78DE', fontSize: 15 }}>
                                Forgot password?
                            </Text>
                        </View>

                        {/*<Button*/}
                        {/*    onPress={handleSubmit}*/}
                        {/*    style={*/}
                        {/*        mode === 'dark'*/}
                        {/*            ? styles.submitButton*/}
                        {/*            : styles.submitButtonLight*/}
                        {/*    }*/}
                        {/*    title={*/}
                        {/*        isLoading*/}
                        {/*            ? strings.common.loading*/}
                        {/*            : strings.login.button*/}
                        {/*    }*/}
                        {/*/>*/}
                    </View>
                    <View
                        style={
                            mode === 'dark'
                                ? {
                                      alignItems: 'center',
                                      padding: 25,
                                      borderRadius: 10,
                                      backgroundColor: '#19212c',
                                      marginTop: 30,
                                  }
                                : {
                                      alignItems: 'center',
                                      padding: 25,
                                      borderRadius: 10,
                                      borderWidth: 0.5,
                                      borderColor: '#545458a7',
                                      backgroundColor: '#E3E1EE',
                                      marginTop: 30,
                                  }
                        }>
                        <Image
                            source={require('@root/assets/images/user.png')}
                        />
                        <Text
                            style={{
                                color: colors.text,
                                fontSize: 20,
                                marginBottom: 5,
                            }}>
                            Prevous Login
                        </Text>

                        <Text
                            style={{
                                color: colors.text,
                                textAlign: 'center',
                                marginBottom: 10,
                            }}>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry.{' '}
                        </Text>
                        {/*<Button*/}
                        {/*    title="Choose Profile"*/}
                        {/*    style={*/}
                        {/*        mode === 'dark'*/}
                        {/*            ? { backgroundColor: '#1c78de' }*/}
                        {/*            : { backgroundColor: '#22376C' }*/}
                        {/*    }*/}
                        {/*    onPress={() => alert('Opening')}*/}
                        {/*/>*/}
                    </View>
                </MainWrapper>
            </ScrollView>
        </ImageBackground>
    );
};

export default withTheme(Login);

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
