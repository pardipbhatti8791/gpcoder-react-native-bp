import {
    DarkTheme,
    DefaultTheme as LightTheme,
} from '@react-navigation/native';

export const navigationTheme = {
    light: {
        ...LightTheme,
        type: 'light',
        colors: {
            ...LightTheme.colors,
            primary: '#F6F4FF',
            secondary: '#E3E1EE',
            accentColor: '#f18122',
            error: '#D93F3C',
            text: '#000000',
            textGray: '#808080',
            inactive: '#CBC9D6',
            greenColor: '#17907A',
            textBlack: '#000000'
        },
        spacing: {
            horizontal: 15,
        },
        fontSize: {
            cardDate: 15,
            cardTitle: 20,
            cardSubTitle: 15
        }
    },
    dark: {
        ...DarkTheme,
        type: 'dark',
        colors: {
            ...DarkTheme.colors,
            primary: '#28303D',
            secondary: '#19212C',
            accentColor: '#f18122',
            error: '#D93F3C',
            text: '#FFFFFF',
            textGray: '#808080',
            inactive: 'rgba(255, 255, 255, 0.6)',
            greenColor: '#17907A',
            textBlack: '#000000'
        },
        spacing: {
            horizontal: 15,
        },
        fontSize: {
            cardDate: 15,
            cardTitle: 20,
            cardSubTitle: 15
        }
    },
};
