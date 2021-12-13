import React, { useEffect } from 'react';
import {
    ImageBackground,
    ScrollView,
    Text,
    TouchableOpacity,
} from 'react-native';
import { Appearance } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { backgroundImage, backgroundImageLight } from '@root/utils/assets';
import ActionItem from '../actions/actionItem';
import { useActions } from '../../../hooks/useActions';
import { useTypedSelector } from '../../../hooks/useTypedSelector';

export const Home = (props: any) => {
    let mode = Appearance.getColorScheme();
    const { navigation } = props;
    const { getActions } = useActions();
    const { orgID } = useTypedSelector((state) => state.auth);

    useEffect(() => {
        console.log('mode', Appearance.getColorScheme());
    });

    useEffect(() => {
        getActions({
            'g-org': JSON.stringify(orgID),
            'status': '',
        });
    }, []);

    return (
        <ImageBackground
            resizeMode={'stretch'} // or cover
            style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
            source={mode === 'dark' ? backgroundImage : backgroundImageLight}>
            <ScrollView>
                <MainFrame>
                    <Text
                        style={[
                            { color: mode === 'dark' ? '#FFFFFF' : '#000000' },
                        ]}>
                        Action
                    </Text>

                    {/*<ActionItem item={{}} navigation={navigation} key={1}/>*/}
                </MainFrame>
            </ScrollView>
        </ImageBackground>
    );
};

const ArrowImage = styled.Image`
    width: 8px;
    height: 12px;
`;

const ExpireText = styled.Text`
    color: #ffffff;
    font-size: 20px;
    font-weight: 600;
    margin: 5px 0;
`;

const ItemNameText = styled.Text`
    color: #e5e5e5;
    font-size: 15px;
    font-weight: 400;
`;

const SiteText = styled.Text`
    color: #ffffff;
    font-size: 15px;
    font-weight: 500;
`;

const ActionBox = styled.View`
    background-color: #d93f3c;
    margin-right: 16px;
    margin-top: 16px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    padding: 14px;
    width: 100%;
`;
const ActionBoxCont = styled.View``;

const ArrowCont = styled.View`
    margin-left: auto;
    padding-right: 8px;
`;

const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
`;
