import Rete from "rete";
import CollectionController from "@/engine/controls/interfaces/NumberControl";

export class CollectionControl extends Rete.Control {
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
}