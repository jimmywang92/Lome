// @flow
import { Asset } from "expo-asset";

import Cover from "../../../assets/images/trial.jpeg";

export default class Images {

    static cover = Cover;

    static downloadAsync(): Promise<*>[] {
        return [
            Asset.loadAsync(Images.cover)
        ];
    }
}
