import React, {
    useCallback,
    useMemo,
    useEffect, useRef,
} from 'react';

import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

// @ts-ignore
import styled from 'styled-components/native';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { useActions } from '@root/hooks/useActions';
import { ScrollView, View } from 'react-native';
// @ts-ignore
import {
    AccountModalSheet,
    RosterView,
    ReportsEntryList,
    ImagePickerSheet,
    ShiftAttachmentSheet,
} from './modal';

// ref
// export const bottomSheetRef: any = React.createRef();



const ModalManager = () => {
    const { closeModal } = useActions();
    const  bottomSheetRef = useRef(null)
    /**
     * * @{ get current modal }
     */
    const { modalType, modalProps } = useTypedSelector(
        (state) => state.modalSheet,
    );

    useEffect(() => {
        if (modalProps !== null) {
            // @ts-ignore
            bottomSheetRef.current.expand();
        }else  {
            // @ts-ignore
            bottomSheetRef.current.close();
            console.log("here")
        }
    }, [modalProps]);

    // variables
    const snapPoints = useMemo(
        () => [
            '0%',
            modalProps !== null && modalProps.hasOwnProperty('height')
                ? modalProps.height
                : '70%',
        ],
        [modalProps],
    );

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        if (index === 0) {
            closeModal();

        }
    }, []);

    let renderedModal;
    if (modalType !== null) {
        const ModalComponent = modalLookup[modalType];
        renderedModal = <ModalComponent {...modalProps} />;
        if (modalProps !== null) {
            return (
                <BottomSheet
                    ref={bottomSheetRef}
                    index={0}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    // backdropComponent={CustomBackdrop}
                >
                    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
                        {renderedModal}
                    </BottomSheetScrollView>
                </BottomSheet>
            );
        }
    }
    {
        return (
            <BottomSheet
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <View></View>
            </BottomSheet>
        );
    }
};

export default ModalManager;

export const WelcomeModal = (props: any) => {
    return (
        <WelcomeModalWrapper>
            <ScrollView showsVerticalScrollIndicator={false}>
                <WelcomeModalWrapper__Content>
                    Welcome {JSON.stringify(props, null, 2)}
                </WelcomeModalWrapper__Content>
            </ScrollView>
        </WelcomeModalWrapper>
    );
};

const modalLookup: any = {
    WelcomeModal,
    AccountModalSheet,
    RosterView,
    ReportsEntryList,
    ImagePickerSheet,
    ShiftAttachmentSheet,
};

const WelcomeModalWrapper = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const WelcomeModalWrapper__Content = styled.Text``;
