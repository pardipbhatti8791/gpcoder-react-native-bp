import React, { useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';

type TextFieldProps = {
    onBlur?: () => any;
    onFocus?: () => any;
    onChangeText: Function;
    placeholder?: string;
    value: string;
    icon?: string | null;
    accessibilityLabel?: string;
    secureTextEntry?: boolean;
    keyboardType?: string;
    autoCapitalize?: string;
};

const TextField: React.FC<TextFieldProps> = ({
    onBlur,
    onFocus,
    placeholder,
    value,
    icon = null,
    accessibilityLabel,
    secureTextEntry = false,
    keyboardType = 'default',
    onChangeText,
    autoCapitalize = 'sentences',
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
                    value={value}
                    secureTextEntry={showSecureEntry ? false : secureTextEntry}
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    autoCapitalize={autoCapitalize}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    {...rest}
                />

                {secureTextEntry && (
                    <SecureEntryIcon>
                        <TouchableOpacity
                            onPress={() =>
                                setShowSecureEntry(!showSecureEntry)
                            }>
                            <Image
                                style={{ height: 20, width: 24 }}
                                source={
                                    showSecureEntry === true
                                        ? require('@root/assets/eyeclose/eyeclose.png')
                                        : require('@root/assets/eyeopen/eyeopen.png')
                                }></Image>
                        </TouchableOpacity>
                    </SecureEntryIcon>
                )}
            </Horizontal>
        </TextFieldWrapper>
    );
};

// @ts-ignore
export default withTheme(TextField);

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
