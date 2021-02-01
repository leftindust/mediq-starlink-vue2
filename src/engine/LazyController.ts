import {Lazy} from "@/engine/Lazy";

export class LazyController {
    private children: Lazy<any>[] = []

    async evaluate() {
        await Promise.all(
            this.children.map(child => {
                child.resolve()
            })
        )
    }

    register(id: number, instance: Lazy<any>) {
        this.children[id] = instance
    }
}