import Rete from "rete";
import { NumberControl } from "../controls/NumberControl.js";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

import * as Socket from "../sockets";

export class NumberComponent extends Rete.Component {
    constructor() {
        super("Number");
    }

    builder(node: any) {
        const out1 = new Rete.Output("number", "Number", Socket.number);
        const ctrl = new NumberControl(this.editor, "number", false);
        return node.addControl(ctrl).addOutput(out1);
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
        outputs["number"] = node.data.number;
    }
}