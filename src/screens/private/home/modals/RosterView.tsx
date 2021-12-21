import React from 'react';
import { ScrollView, View, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import {getUserLocation} from "../../../../utils/common-methods";
import {navigationRef} from "../../../../navigation/RootNavigation";
import NavigationStrings from "../../../../navigation/navigationStrings";


const RosterView = ({ item, button ,props}: any) => {
    const { startShiftAction, getActiveShift } = useActions();
    const orgID = useTypedSelector((state) => state.auth.orgID);

    return (
        <ScrollView>
            <MainFrame>
                <AboutText fontSize={20}>Start Shift</AboutText>

                <LocationText>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut lab
                </LocationText>

                <SheetItemLayout>
                    <LocationText>Location Name</LocationText>
                    <SiteText>{item.siteName}</SiteText>
                </SheetItemLayout>

                <LocationText></LocationText>

                <LocationText style={{ marginBottom: 7 }}>
                    Rostered For{' '}
                    {format(new Date(item.rosterStart), 'EEE HH:MM')}
                    {' - '}
                    {format(new Date(item.rosterEnd), 'HH:MM')}
                </LocationText>

                <LocationText>
                    Instructions{'\n'}
                    {item.notes}
                </LocationText>

                <AboutText fontSize={20}>About The Site</AboutText>

                <LocationText>{item.siteAddress}</LocationText>

                <LocationText>Report to Dock master</LocationText>

                {button && (
                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                const uLocationData: any =
                                    await getUserLocation();
                                await startShiftAction({
                                    type: 'auto',
                                    orgID: orgID,
                                    startAuto: {
                                        rosterID: item.rosterID,
                                        geoLocation: {
                                            latitude: uLocationData.latitude,
                                            longitude: uLocationData.longitude,
                                        },
                                    },
                                });

                               await  getActiveShift({ orgID: orgID });
                             //   navigationRef.current.navigate(NavigationStrings.TAB_BAR_SHIFTS)
                            } catch (e) {
                                alert(
                                    'Please enable the location from settings!',
                                );
                            }


                        }}>
                        <View style={{ alignItems: 'center' }}>
                            <StartBtnImage
                                source={require('@root/assets/startshiftbtn/startshiftbtn.png')}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </MainFrame>
        </ScrollView>
    );
};

// @ts-ignore
export default withTheme(RosterView);

const SheetItemLayout = styled.View`
  background: ${(props: any) => props.theme.colors.secondary};
  border: 2px solid #29313E;
  border-radius: 8px;
  margin-bottom: -12px;
  margin-top: 10px;
  padding: 14px;
  display: flex;
  flex-direction: column;
`;

const StartBtnImage = styled.Image`
    flex-direction: row;
    align-items: center;
    display: flex;
    margin-top: 66px;
`;

const SiteText = styled.Text`
    color: ${(props: any) => props.theme.colors.accentColor};
    font-size: ${(props: any) => props.theme.fontSize.cardTitle}px;
`;

const LocationText = styled.Text`
    margin: 0 0 5px 0;
    color: ${(props: any) => props.theme.colors.textGray};
    font-size: ${(props: any) => props.theme.fontSize.cardDate}px;
`;
const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
    background-color: ${({ theme }: any) => theme.colors.primary};
`;

const AboutText = styled.Text`
    margin: 5px 0 7px 0;
    font-size: ${(props: any) => props.fontSize}px;
    color: ${(props: any) => props.theme.colors.text};
`;
