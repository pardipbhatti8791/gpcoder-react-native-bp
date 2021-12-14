import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import { format } from 'date-fns';
import { useActions } from '../../hooks/useActions';

type HomeRostersProps = {
    item: {
        siteName: string;
        notes: string;
        rosterStart: string;
        rosterEnd: string;
    };
};

const HomeRosters: React.FC<HomeRostersProps> = ({ item }) => {
    const { openModal } = useActions();

    return (
        <TouchableOpacity
            onPress={() =>
                openModal('RosterView', {
                    item: item,
                    height: '65%',
                    button: false,
                })
            }>
            <ShiftItemLayout>
                <ImageCont>
                    <ImageView source={require('@root/assets/profile.png')} />
                </ImageCont>
                <ImageRight>
                    <ItemNameText>
                        {format(new Date(item.rosterStart), 'EEE HH:MM')}
                        {' - '}
                        {format(new Date(item.rosterEnd), 'HH:MM')}
                    </ItemNameText>
                    <SiteText>{item.siteName}</SiteText>
                    <SiteNotes numberOfLines={1}>{item.notes}</SiteNotes>
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
