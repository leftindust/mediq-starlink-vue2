export class Lazy<T> {
    private readonly resolver: () => T | Promise<T>
    private cachedValue: T | Promise<T> | undefined
    private isCached = () => typeof this.cachedValue != 'undefined'

    constructor(resolver: () => T | Promise<T>) {
        this.resolver = resolver
    }

    resolve = async () => this.resolver()
    getOrUndefined = async () => this.cachedValue
    getOrResolve = async () => {
        if (!this.isCached()) {
            this.cachedValue = this.resolver()
        }
        return this.cachedValue as T
    }
}