import {Control} from "rete";

export class StarlinkControl extends Control {
    setValue(value) {
        throw Error("this should be overridden in subclass")
    }
    onChange() {
        throw Error("this should be overridden in subclass")
    }
}