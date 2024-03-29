import Rete from "rete";
import NumberController from "./interfaces/NumberControl.vue";
import {StarlinkControl} from "@/engine/controls/StarlinkControl";

export class NumberControl extends StarlinkControl {
    constructor(emitter, ikey, readonly = false, change = () => this.onChange()) {
        super(ikey);
        this.render = 'vue';
        this.component = NumberController;
        this.props = {
            emitter,
            ikey,
            readonly,
            change
        };
    }

    setValue(value) {
        const ctx = this.vueContext || this.props;
        ctx.value = value;
    }

    onChange() {
        console.log("Change triggered!")
    }
}