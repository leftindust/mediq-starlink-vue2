
import Rete from "rete";
import { NumberControl } from "../controls/NumberControl.js";
import { SelectControl } from "../controls/SelectControl.js";

import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";

import * as Socket from "../sockets";

export class MathComponent extends Rete.Component {
    constructor() {
        super("Math");
    }

    builder(node: any) {
        const inp1 = new Rete.Input("number1", "LHS", Socket.number);
        const inp2 = new Rete.Input("number2", "RHS", Socket.number);
        const out = new Rete.Output("number", "Number", Socket.number);

        return node
            .addInput(inp1)
            .addInput(inp2)
            .addControl(new NumberControl(this.editor, "preview", true))
            .addControl(new SelectControl(this.editor, "selected", ["Addition", "Subtraction", "Multiplication", "Division"]))
            .addOutput(out);
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
        const n1 = inputs["number1"].length ? inputs["number1"][0] : node.data.number1;
        const n2 = inputs["number2"].length ? inputs["number2"][0] : node.data.number2;

        let sum;

        switch (node.data.selected) {
            case "Addition":
                sum = (n1 as number) + (n2 as number);
                break;
            case "Subtraction":
                sum = (n1 as number) - (n2 as number);
                break;
            case "Multiplication":
                sum = (n1 as number) * (n2 as number);
                break;
            case "Division":
                sum = (n1 as number) / (n2 as number);
                break;
            default:
                // Make sure a default calculation is set!!
                sum = (n1 as number) + (n2 as number);
                break;
        }


        (this as any).editor.nodes
            .find((n: any) => n.id == node.id)
            .controls.get("preview")
            .setValue(sum);

        outputs["number"] = sum;
    }
}