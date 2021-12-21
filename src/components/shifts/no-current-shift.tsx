import React, {useEffect} from 'react';
import {FlatList, Text, TouchableOpacity} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import {withTheme} from 'styled-components';
import {
    MainParentWrapper,
    MainWrapper,
    NotFound,
    NotFoundWrapper,
} from '@root/utils/globalStyle';
import BackgroundGlobal from '../BackgroundGlobal';
import HomeRosters from '@root/components/rosters/HomeRosters';
import {useActions} from '../../hooks/useActions';
import {useTypedSelector} from '../../hooks/useTypedSelector';
import ModalManager from '../../store/global_modal/manager';
import PrimaryButton from '../Button';
import navigationStrings from "../../navigation/navigationStrings";


type ShiftProps = {
    navigation: any;
}

const NoCurrentShift: React.FC<ShiftProps> = ({navigation}) => {
    const {getUpcomingRosters, closeModal,getActiveShift} = useActions();
    const {modalProps} = useTypedSelector(state => state.modalSheet)
    const {upcomingRosterData, upcomingRoasterLoading} = useTypedSelector(
        (state) => state.rostersByDays,
    );
    const orgID = useTypedSelector((state) => state.auth.orgID);


    useEffect(() => {
        if (modalProps !== null) {
            closeModal()

        }
        getUpcomingRosters({orgID: orgID});
    }, []);

    return (
        <MainParentWrapper>
            <BackgroundGlobal>
                <MainWrapper>
                    <ParentBoth>
                        <AvailableToStartText>
                            Available to start
                        </AvailableToStartText>

                        <InfoImage
                            source={require('@root/assets/info/info.png')}/>


                    </ParentBoth>

                    <PressToStartText>
                        Press on the shift to start
                    </PressToStartText>
                    {upcomingRoasterLoading ? (
                        <NotFound>Loading...</NotFound>
                    ) : upcomingRosterData.length > 0 ? (
                        <FlatList
                            data={upcomingRosterData}
                            renderItem={({item}) => {
                                return (
                                    <HomeRosters
                                        item={item}
                                        showButton={true}
                                        height={'85%'}

                                    />
                                );
                            }}
                        />
                    ) : (
                        <NotFound>Not Shift Found</NotFound>
                    )}

                    <BtnWrapper>
                        <TouchableOpacity onPress={() => {
                                navigation.navigate(navigationStrings.START_MANUAL_SHIFT)
                        }}>
                            <StartManualShiftBtn>
                                <MyShiftText>
                                    My Shift is not here
                                </MyShiftText>
                            </StartManualShiftBtn>
                        </TouchableOpacity>

                    </BtnWrapper>
                </MainWrapper>
            </BackgroundGlobal>
            <ModalManager />
        </MainParentWrapper>
    );
};

// @ts-ignore
export default withTheme(NoCurrentShift);

const MyShiftText = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardDate}px;
  color: ${({theme}: any) => theme.colors.text};
`;

const StartManualShiftBtn = styled.View`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  background-color: #D93F3C;
  height: 60px;
  border-radius: 8px;
`;


const BtnWrapper = styled.View`
  margin-top: 40px;
`;

const AvailableToStartText = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardTitle}px;
  color: ${({theme}: any) => theme.colors.text};
`;
const PressToStartText = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardDate}px;
  color: ${({theme}: any) => theme.colors.textGray};
  margin-top: 8px;
  margin-bottom: 8px;
`;

const ParentBoth = styled.View`
  flex-direction: row;
  margin-top: 32px;
`;

const InfoImage = styled.Image`
  height: 19px;
  width: 19px;
  position: relative;
  top: -8px;
  left: 8px;
`;
