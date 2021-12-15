import React, { useEffect } from 'react';
import { Text } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { useActions } from '@root/hooks/useActions';
import { useIsFocused } from '@react-navigation/native';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import CaseActiveShift from '../../../components/shifts/case-active-shift';
import { NotFound, NotFoundWrapper } from '../../../utils/globalStyle';

export const Shifts = () => {
    const { getActiveShift } = useActions();
    const isFocused = useIsFocused();
    const { activeShift, activeLoading, isActiveShift } = useTypedSelector(
        (state) => state.activeShift,
    );

    useEffect(() => {
        if (isFocused) {
            getActiveShift({ orgId: 1 });
        }
    }, [isFocused]);

    return activeLoading ? (
        <NotFoundWrapper>
            <NotFound>Loading...</NotFound>
        </NotFoundWrapper>
    ) : isActiveShift ? (
        <CaseActiveShift item={activeShift} />
    ) : (
        <NotFound>Not Shift Found</NotFound>
    );
};
