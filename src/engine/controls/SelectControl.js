import Rete from "rete";
import SelectController from "./interfaces/SelectControl.vue";

export class SelectControl extends Rete.Control {
    constructor(emitter, ikey, selections) {
        super(ikey);
        this.render = 'vue';
        this.component = SelectController;
        this.props = {
            emitter,
            ikey,
            selections,
            change: () => this.onChange()
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