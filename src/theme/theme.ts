import { DefaultTheme } from 'styled-components';
import { colors, typography } from '@root/theme/styles';
import {
    DarkTheme,
    DefaultTheme as LightTheme,
} from '@react-navigation/native';

export const navigationTheme = {
    light: {
        ...LightTheme,
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
        },
    },
    dark: {
        ...DarkTheme,
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
        },
    },
};

const theme: DefaultTheme = {
    space: {
        none: 0,
        xs: 2,
        sm: 4,
        md: 8,
        ls: 16,
        xl: 32,
        xxl: 64,
    },
    colors: {
        primary: colors.PRIMARY,
        secondary: colors.SECONDARY,
        black: colors.BLACK,
        white: colors.WHITE,
        success: colors.SUCCESS,
        backgroundColor: colors.BACKGROUND_COLOR,
        grayLight: colors.GRAY_LIGHT,
        card: '#ffffff',
    },
    typography: {
        FONT_REGULAR: typography.FONT_FAMILY_REGULAR,
        FONT_BOLD: typography.FONT_FAMILY_BOLD,
    },
    borderWidths: { none: 0, xs: 2, sm: 4, md: 8, ls: 16, xl: 32, xxl: 64 },
    bordersColors: {
        primary: colors.PRIMARY,
        secondary: colors.SECONDARY,
        black: colors.BLACK,
        white: colors.WHITE,
        success: colors.SUCCESS,
    },
    radii: {
        none: 0,
        xs: 2,
        sm: 4,
        md: 8,
        ls: 16,
        xl: 32,
        xxl: 64,
    },
    fontSizes: {
        none: 0,
        xs: 2,
        sm: 4,
        md: 8,
        ls: 16,
        xl: 32,
        xxl: 64,
    },
    fonts: {
        body: typography.FONT_FAMILY_REGULAR,
        heading: typography.FONT_FAMILY_BOLD,
    },
};

export { theme };
