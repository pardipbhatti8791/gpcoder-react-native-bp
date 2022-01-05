import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import {withTheme} from 'styled-components';
import {format} from 'date-fns';
import {useActions} from '@root/hooks/useActions';
import NavigationStrings from "@root/navigation/navigationStrings";

type HomeRostersProps = {
    item: {
        siteName: string;
        notes: string;
        rosterStart: string;
        rosterEnd: string;
        guardInstruction :string;
    };
    showButton?: boolean;
    height?: string;
    navigation?: any
    type?: string
};

const HomeRosters: React.FC<HomeRostersProps> = ({
                                                     item,
                                                     showButton = false,
                                                     height = '65%',
                                                     navigation,
                                                     type

                                                 }) => {
    const {openModal} = useActions();

    return (
        <TouchableOpacity
            onPress={() => {
                type === 'modal' ? openModal('RosterView', {
                    item,
                    button: false,
                    height: '65%',
                }) : navigation.navigate(NavigationStrings.AUTO_SHIFT_START, {
                    item: item,
                    navigation: navigation,
                    button: showButton,

                })

            }
            }>

            <ShiftItemHorizontal>
                <ShiftItemVertical>
                    <DateText>
                        {format(
                            new Date(
                                item.rosterStart,
                            ),
                            'do',
                        )}
                    </DateText>
                    <DayText>
                        {format(
                            new Date(
                                item.rosterStart,
                            ),
                            'EE',
                        )}
                    </DayText>
                </ShiftItemVertical>

                <ShiftItemLayout>
                    <ItemView>
                        <ShiftItemHorizontal>
                            <Timeicon
                                source={require('@root/assets/clock/clock.png')}
                            />
                            <TimeText>
                                {format(
                                    new Date(
                                        item.rosterStart,
                                    ),
                                    'EEE',
                                )}

                                {item.rosterStart.split('T')[1].split(':')[0]}:{item.rosterStart.split('T')[1].split(':')[1]}
                                {' - '}
                                {item.rosterEnd.split('T')[1].split(':')[0]}:{item.rosterEnd.split('T')[1].split(':')[1]}
                            </TimeText>
                        </ShiftItemHorizontal>
                        <TitleText>
                            {item.siteName}
                        </TitleText>
                        <CodeText numberOfLines={1}>
                            {item.notes}
                        </CodeText>
                    </ItemView>
                </ShiftItemLayout>
            </ShiftItemHorizontal>

        </TouchableOpacity>
    );
};

// @ts-ignore
export default withTheme(HomeRosters);


const TimeText = styled.Text`
  color: ${({theme}: any) => theme.colors.text};
`;

const Timeicon = styled.Image`
  margin-right: 8px;
`;

const DateText = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardDate}px;
  color: ${({theme}: any) => theme.colors.text};
  padding-bottom: 2px;
`;

const DayText = styled.Text`
  font-size: 18px;
  font-weight: 400;
  align-items: center;
  display: flex;
  text-align: center;
  width: 100%;
  color: ${({theme}: any) => theme.colors.text};
`;

const TitleText = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardDate}px;
  font-weight: 400;
  color: ${({theme}: any) => theme.colors.text};
  margin-top: 3px;
`;

const CodeText = styled.Text`
  font-size: ${({theme}: any) => theme.fontSize.cardDate}px;
  font-weight: 500;
  color: ${({theme}: any) => theme.colors.text};
`;

const ItemView = styled.View`
  width: 100%;
`;


const ShiftItemLayout = styled.View`
  flex: auto;
  background: ${({theme}: any) => theme.colors.primary};
  border-radius: 8px;
  margin-bottom: 10px;
  padding: 14px;
  flex-direction: row;
  align-items: center;
`;

const ShiftItemVertical = styled.View`
  background: ${({theme}: any) => theme.colors.primary};
  border-radius: 8px;
  margin-right: 8px;
  margin-bottom: 10px;
  padding: 21px 5px;
  width: 20%;
  min-width: 70px;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const ShiftItemHorizontal = styled.View`
  flex-direction: row;
  align-items: center;
`;

