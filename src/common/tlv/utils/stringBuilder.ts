export class StringBuilder {
    private buffer: Array<string>;

    public constructor(initialValue?: string | null | undefined) {
        this.buffer = initialValue ? [initialValue] : [];
    }

    public get isEmpty() {
        return this.buffer.length === 0;
    }

    public get last() {
        if (this.isEmpty) {
            return undefined;
        }

        const text = this.toString();
        return text[text.length - 1];
    }

    public append(text: string): void;
    public append(count: number, text?: string): void;
    public append(a: string | number, b?: string): void {
        if (b === undefined && typeof a === "string") {
            this.buffer.push(a);
        } else if (typeof a === "number") {
            this.buffer.push(Array(a + 1).join(b));
        }
    }

    public appendLine(text: string) {
        this.buffer.push(text, "\n");
    }

    public toString() {
        return this.buffer.join("");
    }

    public clear(initialValue: string = "") {
        const value = this.toString();

        if (initialValue) {
            this.buffer = [initialValue];
        } else {
            this.buffer.length = 0;
        }

        return value;
    }
}
