export class Lazy<T> {
    private readonly resolver: () => T | Promise<T>
    private cachedValue: T | Promise<T> | undefined
    private isCached = (): boolean => typeof this.cachedValue != 'undefined'


    constructor(resolver: () => T | Promise<T>) {
        this.resolver = resolver
    }

    resolve = async (): Promise<T> => {
        this.cachedValue = await this.resolver()
        return this.cachedValue
    }
    getOrUndefined = async () => this.cachedValue
    getOrResolve = async () => {
        if (!this.isCached()) {
            this.cachedValue = await this.resolve()
        }
        return this.cachedValue
    }
}