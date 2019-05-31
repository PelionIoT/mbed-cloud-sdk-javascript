export abstract class Container {

    public key: string;

    public abstract render(): Promise<string>;
}
