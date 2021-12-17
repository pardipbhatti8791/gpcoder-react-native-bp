import React, { useEffect } from 'react';
import { FlatList, Text } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import {
    MainParentWrapper,
    MainWrapper,
    NotFound,
    NotFoundWrapper,
} from '@root/utils/globalStyle';
import BackgroundGlobal from '../BackgroundGlobal';
import HomeRosters from '@root/components/rosters/HomeRosters';
import { useActions } from '../../hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import ModalManager from '../../store/global_modal/manager';
import PrimaryButton from '../Button';

const NoCurrentShift = (props: any) => {
    const { getUpcomingRosters } = useActions();
    const { upcomingRosterData, upcomingRoasterLoading } = useTypedSelector(
        (state) => state.rostersByDays,
    );
    const orgID = useTypedSelector((state) => state.auth.orgID);

    useEffect(() => {
        getUpcomingRosters({ orgID: orgID });
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
                            source={require('@root/assets/info/info.png')}></InfoImage>
                    </ParentBoth>

                    <PressToStartText>
                        Press on the shift to start
                    </PressToStartText>
                    {upcomingRoasterLoading ? (
                        <NotFound>Loading...</NotFound>
                    ) : upcomingRosterData.length > 0 ? (
                        <FlatList
                            data={upcomingRosterData}
                            renderItem={({ item }) => {
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
                        <PrimaryButton
                            onPress={() => alert('ok')}
                            btnText={'My shift is not here'}
                            loading={false}
                            backgroundColor={'#d93f3c'}
                        />
                    </BtnWrapper>
                </MainWrapper>
            </BackgroundGlobal>
            <ModalManager />
        </MainParentWrapper>
    );
};

// @ts-ignore
export default withTheme(NoCurrentShift);

const BtnWrapper = styled.View`
    margin-top: 40px;
`;

const AvailableToStartText = styled.Text`
    font-size: ${({ theme }: any) => theme.fontSize.cardTitle};
    color: ${({ theme }: any) => theme.colors.text};
`;
const PressToStartText = styled.Text`
    font-size: ${({ theme }: any) => theme.fontSize.cardDate};
    color: ${({ theme }: any) => theme.colors.textGray};
    margin-top: 8px;
    margin-bottom: 8px;
`;

const ImageRight = styled.View``;

const ShiftItemLayout = styled.View`
  background: #29313e;
  border: 2px solid #29313E;
  border-radius: 8px;
  margin-bottom: 10px
  padding: 14px;
  flex-direction: row;
  align-items: center;
`;

const ImageCont = styled.View`
    padding-right: 9px;
`;

const ImageView = styled.Image`
    height: 64px;
    width: 64px;
    border: 2px;
    border-radius: 4px;
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
