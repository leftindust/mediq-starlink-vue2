import Rete from "rete";
import {Node} from "rete/types/node"
import {NodeData, WorkerInputs, WorkerOutputs} from "rete/types/core/data";
import {collection, number} from "@/engine/sockets";
import {Lazy} from "@/engine/Lazy";
import {LazyController} from "@/engine/LazyController";
import {StarlinkControl} from "@/engine/controls/StarlinkControl";
import {TextControl} from "@/engine/controls/TextControl";


export abstract class AbstractCollectionComponent<T> extends Rete.Component {
    private prevAmount: undefined | number
    private collection: Lazy<T[]> = new Lazy<T[]>(() => [])
    private readonly eager: boolean;
    private lazyController: LazyController | null;
    private readonly lazyId: number;

    protected constructor(name: string, lazyController: LazyController | null) {
        super(name);
        this.eager = !lazyController
        this.lazyController = lazyController
        this.lazyId = Math.floor(Math.random() * 10000)
    }

    builder(node: Node): Promise<void> {
        const amountInput = new Rete.Input("amount", "amount", number)
        const lengthOutput = new Rete.Output("length", "length", number)
        const collectionOutput = new Rete.Output("collection", "collection", collection)
        const collectionControl = new TextControl(this.editor, "preview", true)

        node
            .addInput(amountInput)
            .addOutput(collectionOutput)
            .addOutput(lengthOutput)
            .addControl(collectionControl)

        return Promise.resolve()
    }

    async worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs): Promise<void> {
        if (inputs["amount"][0] && inputs["amount"][0] != this.prevAmount) {
            this.prevAmount = inputs["amount"][0] as number
            this.collection = new Lazy<T[]>(() => this.populateCollection(inputs["amount"][0] as number))
            this.lazyController?.register(this.lazyId, this.collection)
        }
        if (this.eager) {
            await this.collection.resolve()
        }
        const lazyCollection = await this.collection.getOrUndefined();
        outputs["length"] = lazyCollection?.length;
        outputs["collection"] = lazyCollection;

        (this?.editor
            ?.nodes
            ?.find(n => n.id == node.id)
            ?.controls.get("preview") as StarlinkControl)
            ?.setValue(JSON.stringify(lazyCollection));
    }

    abstract async populateCollection(amount: number): Promise<T[]>
}