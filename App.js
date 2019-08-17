// @flow
/* eslint-disable no-console, func-names */
import * as React from "react";
import {StatusBar, Platform} from "react-native";
import {StyleProvider} from "native-base";
import {
    createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator
} from "react-navigation";
import {AppLoading} from "expo";
import {useStrict} from "mobx";
import {Provider, inject} from "mobx-react/native";
import {Feather} from "@expo/vector-icons";
import * as Font from "expo-font";

import {Images, Firebase, FeedStore} from "./src/components";
import type {ScreenProps} from "./src/components/Types";

import {Welcome} from "./src/welcome";
import {Walkthrough} from "./src/walkthrough";
import {SignUpName, SignUpEmail, SignUpPassword, Login} from "./src/sign-up";
import {
    Profile, Explore, Share, SharePicture, HomeTab, Comments, Settings, ProfileStore
} from "./src/home";

import getTheme from "./native-base-theme/components";
import variables from "./native-base-theme/variables/commonColor";

// $FlowFixMe
const SFProTextMedium = require("./assets/fonts/SF-Pro-Text-Medium.otf");
// $FlowFixMe
const SFProTextHeavy = require("./assets/fonts/SF-Pro-Text-Heavy.otf");
// $FlowFixMe
const SFProTextBold = require("./assets/fonts/SF-Pro-Text-Bold.otf");
// $FlowFixMe
const SFProTextSemibold = require("./assets/fonts/SF-Pro-Text-Semibold.otf");
// $FlowFixMe
const SFProTextRegular = require("./assets/fonts/SF-Pro-Text-Regular.otf");
// $FlowFixMe
const SFProTextLight = require("./assets/fonts/SF-Pro-Text-Light.otf");

useStrict(true);

const originalSend = XMLHttpRequest.prototype.send;
// https://github.com/firebase/firebase-js-sdk/issues/283
// $FlowFixMe
XMLHttpRequest.prototype.send = function (body: string) {
    if (body === "") {
        originalSend.call(this);
    } else {
        originalSend.call(this, body);
    }
};

// https://github.com/firebase/firebase-js-sdk/issues/97
if (!console.ignoredYellowBox) {
    // $FlowFixMe
    console.ignoredYellowBox = [];
}
// $FlowFixMe
console.ignoredYellowBox.push("Setting a timer");

@inject("profileStore", "feedStore", "userFeedStore")
class Loading extends React.Component<ScreenProps<>> {

    async componentDidMount(): Promise<void> {
        const {navigation, profileStore, feedStore, userFeedStore} = this.props;
        await Loading.loadStaticResources();
        Firebase.init();
        Firebase.auth.onAuthStateChanged(user => {
            const isUserAuthenticated = !!user;
            if (isUserAuthenticated) {
                const {uid} = Firebase.auth.currentUser;
                const feedQuery = Firebase.firestore
                    .collection("feed")
                    .orderBy("timestamp", "desc");
                const userFeedQuery = Firebase.firestore
                    .collection("feed")
                    .where("uid", "==", uid)
                    .orderBy("timestamp", "desc");
                profileStore.init();
                feedStore.init(feedQuery);
                userFeedStore.init(userFeedQuery);
                navigation.navigate("Home");
            } else {
                navigation.navigate("Welcome");
            }
        });
    }

    static async loadStaticResources(): Promise<void> {
        try {
            const images = Images.downloadAsync();
            const fonts = Font.loadAsync({
                "SFProText-Medium": SFProTextMedium,
                "SFProText-Heavy": SFProTextHeavy,
                "SFProText-Bold": SFProTextBold,
                "SFProText-Semibold": SFProTextSemibold,
                "SFProText-Regular": SFProTextRegular,
                "SFProText-Light": SFProTextLight
            });
            const icons = Font.loadAsync(Feather.font);
            await Promise.all([...images, fonts, icons]);
        } catch (error) {
            console.error(error);
        }
    }

    render(): React.Node {
        return <AppLoading />;
    }
}

// eslint-disable-next-line react/no-multi-comp
export default class App extends React.Component<{}> {

    profileStore = new ProfileStore();
    feedStore = new FeedStore();
    userFeedStore = new FeedStore();

    componentDidMount() {
        StatusBar.setBarStyle("dark-content");
        if (Platform.OS === "android") {
            StatusBar.setBackgroundColor("white");
        }
    }

    render(): React.Node {
        const {feedStore, profileStore, userFeedStore} = this;
        return (
            <StyleProvider style={getTheme(variables)}>
                <Provider {...{feedStore, profileStore, userFeedStore}}>
                    <AppNavigator onNavigationStateChange={() => undefined} />
                </Provider>
            </StyleProvider>
        );
    }
}

const StackNavigatorOptions = {
    headerMode: "none",
    cardStyle: {
        backgroundColor: "white"
    }
};

const ExploreNavigator = createStackNavigator({
    Explore: { screen: Explore },
    Comments: { screen: Comments }
}, StackNavigatorOptions);

const ProfileNavigator = createStackNavigator({
    Profile: { screen: Profile },
    Settings: { screen: Settings },
    Comments: { screen: Comments }
}, StackNavigatorOptions);

const ShareNavigator = createStackNavigator({
    Share: { screen: Share },
    SharePicture: { screen: SharePicture }
}, StackNavigatorOptions);

const HomeTabs = createBottomTabNavigator({
    Explore: { screen: ExploreNavigator },
    Share: { screen: ShareNavigator },
    Profile: { screen: ProfileNavigator }
}, {
    animationEnabled: true,
    tabBarComponent: HomeTab,
    tabBarPosition: "bottom",
    swipeEnabled: false
});

const HomeNavigator = createSwitchNavigator({
    Walkthrough: { screen: Walkthrough },
    Home: { screen: HomeTabs }
}, StackNavigatorOptions);

const SignUpNavigator = createStackNavigator({
    SignUp: { screen: SignUpName },
    SignUpEmail: { screen: SignUpEmail },
    SignUpPassword: { screen: SignUpPassword }
}, StackNavigatorOptions);

const AppNavigator = createAppContainer(createSwitchNavigator({
    Loading: { screen: Loading },
    Welcome: { screen: Welcome },
    Login: { screen: Login },
    SignUp: { screen: SignUpNavigator },
    Home: { screen: HomeNavigator }
}, StackNavigatorOptions));

export {AppNavigator};
