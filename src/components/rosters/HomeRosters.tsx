import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';

const HomeRosters = () => {
    return (
        <TouchableOpacity onPress={() => {}}>
            <ShiftItemLayout>
                <ImageCont>
                    <ImageView source={{ uri: '' }} />
                </ImageCont>
                <ImageRight>
                    <ItemNameText>dateTime</ItemNameText>
                    <SiteText>site name</SiteText>
                    <SiteNotes numberOfLines={1}>notes</SiteNotes>
                </ImageRight>
            </ShiftItemLayout>
        </TouchableOpacity>
    );
};

// @ts-ignore
export default withTheme(HomeRosters);

const SiteNotes = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme }: any) => theme.fontSize.cardDate}px;
    font-weight: 500;
`;

const SiteText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme }: any) => theme.fontSize.cardTitle}px;
    font-weight: 500;
`;

const ItemNameText = styled.Text`
    color: ${({ theme }: any) => theme.colors.textGray};
    font-size: ${({ theme }: any) => theme.fontSize.cardSubTitle}px;
    font-weight: 400;
`;

const ShiftItemLayout = styled.View`
    background: #29313e;
    border: 2px solid #29313e;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 14px;
    flex-direction: row;
    align-items: center;
`;

const ShiftItemLayoutOnClick = styled.View`
    background: #29313e;
    border-color: #f18122;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 14px;
    flex-direction: row;
    align-items: center;
`;

const ImageView = styled.Image`
    height: 64px;
    width: 64px;
    border: 2px;
    border-radius: 4px;
`;

const ImageCont = styled.View`
    padding-right: 9px;
`;

const ImageRight = styled.View``;
