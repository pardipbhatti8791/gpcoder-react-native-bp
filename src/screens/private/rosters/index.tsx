import React, { useEffect, useState, useRef } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, Text, StatusBar, FlatList } from 'react-native';

// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';

import { TouchableOpacity } from 'react-native';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { apiUri } from '../../../service/apiEndPoints';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import HomeRosters from '../../../components/rosters/HomeRosters';
import {
    MainParentWrapper,
    NotFound,
    NotFoundWrapper,
} from '../../../utils/globalStyle';
import { format } from 'date-fns';
import ModalManager from '../../../store/global_modal/manager';

function Roster(props: any) {
    const isFocused = useIsFocused();
    const { getRosters, openModal } = useActions();
    const [tab, setTab] = useState<number>(1);
    const { rosterData, roasterLoading } = useTypedSelector(
        (state) => state.rostersByDays,
    );

    useEffect(() => {
        if (isFocused) {
            getRosters({
                uri: `${apiUri.shifts.shiftsByWeek}` + tab,
            });
        }
    }, [isFocused, tab]);

    return (
        <MainParentWrapper>
            <BackgroundGlobal>
                <StatusBar translucent={true}></StatusBar>

                <View>
                    <Tabs>
                        <TouchableOpacity
                            onPress={() => {
                                setTab(0);
                            }}>
                            <TabItem
                                style={
                                    tab === 0 && {
                                        color: props.theme.colors.accentColor,
                                    }
                                }>
                                Last Week
                            </TabItem>
                        </TouchableOpacity>
                        <VerticleLine />
                        <TouchableOpacity
                            onPress={() => {
                                setTab(1);
                            }}>
                            <TabItem
                                style={
                                    tab === 1 && {
                                        color: props.theme.colors.accentColor,
                                    }
                                }>
                                This Week
                            </TabItem>
                        </TouchableOpacity>
                        <VerticleLine />
                        <TouchableOpacity
                            onPress={() => {
                                setTab(2);
                            }}>
                            <TabItem
                                style={
                                    tab === 2 && {
                                        color: props.theme.colors.accentColor,
                                    }
                                }>
                                Next Week
                            </TabItem>
                        </TouchableOpacity>
                    </Tabs>

                    {roasterLoading ? (
                        <NotFoundWrapperRoster>
                            <NotFound>Loading...</NotFound>
                        </NotFoundWrapperRoster>
                    ) : rosterData.length > 0 ? (
                        <FlatList
                            nestedScrollEnabled={true}
                            data={rosterData}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() =>
                                            openModal('RosterView', {
                                                item,
                                                button: false,
                                                height: '65%',
                                            })
                                        }>
                                        <ShiftItemHorizontal>
                                            <ShiftItemVertical>
                                                <DateText>
                                                    {format(
                                                        new Date(
                                                            item.rosterStart,
                                                        ),
                                                        'do',
                                                    )}
                                                </DateText>
                                                <DayText>
                                                    {format(
                                                        new Date(
                                                            item.rosterStart,
                                                        ),
                                                        'EE',
                                                    )}
                                                </DayText>
                                            </ShiftItemVertical>

                                            <ShiftItemLayout>
                                                <View>
                                                    <ShiftItemHorizontal>
                                                        <Timeicon
                                                            source={require('@root/assets/clock/clock.png')}
                                                        />
                                                        <TimeText>
                                                            {format(
                                                                new Date(
                                                                    item.rosterStart,
                                                                ),
                                                                'EEE HH:MM',
                                                            )}
                                                            {' - '}
                                                            {format(
                                                                new Date(
                                                                    item.rosterEnd,
                                                                ),
                                                                'HH:MM',
                                                            )}
                                                        </TimeText>
                                                    </ShiftItemHorizontal>
                                                    <TitleText>
                                                        {item.siteName}
                                                    </TitleText>
                                                    <CodeText numberOfLines={1}>
                                                        {item.notes}
                                                    </CodeText>
                                                </View>
                                            </ShiftItemLayout>
                                        </ShiftItemHorizontal>
                                    </TouchableOpacity>
                                );
                            }}
                        />
                    ) : (
                        <NotFoundWrapperRoster>
                            <NotFound>No Rosters Data Found</NotFound>
                        </NotFoundWrapperRoster>
                    )}
                </View>
            </BackgroundGlobal>
            <ModalManager />
        </MainParentWrapper>
    );
}

// @ts-ignore
export default withTheme(Roster);

const NotFoundWrapperRoster = styled.View`
    justify-content: center;
    align-items: center;
`;

const DateText = styled.Text`
    font-size: ${({ theme }: any) => theme.fontSize.cardDate}px;
    color: ${({ theme }: any) => theme.colors.text};
    padding-bottom: 2px;
`;

const VerticleLine = styled.View`
    width: 1px;
    height: 30px;
    background-color: ${({ theme }: any) => theme.colors.textGray}; ;
`;

const TabItem = styled.Text`
    color: ${({ theme }: any) => theme.colors.textGray};
`;

const Tabs = styled.View`
    position: relative;
    z-index: 1;
    padding: 10px 15px 10px 15px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: #19212c;
`;

const ShiftItemHorizontal = styled.View`
    flex-direction: row;
    align-items: center;
`;

const TimeText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
`;

const Timeicon = styled.Image`
    margin-right: 8px;
`;

const DayText = styled.Text`
    font-size: 18px;
    font-weight: 400;
    align-items: center;
    display: flex;
    text-align: center;
    width: 100%;
    color: ${({ theme }: any) => theme.colors.text};
`;

const TitleText = styled.Text`
    font-size: ${({ theme }: any) => theme.fontSize.cardDate}px;
    font-weight: 400;
    color: ${({ theme }: any) => theme.colors.text};
    margin-top: 3px;
`;

const CodeText = styled.Text`
    font-size: ${({ theme }: any) => theme.fontSize.cardDate}px;
    font-weight: 500;
    color: ${({ theme }: any) => theme.colors.text};
`;

const ShiftItemLayout = styled.View`
    background: #29313e;
    border-radius: 8px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 10px;
    padding: 14px;
    width: 72%;
`;

const ShiftItemVertical = styled.View`
    background: #29313e;
    border-radius: 8px;
    margin-left: 8px;
    margin-right: 8px;
    margin-bottom: 10px;
    padding: 21px 5px;
    width: 20%;
    min-width: 70px;
    text-align: center;
    justify-content: center;
    align-items: center;
`;
