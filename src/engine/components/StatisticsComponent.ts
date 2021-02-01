import Rete from "rete";
import {NumberControl} from "../controls/NumberControl.js";
import {SelectControl} from "../controls/SelectControl.js";

import {NodeData, WorkerInputs, WorkerOutputs} from "rete/types/core/data";

import * as Socket from "../sockets";
import {StarlinkControl} from "@/engine/controls/StarlinkControl";
import {Node} from "rete/types/node";

export class StatisticsComponent extends Rete.Component {
    constructor() {
        super("Stats");
    }

    builder(node: Node): Promise<void> {
        const inp1 = new Rete.Input("collection1", "Collection1", Socket.collection);
        const inp2 = new Rete.Input("collection2", "Collection2", Socket.collection);
        const out = new Rete.Output("number", "Number", Socket.number);

        node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumberControl(this.editor, "preview", true))
            .addControl(new SelectControl(this.editor, "selected", ["Correlation"]))
            .addOutput(out);

        return Promise.resolve()
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
        const c1 = inputs["collection1"].length ? inputs["collection1"][0] as number[] : [];
        const c2 = inputs["collection1"].length ? inputs["collection1"][0] as number[] : [];

        let output;

        switch (node.data.selected) {
            case "Correlation":
                output = this.corr(c1, c2)
                break
            default:
                output = this.corr(c1, c2)
                break
        }


        (this?.editor
            ?.nodes
            ?.find(n => n.id == node.id)
            ?.controls.get("preview") as StarlinkControl)
            ?.setValue(output)

        outputs["number"] = output;
    }


    private corr(c1: number[], c2: number[]): number {
        const {min, pow, sqrt} = Math;
        const add = (a: number, b: number) => a + b;
        const n = min(c1.length, c2.length)
        if (n === 0) {
            return 0
        }
        [c1, c2] = [c1.slice(0, n), c2.slice(0, n)]
        const [sum1, sum2] = [c1, c2].map(l => l.reduce(add))
        const [pow1, pow2] = [c1, c2].map(l => l.reduce((a, b) => a + pow(b, 2), 0))
        const mulSum = c1.map((n, i) => n * c2[i]).reduce(add)
        const dense = sqrt((pow1 - pow(sum1, 2) / n) * (pow2 - pow(sum2, 2) / n))
        if (dense === 0) {
            return 0
        }
        return (mulSum - (sum1 * sum2 / n)) / dense
    }
}