import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import { RepositoriesStateResponse } from '@root/store/checkpoints/interfaces';
import {actionsButtonIcons} from "../../utils/common-methods";
import {navigationRef} from "../../navigation/RootNavigation";
import navigationStrings from "../../navigation/navigationStrings";
import { FloatingAction } from 'react-native-floating-action';

const CaseScannedShiftItem: React.FC<RepositoriesStateResponse> = ({
    checkpoint,
    checkpointID,
    scannedDateTime,
}) => {
    return (
        <ItemLayout1>
            <ItemHorizontal>
                <TimeiconScanned
                    source={require('@root/assets/clock/clock.png')}
                />
                <TimeText>lsdfdsf</TimeText>
                <TimeiconScanned
                    source={require('@root/assets/locicon/locicon.png')}
                />
                <TimeText>checkpoint</TimeText>
            </ItemHorizontal>


        </ItemLayout1>
    );
};

// @ts-ignore
export default withTheme(CaseScannedShiftItem);

const TimeText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme }: any) => theme.fontSize.cardDate};
    margin-left: 7px;
`;

const ItemLayout1 = styled.View`
    background: ${({ theme }: any) => theme.colors.primary};
    border-radius: 8px;
    padding-left: 14px;
    padding-top: 14px;
    padding-bottom: 14px;
    flex-direction: row; 
    align-items: center;
    margin-bottom: 8px;
`;

const ItemHorizontal = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const TimeiconScanned = styled.Image`
    width: 18px;
    height: 18px;
    margin-left: 5px;
`;
