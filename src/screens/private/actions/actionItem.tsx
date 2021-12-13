// @ts-ignore
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { withTheme } from 'styled-components';
import { whiteRight } from '@root/utils/assets';

type ActionItemProps = {
    item: ItemData;
    navigation: any;
    actionTitle: boolean;
};

type ItemData = {
    status: string;
    actions: actionType;
};

type actionType = {
    actionID: number;
    actionDescription: string;
    actionType: string;
    actionByDate: string;
    actionByDateText: string;
};

const ActionItem: React.FC<ActionItemProps> = ({
    item: {
        status,
        actions: {
            actionByDateText,
            actionDescription,
            actionID,
            actionType,
            actionByDate,
        },
    },
    navigation,
    actionTitle = false,
}) => {
    let expires = new Date(actionByDate);

    return (
        <ActionWrapper>
            <TitleWrapperText>
                {actionTitle ? status : 'Actions'}
            </TitleWrapperText>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('Name', { actionID: 1 });
                }}>
                <ActionBox>
                    <ActionBoxCont>
                        <ItemNameText>{actionType}</ItemNameText>
                        <ExpireText>
                            Expires: {expires.getDate()}-{expires.getMonth()}-
                            {expires.getFullYear()} ({actionByDateText}){' '}
                        </ExpireText>
                        <SiteText>Sites Affected: {actionID}</SiteText>
                    </ActionBoxCont>
                    <ArrowCont>
                        <ArrowImage source={whiteRight}></ArrowImage>
                    </ArrowCont>
                </ActionBox>
            </TouchableOpacity>
        </ActionWrapper>
    );
};

// @ts-ignore
export default withTheme(ActionItem);

const ArrowCont = styled.View`
    margin-left: auto;
    padding-right: 8px;
`;

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

const ActionWrapper = styled.View``;

const TitleWrapperText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
`;
