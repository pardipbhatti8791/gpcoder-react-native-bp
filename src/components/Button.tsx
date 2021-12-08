import { useTheme } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { typography } from '@/theme';

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        padding: 10,
        width: '100%',
    },
    viewbutton: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderWidth: 1,
        padding: 2,
    },
});

export function Button({ color, style, textStyle, title, ...rest }) {
    const { colors } = useTheme();

    return (
        <TouchableOpacity
            style={[styles.button, { borderColor: '#1C78DE' }, style]}
            {...rest}>
            <Text style={[{ color: '#FFFFFF' }, typography.label, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

export function ViewButton({ color, style, textStyle, title }) {
    return (
        <TouchableOpacity
            style={[styles.viewbutton, { borderColor: '#FFFFFF' }, style]}>
            <Text style={[{ color: '#FFFFFF' }]}>View Image</Text>
        </TouchableOpacity>
    );
}

Button.propTypes = {
    style: PropTypes.object,
    textStyle: PropTypes.object,
    title: PropTypes.string.isRequired,
};

Button.defaultProps = {
    style: null,
    textStyle: null,
};
