import CollectionController from "@/engine/controls/interfaces/NumberControl";
import {StarlinkControl} from "@/engine/controls/StarlinkControl";

export class CollectionControl extends StarlinkControl {
    constructor(emitter, ikey, collection, change = () => this.onChange()) {
        super(ikey);
        this.render = 'vue';
        this.component = CollectionController;
        this.props = {
            emitter,
            ikey,
            readonly: true,
            collection,
            change
        };
    }

    setValue(value) {
        const ctx = this.vueContext || this.props;
        ctx.value = value
    }
}