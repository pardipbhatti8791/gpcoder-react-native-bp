import React, { useEffect } from 'react';
import { FlatList } from 'react-native';
import { Appearance } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';

import ActionItem from '@root/screens/private/actions/actionItem';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { useIsFocused } from '@react-navigation/native';
import { NotFound, NotFoundWrapper } from '../../../utils/globalStyle';
import BackgroundGlobal from '@root/components/BackgroundGlobal';

export const Actions = (props: any) => {
    let mode = Appearance.getColorScheme();
    const { navigation } = props;
    const { getActions } = useActions();
    const isFocused = useIsFocused();
    const { orgID } = useTypedSelector((state) => state.auth);
    const { actionsData, loading } = useTypedSelector((state) => state.actions);

    useEffect(() => {
        if (isFocused) {
            getActions({
                'g-org': JSON.stringify(orgID),
                'status': '',
            });
        }
    }, [isFocused]);

    return (
        <BackgroundGlobal>
            <MainFrame>
                {loading ? (
                    <NotFoundWrapper>
                        <NotFound>Loading...</NotFound>
                    </NotFoundWrapper>
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
                    <NotFound>No Data Found</NotFound>
                )}
            </MainFrame>
        </BackgroundGlobal>
    );
};

const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
`;
