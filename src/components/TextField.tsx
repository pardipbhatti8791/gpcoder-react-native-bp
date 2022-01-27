import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import { returnThemeTypeData } from '../utils/theme-type';

type TextFieldProps = {
    onChangeText: Function;
    placeholder?: string;
    value?: string;
    icon?: string | null;
    accessibilityLabel?: string;
    secureTextEntry?: boolean;
    keyboardType?: string;
    autoCapitalize?: string;
    error?: string | null;
    theme?: any;
    multiline?: boolean;
    style?: any;
};

const TextField: React.FC<TextFieldProps> = ({
    placeholder,
    icon = null,
    accessibilityLabel,
    secureTextEntry = false,
    keyboardType = 'default',
    onChangeText,
    autoCapitalize = 'sentences',
    error = null,
    theme,
    multiline = false,
    style = {},
    ...rest
}) => {
    const [showSecureEntry, setShowSecureEntry] = useState(false);

    return (
        <TextFieldWrapper>
            {accessibilityLabel !== undefined && (
                <TextInputLabelWrapper>
                    <TextInputLabelWrapper__Content>
                        {accessibilityLabel}
                    </TextInputLabelWrapper__Content>
                </TextInputLabelWrapper>
            )}

            <Horizontal>
                {icon !== null && <Image source={icon} />}
                <TextInputField
                    onChangeText={onChangeText}
                    secureTextEntry={showSecureEntry ? false : secureTextEntry}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    multiline={multiline}
                    style={style}
                    {...rest}
                />

                {secureTextEntry && (
                    <SecureEntryIcon>
                        <TouchableOpacity
                            onPress={() =>
                                setShowSecureEntry(!showSecureEntry)
                            }>
                            <Image
                                style={{ height: 17, width: 24 }}
                                source={
                                    showSecureEntry === true
                                        ? returnThemeTypeData({
                                              screenName: 'login',
                                              lightKey: 'eyeCloseDarkIcon',
                                              darkKey: 'eyeCloseLightIcon',
                                              appearance: theme.type,
                                          })
                                        : returnThemeTypeData({
                                              screenName: 'login',
                                              lightKey: 'eyeOpenDarkIcon',
                                              darkKey: 'eyeOpenLightIcon',
                                              appearance: theme.type,
                                          })
                                }
                            />
                        </TouchableOpacity>
                    </SecureEntryIcon>
                )}
            </Horizontal>
            {error !== null && (
                <ErrorWrapper>
                    <ErrorWrapper__Text>{error}</ErrorWrapper__Text>
                </ErrorWrapper>
            )}
        </TextFieldWrapper>
    );
};

// @ts-ignore
export default withTheme(TextField);

const ErrorWrapper = styled.View`
    margin-top: 3px;
    padding-left: 2px;
`;
const ErrorWrapper__Text = styled.Text`
    color: red;
`;

const SecureEntryIcon = styled.View``;

const TextInputField = styled.TextInput`
    flex: 1;
    color: ${({ theme }: any) => theme.colors.text};
    padding-left: 8px;
  
`;

const Horizontal = styled.View`
    display: flex;
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 10px;
    padding-bottom: 10px;
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }: any) => theme.colors.primary};
    border-radius: 8px;
    margin-top: 10px;
`;

const TextInputLabelWrapper__Content = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
`;

const TextInputLabelWrapper = styled.View`
    margin-top: 24px;
`;

const TextFieldWrapper = styled.View``;
