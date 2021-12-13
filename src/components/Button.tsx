import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';

type PrimaryButtonProps = {
    onPress: Function;
    btnText: string;
    loading?: boolean;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onPress,
    btnText,
    loading = false,
}) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <PrimaryButton__Wrapper>
                <PrimaryButton__Wrapper__Text>
                    {loading ? 'Loading...' : btnText}
                </PrimaryButton__Wrapper__Text>
            </PrimaryButton__Wrapper>
        </TouchableOpacity>
    );
};

// @ts-ignore
export default withTheme(PrimaryButton);

const PrimaryButton__Wrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }: any) => theme.colors.greenColor};
    height: 60px;
    border-radius: 8px;
`;
const PrimaryButton__Wrapper__Text = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    padding: 10px;
`;
