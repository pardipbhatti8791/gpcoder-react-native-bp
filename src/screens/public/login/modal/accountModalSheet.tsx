import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import {withTheme} from 'styled-components';
import ListCard from '@root/components/ListCard';
import PrimaryButton from "../../../../components/Button";
import {colors} from "../../../../theme/styles";


const AccountModalSheet = (props: any) => {

    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );

    return (
        <SheetWrapper>
            <ChooseProfile>
                <ChooseProfileText>CHOOSE PROFILES</ChooseProfileText>
            </ChooseProfile>
            <ListWrapper>
                <ListCard/>
            </ListWrapper>
        </SheetWrapper>
    );
};

const styles = StyleSheet.create({

    itemContainer: {},
});


export default withTheme(AccountModalSheet);



const ListWrapper = styled.View`
  margin-top: 15px;
`;

const ChooseProfile = styled.View`
  align-items: center;
  margin-top: 35px;
`;
const ChooseProfileText = styled.Text`
  color: ${({theme}: any) => theme.colors.accentColor};
  font-size: ${({theme}: any) => theme.fontSize.cardSubTitle}px;
`;

const SheetWrapper = styled.View`
  flex: 1;
  background-color: ${({theme}: any) => theme.colors.primary};
`;
