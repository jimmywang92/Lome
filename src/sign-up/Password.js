// @flow
import autobind from "autobind-decorator";
import * as React from "react";

import {TextField, Firebase} from "../components";

import SignUpStore from "./SignUpStore";
import SignUpContainer from "./SignUpContainer";

import type {NavigationProps} from "../components/Types";
import type {Profile} from "../components/Model";

type PasswordState = {
    password: string,
    loading: boolean
};

export default class Password extends React.Component<NavigationProps<*>, PasswordState> {

    state = {
        password: "",
        loading: false
    };

    @autobind
    setPassword(password: string) {
        this.setState({ password });
    }

    @autobind
    async next(): Promise<void> {
        const {password} = this.state;
        const {email, displayName} = SignUpStore;
        try {
            if (password === "") {
                throw new Error("Please provide a password.");
            }
            this.setState({ loading: true });
            const user = await Firebase.auth.createUserWithEmailAndPassword(email, password);
            const profile: Profile = {
                name: displayName,
                outline: "Location Meet",
                picture: {
                    // eslint-disable-next-line max-len
                    uri: "https://firebasestorage.googleapis.com/v0/b/lome-1dd8e.appspot.com/o/679abf03-62a8-6838-fc11-c71da01c44fb?alt=media&token=2f9962d9-39ac-4480-8bf1-0b6b7b42a3e4",
                    preview: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAABaADAAQAAAABAAAABQAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgABQAFAwERAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/dAAQAAf/aAAwDAQACEQMRAD8A/Ln9lr/gq/47/Y/+EmmfCrR/gL8DfiTpF/qF74/tdW8d+FrDUNa0y58eR2viXVdFtLi40y9hh0K01O/uZtL0+zgsreya5utkRSZI4PyzKONuIsJhnlkM1zKGFyyrXwmDp0MdVoxp0KWJr0+Vw5KkW3Km6jkuVtzfNzNKUvucw4XyjE1/r9fL8trV8fGnia062X0qknUqUaM9JqpB2UZRgk9EoLl5U+SP/9k="
                }
            };
            await Firebase.firestore.collection("users").doc(user.user.uid).set(profile);
        } catch (e) {
            // eslint-disable-next-line no-alert
            alert(e);
            this.setState({ loading: false });
        }
    }

    render(): React.Node {
        const {navigation} = this.props;
        const {loading} = this.state;
        return (
            <SignUpContainer title="Your Password" subtitle="Stay Safe" next={this.next} {...{ navigation, loading }}>
                <TextField
                    secureTextEntry
                    placeholder="Password"
                    contrast
                    autoCapitalize="none"
                    autoCorrect={false}
                    returnKeyType="go"
                    onSubmitEditing={this.next}
                    onChangeText={this.setPassword}
                />
            </SignUpContainer>
        );
    }
}
