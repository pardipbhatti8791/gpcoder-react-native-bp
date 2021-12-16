import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';

enum IconPosition {
    left = 'left',
    right = 'right',
}

type PrimaryButtonProps = {
    onPress: Function;
    btnText: string;
    loading?: boolean;
    icon?: string;
    isIconLeft?: boolean;
};

const SecondaryButton: React.FC<PrimaryButtonProps> = ({
    onPress,
    btnText,
    loading = false,
    icon,
    isIconLeft = true,
}) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <SecondaryButton__Wrapper iconPosition={isIconLeft}>
                <SecondaryButton__Wrapper__Text>
                    {loading ? 'Loading...' : btnText}
                </SecondaryButton__Wrapper__Text>
                <ImageWrapperRight>
                    <ImageWrapperRight__Image source={icon} />
                </ImageWrapperRight>
            </SecondaryButton__Wrapper>
        </TouchableOpacity>
    );
};

// @ts-ignore
export default withTheme(SecondaryButton);

type SecondaryButton__WrapperProps = {
    iconPosition: string;
};

const ImageWrapperRight = styled.View`
    background-color: ${({ theme }: any) => theme.colors.primary};
    padding: 8px;
    border-radius: 5px;
`;

const ImageWrapperRight__Image = styled.Image``;

const SecondaryButton__Wrapper = styled.View<SecondaryButton__WrapperProps>`
    width: 130px;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }: any) => theme.colors.accentColor};
    height: 50px;
    border-radius: 8px;
    flex-direction: ${({ iconPosition }: any) =>
        iconPosition ? 'row-reverse' : 'row'};
    padding: 0 6px 0 6px;
`;
const SecondaryButton__Wrapper__Text = styled.Text`
    color: ${({ theme }: any) => theme.colors.textBlack};
    font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
`;
