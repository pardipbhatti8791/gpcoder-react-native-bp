import React, {useEffect, useState} from 'react';
import {format} from 'date-fns';
import {Formik} from 'formik';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import {
    MainParentWrapper,
    MainWrapper,
    NotFound,
} from '@root/utils/globalStyle';
// @ts-ignore
import styled from 'styled-components/native';
import {withTheme} from 'styled-components';
import TextField from '@root/components/TextField';
import {Image, ScrollView, TouchableOpacity, View} from 'react-native';
import {WINDOW_DEVICE_WIDTH} from '@root/utils/constants';
import ButtonSecondary from '@root/components/ButtonSecondary';
import {arrowSend} from 'utils/assets';
import {
    actionsButtonIcons,
    getUserLocation,
} from '@root/utils/common-methods';
import CustomTimePicker from '@root/components/TimePicker';
import {useActions} from '@root/hooks/useActions';
import {useTypedSelector} from '@root/hooks/useTypedSelector';
import {navigationRef} from '@root/navigation/RootNavigation';
import {PATROL_ENTRY_SCHEMA} from './helper';
import {apiUri} from '@root/service/apiEndPoints';
import ModalManager from '@root/store/global_modal/manager';
import {FloatingAction} from 'react-native-floating-action';
import navigationStrings from '@root/navigation/navigationStrings';
import ImageModal from "react-native-image-modal";
import moment from "moment";

const Patrol = (props: any) => {
    const {
        createReportEntryForShift,
        openModal,
        getShiftsReportsEntrieAttachments,
    } = useActions();
    const {
        route: {params},
        navigation,
    } = props;
    const [location, setLocation] = useState<any>({});
    const [time, setTime] = useState<any>(new Date().toISOString());
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    const {activeShift}: any = useTypedSelector((state) => state.activeShift);
    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);

    const setCurrentTime = (date: any) => {
        setTime(date);

    };

    useEffect(() => {
        if (params.editable) {
            getShiftsReportsEntrieAttachments({
                id: params.item.shiftReportID,
            });

            setTime(
                params.item.reportDateTime,
            )

        }
    }, []);

    useEffect(() => {
        getUserLoc();
    }, []);

    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
    };


    const handleCreateReportEntry = async (values: any) => {
        const newValue = {...values};
        if (params.editable) {
            delete newValue.shiftID;
            console.log('before', newValue);
            newValue.shiftReportID = values.shiftID;
            console.log('after', newValue);
        }

        await createReportEntryForShift({
            url: apiUri.shifts.createPetrolEntry,
            type: params.editable ? 'update' : 'create',
            create: newValue,
        });
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <BackgroundGlobal>
            <MainParentWrapper>
                <MainWrapper>
                    <ImageRight>
                        <ScrollView>
                            <TimeTitleText>Time of Patrol</TimeTitleText>
                        </ScrollView>
                        <ShiftItemHorizontal>
                            <TouchableOpacity
                                onPress={() => setVisibleTimer(true)}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Timeicon
                                    source={require('@root/assets/clock/clock.png')}
                                />
                                <TimeTitleText>
                                    {
                                        time.split('T')[1].split(':')[0] + ':' + time.split('T')[1].split(':')[1]
                                    }
                                </TimeTitleText>
                            </TouchableOpacity>
                            <CustomTimePicker
                                showDateTimePicker={visibleTimer}
                                handlePickerData={(date: any) => {
                                   setCurrentTime(date.getFullYear() + "-" + date.getMonth()+1 + "-" + date.getDate() + 'T' + date.getHours() + ":" + date.getMinutes())
                                }
                                }
                                setDateTimePicker={setVisibleTimer}
                            />
                        </ShiftItemHorizontal>
                    </ImageRight>

                    <Formik
                        validationSchema={PATROL_ENTRY_SCHEMA}
                        initialValues={{
                            reportTime: time.split('T')[1].split(':')[0] + ':' + time.split('T')[1].split(':')[1],
                            description: params.item
                                ? params.item.description
                                : '',
                            geoLocation: {
                                latitude: location.latitude,
                                longitude: location.longitude,
                            },
                            shiftID: params.item
                                ? params.item.shiftReportID
                                : activeShift
                                    ? activeShift.shiftID
                                    : 0,
                        }}
                        enableReinitialize={true}
                        onSubmit={async (values) => {
                            await handleCreateReportEntry(values);
                            navigationRef.current.goBack();
                        }}>
                        {({setFieldValue, handleSubmit, errors, values}) => (
                            <View>
                                <TextField
                                    accessibilityLabel="Description"
                                    onChangeText={(value: any) => {
                                        setFieldValue('description', value);
                                    }}
                                    placeholder="Enter Description"
                                    keyboardType={'default'}
                                    autoCapitalize={'none'}
                                    multiline={true}
                                    value={values.description}
                                    style={{
                                        minHeight: 60,
                                    }}
                                    error={errors ? errors.description : null}
                                />

                                {params.editable && (
                                    <ImageWrapper>
                                        {shiftReportsEntriesAttachmentsLoading ? (
                                            <NotFound
                                                style={{alignSelf: 'center'}}>
                                                Loading...
                                            </NotFound>
                                        ) : shiftReportsEntriesAttachments.length >
                                        0 ? (
                                            shiftReportsEntriesAttachments.map(
                                                (attachment: any) => {
                                                    return (
                                                        <TouchableOpacity onPress={() => {

                                                        }}>
                                                            <ImageWrapper__Image
                                                                width={
                                                                    WINDOW_DEVICE_WIDTH -
                                                                    32
                                                                }>

                                                                <ImageModal
                                                                    style={{
                                                                        width:
                                                                            (WINDOW_DEVICE_WIDTH -
                                                                                32) /
                                                                            6,
                                                                        height:
                                                                            (WINDOW_DEVICE_WIDTH -
                                                                                32) /
                                                                            6,
                                                                        borderRadius: 4,
                                                                    }}
                                                                    resizeMode="cover"
                                                                    imageBackgroundColor="#000000"

                                                                    source={{
                                                                        uri: 'data:image/png;base64,  ' +
                                                                            attachment.image,
                                                                    }}
                                                                />

                                                            </ImageWrapper__Image>


                                                        </TouchableOpacity>
                                                    );
                                                },
                                            )
                                        ) : (
                                            <TouchableOpacity
                                                onPress={() =>
                                                    openModal(
                                                        'ImagePickerSheet',
                                                        {
                                                            height: '90%',
                                                            shiftReportID:
                                                            params.item
                                                                .shiftReportID,
                                                        },
                                                    )
                                                }>
                                                <ImageWrapper__AddImageButton
                                                    width={
                                                        WINDOW_DEVICE_WIDTH - 32
                                                    }>
                                                    <Image
                                                        source={require('@root/assets/addWhite/addWhite.png')}
                                                    />
                                                </ImageWrapper__AddImageButton>
                                            </TouchableOpacity>
                                        )}

                                        {!shiftReportsEntriesAttachmentsLoading &&
                                            shiftReportsEntriesAttachments.length >
                                            0 && (
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        openModal(
                                                            'ImagePickerSheet',
                                                            {
                                                                height: '80%',
                                                                shiftReportID:
                                                                params.item
                                                                    .shiftReportID,
                                                            },
                                                        )
                                                    }>
                                                    <ImageWrapper__AddImageButton
                                                        width={
                                                            WINDOW_DEVICE_WIDTH -
                                                            32
                                                        }>
                                                        <Image
                                                            source={require('@root/assets/addWhite/addWhite.png')}
                                                        />
                                                    </ImageWrapper__AddImageButton>
                                                </TouchableOpacity>
                                            )}
                                    </ImageWrapper>
                                )}

                                <ButtonWrapper>
                                    <ButtonSecondary
                                        btnText={'Submit'}
                                        onPress={() => handleSubmit()}
                                        loading={createReportEntryLoading}
                                        icon={arrowSend}
                                        isIconLeft={false}
                                    />
                                </ButtonWrapper>
                            </View>
                        )}
                    </Formik>
                </MainWrapper>
                <ModalManager/>
                <FloatingAction
                    actions={actionsButtonIcons}
                    onPressItem={(name) => {
                        navigation.navigate(navigationStrings.QRSCAN);
                    }}
                    overlayColor={'rgba(255, 255, 255, 0)'}
                    color={'#16a086'}
                />
            </MainParentWrapper>
        </BackgroundGlobal>
    );
};
// @ts-ignore
export default withTheme(Patrol);

type ImageWrapper__ImageProps = {
    width: number;
};

const ButtonWrapper = styled.View`
  flex: 1;
  align-items: flex-end;
  margin-top: 16px;
`;

const ImageWrapper__AddImageButton = styled.View<ImageWrapper__ImageProps>`
  background-color: ${({theme}: any) => theme.colors.primary};
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  margin-top: 5px;
  margin-left: 4px;
  width: ${({width}: any) => width / 6}px;
  height: ${({width}: any) => width / 6}px;
`;

const ImageWrapper__Image = styled.View<ImageWrapper__ImageProps>`
  width: ${({width}: any) => width / 6}px;
  height: ${({width}: any) => width / 6}px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 4px 4px 4px 4px;
`;

const ImageWrapper = styled.View`
  flex-wrap: wrap;
  flex-direction: row;
  background-color: ${({theme}: any) => theme.colors.secondary};
  margin-top: 20px;
  padding: 8px;
  justify-content: flex-start;
`;

const Timeicon = styled.Image`
  margin-right: 8px;
`;

const ShiftItemHorizontal = styled.View`
  display: flex;
  flex-direction: row;
  margin-top: 8px;
  align-items: center;
`;

const TimeTitleText = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardTitle};
  color: ${({theme}: any) => theme.colors.text};
`;

const ImageRight = styled.View`
  margin-top: 30px;
`;
