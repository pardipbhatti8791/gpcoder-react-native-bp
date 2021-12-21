import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import { withTheme } from 'styled-components';
import { useActions } from '@root/hooks/useActions';
// @ts-ignore
import styled from 'styled-components/native';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import {BottomSheetFlatList} from "@gorhom/bottom-sheet";


const ShiftAttachmentSheet = () => {
    const {
        shiftReportsEntriesAttachments,
        deleteShiftReportAttachmentLoading,
        shiftReportEntryID
    }: any = useTypedSelector((state) => state.shiftReports);
    const { deleteShiftReportAttacments, getShiftsReportsEntrieAttachments } =
        useActions();

    return (
        <FlatList
            data={shiftReportsEntriesAttachments}
            renderItem={({ item, index }) => {
                return (
                    <CustomMainWrapper>
                        <ItemView>
                            <DeleteIcon>
                                <TouchableOpacity
                                    onPress={async () => {
                                        await deleteShiftReportAttacments({
                                            id: item.documentID,
                                        });
                                        getShiftsReportsEntrieAttachments({ id: shiftReportEntryID });
                                    }}>
                                    <DeleteImage
                                        source={require('@root/assets/minus/minus.png')} />
                                </TouchableOpacity>
                            </DeleteIcon>

                            <FilesBackground>
                                <SelectedImage
                                    source={{
                                        uri:
                                            'data:image/png;base64,  ' +
                                            item.image,


                                    }} />

                                <FilesText>Description</FilesText>
                                <FilesTextDescription>
                                    {item.description}
                                </FilesTextDescription>
                            </FilesBackground>
                        </ItemView>
                    </CustomMainWrapper>
                );
            }} />

    );
};

// @ts-ignore
export default withTheme(ShiftAttachmentSheet);

const FilesTextDescription = styled.Text`
   
  margin-top: 5px;
  margin-left: 8px;
    // font-size: ${({ theme }: any) => theme.fontSize.cardText}px;
    // color: ${({ theme }: any) => theme.colors.text};
`;

const FilesText = styled.Text`
    margin: 5px 0 0 8px;
    font-size: ${({ theme }: any) => theme.fontSize.cardTitle}px;
    color: ${({ theme }: any) => theme.colors.text};
`;

const SelectedImage = styled.Image`
    height: 145px;
    margin-bottom: 10px;
    border-radius: 8px;
    background: #000000;
`;

const FilesBackground = styled.View`
    margin: 16px;
    border-radius: 8px;
    background: ${({ theme }: any) => theme.colors.primary};
    padding: 24px 15px;
`;

const DeleteImage = styled.Image``;

const DeleteIcon = styled.View`
    flex-direction: row;
    justify-content: flex-end;
    position: relative;
    z-index: 2;
    top: 30px;
    right: 30px;
`;

const ItemView = styled.View`
    position: relative;
`;

const CustomMainWrapper = styled.View`
    background-color: ${({ theme }: any) => theme.colors.secondary};
`;
