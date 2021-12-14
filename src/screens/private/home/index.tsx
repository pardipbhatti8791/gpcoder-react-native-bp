import React, { useEffect } from 'react';
import { FlatList, TouchableOpacity, Text } from 'react-native';
import { format } from 'date-fns';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import ActionItem from '@root/screens/private/actions/actionItem';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { NotFound } from '@root/utils/globalStyle';
import { useIsFocused } from '@react-navigation/native';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import HomeRosters from '@root/components/rosters/HomeRosters';

const Home = (props: any) => {
    const { navigation } = props;
    const { getActions, getRosters } = useActions();
    const isFocused = useIsFocused();
    const { orgID } = useTypedSelector((state) => state.auth);
    const { actionsData, loading } = useTypedSelector((state) => state.actions);
    const { rosterData, roasterLoading } = useTypedSelector(
        (state) => state.rostersByDays,
    );

    useEffect(() => {
        if (isFocused) {
            getActions({
                'g-org': JSON.stringify(orgID),
                'status': 'urgent',
            });
            // format(new Date(), 'd')
            getRosters({
                days: '8',
            });
        }
    }, [isFocused]);

    return (
        <BackgroundGlobal>
            <MainFrame>
                {loading ? (
                    <NotFound>Loading...</NotFound>
                ) : actionsData.length > 0 ? (
                    <FlatList
                        nestedScrollEnabled={true}
                        data={actionsData}
                        renderItem={({ item }) => {
                            return (
                                <ActionItem
                                    item={item}
                                    navigation={navigation}
                                    key={1}
                                    actionTitle={true}
                                />
                            );
                        }}
                    />
                ) : (
                    <NotDataFoundWrapper>
                        <NotFound>Actions</NotFound>
                        <NotFound style={{ marginTop: 10 }}>
                            No Action Data Found
                        </NotFound>
                    </NotDataFoundWrapper>
                )}

                <TodayText>Today, {format(new Date(), 'EEEE d/L')}</TodayText>

                {roasterLoading ? (
                    <NotFound>Loading...</NotFound>
                ) : rosterData.length > 0 ? (
                    <FlatList
                        nestedScrollEnabled={true}
                        data={rosterData}
                        renderItem={({ item }) => {
                            return <HomeRosters />;
                        }}
                    />
                ) : (
                    <NotFound>No Rosters Data Found</NotFound>
                )}
            </MainFrame>
        </BackgroundGlobal>
    );
};

export default withTheme(Home);

const NotDataFoundWrapper = styled.View`
    padding-bottom: 15px;
    justify-content: center;
    align-items: flex-start;
`;

const TodayText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0 10px 0;
`;

const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
`;
