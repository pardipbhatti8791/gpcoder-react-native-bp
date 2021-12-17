import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';
// @ts-ignore
import styled from 'styled-components/native';

import { MainParentWrapper } from '@root/utils/globalStyle';
import { useActions } from '@root/hooks/useActions';
import { reportsData } from '@root/utils/common-methods';
import { navigationRef } from '../../navigation/RootNavigation';
import navigationStrings from '../../navigation/navigationStrings';

type CaseActiveShiftItem = {
    shiftReportData: any;
    item: any;
};

const CaseActiveShiftItem: React.FC<CaseActiveShiftItem> = ({
    shiftReportData,
    item,
}) => {
    const { openModal } = useActions();
    return (
        <MainParentWrapper>
            <ShiftCode>GHBJM</ShiftCode>
            <ShiftItemHorizontal>
                <ShiftStartTimeEndTime>Shift: </ShiftStartTimeEndTime>
                <ShiftCode>
                    {format(new Date(item.shiftStart), 'HH:mm')}
                </ShiftCode>
            </ShiftItemHorizontal>
            <ShiftItemHorizontal>
                <ShiftText>Shift Report Entries</ShiftText>
                <TouchableOpacity
                    onPress={() =>
                        openModal('ReportsEntryList', {
                            data: reportsData,
                            height: '75%',
                        })
                    }>
                    <AddImage
                        source={require('@root/assets/Vector/Vector.png')}
                    />
                </TouchableOpacity>
            </ShiftItemHorizontal>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={shiftReportData}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() =>
                            navigationRef.current.navigate(
                                navigationStrings.PATROL,
                                {
                                    editable: true,
                                    item,
                                },
                            )
                        }>
                        <ItemLayout>
                            <ItemHorizontal1>
                                <Timeicon
                                    source={require('@root/assets/clock/clock.png')}
                                />
                                <StartEndTimeCategory>
                                    {format(
                                        new Date(item.reportDateTime),
                                        'HH:mm',
                                    )}{' '}
                                    - {item.categoryName}
                                </StartEndTimeCategory>
                            </ItemHorizontal1>
                            <ShiftStartTimeEndTime
                                numberOfLines={1}
                                style={{ marginTop: 3 }}>
                                {item.description}
                            </ShiftStartTimeEndTime>
                        </ItemLayout>
                    </TouchableOpacity>
                )}
            />
        </MainParentWrapper>
    );
};

export default CaseActiveShiftItem;

const StartEndTimeCategory = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
`;

const ShiftStartTimeEndTime = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme }: any) => theme.fontSize.cardDate};
`;

const ShiftCode = styled.Text`
    color: ${({ theme }: any) => theme.colors.accentColor};
    font-size: ${({ theme }: any) => theme.fontSize.cardDate};
`;

const Timeicon = styled.Image`
    margin-right: 8px;
`;

const ItemHorizontal1 = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const ItemLayout = styled.View`
    background: ${({ theme }: any) => theme.colors.primary};
    border-radius: 8px;
    padding: 14px 0 14px 14px;
    display: flex;
    flex-direction: column;
    margin-top: 0px;
    margin-bottom: 8px;
`;

const AddImage = styled.Image`
    margin-left: 8px;
`;

const ShiftText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: 20px;
    font-weight: 600;
    margin: 10px 0;
`;

const ShiftItemHorizontal = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    align-items: center;
`;
