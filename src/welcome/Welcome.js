// @flow
import autobind from "autobind-decorator";
import * as React from "react";
import {StyleSheet, Dimensions, Linking, TouchableOpacity} from "react-native";

import {Text, Button, Container, Logo, Theme, AnimatedView, Firebase, serializeException} from "../components";
import type {ScreenProps} from "../components/Types";

export default class Welcome extends React.Component<ScreenProps<>> {

    @autobind
    signUp() {
        this.props.navigation.navigate("SignUp");
    }

    @autobind
    login() {
        this.props.navigation.navigate("Login");
    }

    render(): React.Node {
        return (
            <Container gutter={2} style={styles.root}>
                <Logo />
                <AnimatedView style={styles.container}>
                    <Text type="header1" style={styles.header}>Lome</Text>
                </AnimatedView>
                <AnimatedView style={styles.container} delay={600} duration={300}>
                    <Button label="Login" onPress={this.login} full primary />
                    {/* <Button label="Login Anonymously" onPress={loginAnonymously} full /> */}
                    <Button label="Sign Up" onPress={this.signUp} full />
                </AnimatedView>
                <TouchableOpacity style={styles.framer} onPress={framer}>
                    <Text style={styles.framerText}>Designed by Jimmy</Text>
                </TouchableOpacity>
            </Container>
        );
    }
}

const framer = () => Linking.openURL("https://framer.com/fiber");
// const loginAnonymously = async (): Promise<void> => {
//     try {
//         await Firebase.auth.signInAnonymously();
//     } catch (e) {
//         // eslint-disable-next-line no-alert
//         alert(serializeException(e));
//     }
// };
const {width} = Dimensions.get("window");
const styles = StyleSheet.create({
    root: {
        justifyContent: "flex-end",
        alignItems: "center"
    },
    container: {
        alignSelf: "stretch"
    },
    header: {
        textAlign: "center",
        marginTop: Theme.spacing.base * 2,
        marginBottom: Theme.spacing.base * 2
    },
    framer: {
        position: "absolute",
        bottom: Theme.spacing.tiny,
        width
    },
    framerText: {
        textAlign: "center",
        fontSize: 12
    }
});
