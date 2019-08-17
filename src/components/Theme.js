// @flow
type Typography = {
    fontFamily: string,
    fontSize: number,
    lineHeight: number
};

type Color = string;

type Theme = {
    palette: {
        primary: Color,
        info: Color,
        secondary: Color,
        success: Color,
        danger: Color,
        warning: Color,
        sidebar: Color,
        lightGray: Color,
        borderColor: Color,
        white: Color,
        black: Color
    },
    typography: {
        color: string,
        bold: string,
        semibold: string,
        normal: string,
        light: string,
        header1: Typography,
        header2: Typography,
        header3: Typography,
        large: Typography,
        regular: Typography,
        small: Typography,
        micro: Typography
    },
    spacing: {
        tiny: number,
        small: number,
        base: number,
        large: number,
        xLarge: number
    }
};

const theme: Theme = {
    palette: {
        primary: "#00AAFF",
        info: "#00A699",
        secondary: "#f7555c",
        success: "#5cb85c",
        danger: "#d93900",
        warning: "#f0ad4e",
        sidebar: "#484848",
        lightGray: "#BFBFBF",
        borderColor: "#F5F5F5",
        white: "white",
        black: "black"
    },
    typography: {
        color: "#666666",
        bold: "SFProText-Bold",
        semibold: "SFProText-Semibold",
        normal: "SFProText-Medium",
        light: "SFProText-Light",
        header1: {
            fontSize: 48,
            lineHeight: 58,
            fontFamily: "SFProText-Heavy"
        },
        header2: {
            fontSize: 36,
            lineHeight: 43,
            fontFamily: "SFProText-Heavy"
        },
        header3: {
            fontSize: 24,
            lineHeight: 28,
            fontFamily: "SFProText-Heavy"
        },
        large: {
            fontSize: 14,
            lineHeight: 21,
            fontFamily: "SFProText-Heavy"
        },
        regular: {
            fontSize: 14,
            lineHeight: 21,
            fontFamily: "SFProText-Medium"
        },
        small: {
            fontSize: 14,
            lineHeight: 18,
            fontFamily: "SFProText-Regular"
        },
        micro: {
            fontSize: 8,
            lineHeight: 8,
            fontFamily: "SFProText-Bold"
        }
    },
    spacing: {
        tiny: 8,
        small: 16,
        base: 24,
        large: 48,
        xLarge: 64
    }
};

export { theme as Theme };
