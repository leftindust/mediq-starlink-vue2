import {Lazy} from "@/engine/Lazy";

export class LazyController {
    private children: Lazy<any>[] = []
    public onEval: Function | undefined = undefined

    async evaluate() {
        await Promise.all(this.children.map(child => child.resolve()))
        this.onEval && this.onEval()
    }

    register(id: number, instance: Lazy<any>) {
        this.children[id] = instance
    }
}