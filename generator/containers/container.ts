import * as prettier from "prettier";

export abstract class Container {

    public key: string;

    public abstract render(): Promise<string>;

    public prettify(code: string): string {
        return prettier.format(code, { tabWidth: 4, printWidth: 120, trailingComma: "es5", parser: "typescript" });
    }
}
