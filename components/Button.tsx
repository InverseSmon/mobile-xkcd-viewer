import React from "react";
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
} from "react-native";

interface ButtonProps {
    onPress: () => void;
    title: string;
    buttonStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
    onPress,
    title,
    buttonStyle,
    textStyle,
}) => {
    const styles = StyleSheet.create({
        button: {
            // padding: 5,
            margin: 5,
            borderRadius: 5,
        },
        text: {
            textAlign: "center",
            fontSize: 20,
        },
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            style={StyleSheet.flatten([styles.button, buttonStyle])}
        >
            <Text style={StyleSheet.flatten([styles.text, textStyle])}>
                {title}
            </Text>
        </TouchableOpacity>
    );
};
