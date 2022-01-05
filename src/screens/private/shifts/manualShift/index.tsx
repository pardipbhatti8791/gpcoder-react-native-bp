import React, {useState} from 'react';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
// @ts-ignore
import styled from 'styled-components/native';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import TextField from '@root/components/TextField';
import {navigationRef} from '@root/navigation/RootNavigation';
import {ManualShiftInterface} from 'interfaces/manualShiftInterface';
import {Formik} from 'formik';
import {MANUAL_SHIFT_SCHEMA} from '@root/screens/private/shifts/manualShift/helpers';
import CustomTimePicker from '@root/components/TimePicker';
import {format} from 'date-fns';
import {useActions} from '@root/hooks/useActions';
import {getUserLocation} from '@root/utils/common-methods';
import {useTypedSelector} from '@root/hooks/useTypedSelector';

// @ts-ignore
const StartManualShift = () => {
    const {startShiftAction} = useActions();
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);

    const [type, setType] = useState(1);
    const [stime, setSTime] = useState<any>(new Date());
    const [etime, setETime] = useState<any>(new Date());
    const [reason, setReason] = useState('');
    const  [location,setLocation] = useState('')
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const setStartTime = (date: any) => {
        setSTime(date);
    };

    const setEndTime = (date: any) => {
        setETime(date);
    };

    const handleStartManualShift = async (values: ManualShiftInterface) => {
        try {
            const uLocationData: any =
                getUserLocation();
            console.log('location', uLocationData);
            await startShiftAction({
                type: 'manual',
                orgID: orgID,
                startManual: {
                    startTime: format(
                        new Date(stime),
                        'HH:mm',
                    ),
                    endTime: format(
                        new Date(etime),
                        'HH:mm',
                    ),
                    reason: reason,
                    location :location,
                    geoLocation: {
                        latitude:
                        uLocationData.latitude,
                        longitude:
                        uLocationData.longitude,
                    },
                },
            });
            navigationRef.current.goBack();
        } catch (e) {
            alert(
                'Please enable the location from settings!',
            );
        }
    };

    // @ts-ignore
    return (
        <BackgroundGlobal>
            <ScrollView>
                <MainFrame>
                    <TitleText>Start Shift without a roster</TitleText>

                    <Formik
                        validationSchema={MANUAL_SHIFT_SCHEMA}
                        initialValues={{
                            description: '',
                            location: '',
                        }}
                        onSubmit={(values) => {
                            handleStartManualShift(values);
                        }}>
                        {({setFieldValue, handleSubmit, errors}) => (
                            <View>
                                <TextField
                                    accessibilityLabel="You are about to start a shift that has not been rostered. Please add some details"
                                    onChangeText={(value: any) => {
                                        setReason(value);
                                        setFieldValue(
                                            'description',
                                            value,
                                        );
                                    }}
                                    autoCapitalize={'none'}
                                    error={
                                        errors ? errors.description : null
                                    }
                                />
                                <TextField
                                    accessibilityLabel="Location"
                                    onChangeText={(value: any) => {
                                        setLocation(value);
                                        setFieldValue(
                                            'location',
                                            value,
                                        );
                                    }}
                                    placeholder="Where is your shift?"
                                    error={
                                        errors ? errors.location : null
                                    }
                                />
                                <ShiftText>The Shift</ShiftText>

                                <TimerView
                                    style={{marginTop: 16, alignItems: 'center'}}>
                                    <View style={{alignItems: 'center'}}>
                                        <Text
                                            style={{
                                                color: '#FFFFFF',
                                                fontSize: 16,
                                                alignItems: 'center',
                                            }}>
                                            Starts At
                                        </Text>

                                        <TouchableOpacity
                                            onPress={() => {
                                                {
                                                    setVisibleTimer(true), setType(1);
                                                }
                                            }}>
                                            <TimeWrapper>
                                                <TimeText>
                                                    {format(new Date(stime), 'HH:mm')}
                                                </TimeText>
                                            </TimeWrapper>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{alignItems: 'center'}}>
                                        <Text
                                            style={{color: '#FFFFFF', fontSize: 16}}>
                                            Ends At
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                {
                                                    setVisibleTimer(true), setType(2);
                                                }
                                            }}>
                                            <TimeWrapper>
                                                <TimeText>
                                                    {format(new Date(etime), 'HH:mm')}
                                                </TimeText>
                                            </TimeWrapper>
                                        </TouchableOpacity>
                                    </View>
                                </TimerView>

                                {type == 1 ? (
                                    <CustomTimePicker
                                        showDateTimePicker={visibleTimer}
                                        handlePickerData={(date: any) =>
                                            setStartTime(date)
                                        }
                                        setDateTimePicker={setVisibleTimer}
                                    />
                                ) : (
                                    <CustomTimePicker
                                        showDateTimePicker={visibleTimer}
                                        handlePickerData={(date: any) =>
                                            setEndTime(date)
                                        }
                                        setDateTimePicker={setVisibleTimer}
                                    />
                                )}

                                <MainFrame>
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleSubmit()
                                        }}>
                                        <View style={{alignItems: 'center'}}>
                                            <StartBtnImage
                                                source={require('@root/assets/startshiftbtn/startshiftbtn.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </MainFrame>
                            </View>
                        )}
                    </Formik>
                </MainFrame>
            </ScrollView>
        </BackgroundGlobal>
    );
};

export default StartManualShift;

const TimeText = styled.Text`
  color: ${({theme}: any) => theme.colors.accentColor};
`;

const TimeWrapper = styled.View`
  background-color: ${({theme}: any) => theme.colors.secondary};
  padding-left: 26px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
  margin-top: 10px;
`;

const StartBtnImage = styled.Image`
  flex-direction: row;
  align-items: center;
  display: flex;
`;

const TimerView = styled.View`
  display: flex;
  padding-left: 35px;
  padding-right: 35px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const ShiftText = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardTitle}px;
  color: ${({theme}: any) => theme.colors.text};
  margin-top: 32px;
  align-items: center;
  align-self: center;
`;

const TitleText = styled.Text`
  margin: 15px 0 0 0;
  font-size: ${({theme}: any) => theme.fontSize.cardTitle}px;
  color: ${({theme}: any) => theme.colors.text};
`;

const MainFrame = styled.View`
  flex: 1;
  padding: 16px;
`;
