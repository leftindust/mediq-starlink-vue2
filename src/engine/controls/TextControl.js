import Rete from "rete";
import VueTextControl from "./interfaces/TextControl.vue";
import {StarlinkControl} from "@/engine/controls/StarlinkControl";

export class TextControl extends StarlinkControl {
    constructor(emitter, key, readonly) {
        super(key);
        this.component = VueTextControl;
        this.props = { emitter, ikey: key, readonly, change: () => this.onChange() };
    }

    setValue(value) {
        const ctx = this.vueContext || this.props;
        ctx.value = value;
    }

    onChange() {
        //Event        
    }
}
