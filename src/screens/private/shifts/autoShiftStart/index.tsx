import  React from "react";
import BackgroundGlobal from "../../../../components/BackgroundGlobal";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {getUserLocation} from "@root/utils/common-methods";
// @ts-ignore
import styled, {withTheme} from "styled-components/native";
import { format } from 'date-fns';
import {useActions} from "@root/hooks/useActions";
import {useTypedSelector} from "@root/hooks/useTypedSelector";
import {navigationRef} from "../../../../navigation/RootNavigation";

// @ts-ignore
const AutoShiftStart =({route})=> {

    const { startShiftAction, getActiveShift } = useActions();
    const orgID = useTypedSelector((state) => state.auth.orgID);
    return (
        <BackgroundGlobal>

            <ScrollView>
                <MainFrame>
                    <AboutText fontSize={20}>Start Shift</AboutText>

                    <LocationText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                        do eiusmod tempor incididunt ut lab
                    </LocationText>

                    <SheetItemLayout>
                        <LocationText>Location Name</LocationText>
                        <SiteText>{route.params.item.siteName}</SiteText>
                    </SheetItemLayout>

                    <LocationText></LocationText>

                    <LocationText style={{ marginBottom: 7 }}>
                        Rostered For{' '}
                        {format(new Date(route.params.item.rosterStart), 'EEE HH:MM')}
                        {' - '}
                        {format(new Date(route.params.item.rosterEnd), 'HH:MM')}
                    </LocationText>

                    <LocationText>
                        Instructions{'\n'}
                        {route.params.item.notes}
                    </LocationText>

                    <AboutText fontSize={20}>About The Site</AboutText>

                    <LocationText>item.siteAddress</LocationText>

                    <LocationText>Report to Dock master</LocationText>


                        <TouchableOpacity
                            onPress={async () => {
                                try {
                                    const uLocationData: any =
                                        await getUserLocation();
                                    await startShiftAction({
                                        type: 'auto',
                                        orgID: orgID,
                                        startAuto: {
                                            rosterID: route.params.item.rosterID,
                                            geoLocation: {
                                                latitude: uLocationData.latitude,
                                                longitude: uLocationData.longitude,
                                            },
                                        },
                                    });
                                    await  getActiveShift({ orgID: orgID });
                                    route.params.navigation.pop()

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

                </MainFrame>
            </ScrollView>
        </BackgroundGlobal>
    );
}

// @ts-ignore
export default withTheme(AutoShiftStart)


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
