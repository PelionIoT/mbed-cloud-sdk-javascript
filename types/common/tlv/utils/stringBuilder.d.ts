export declare class StringBuilder {
    private buffer;
    constructor(initialValue?: string | null | undefined);
    get isEmpty(): boolean;
    get last(): string;
    append(text: string): void;
    append(count: number, text?: string): void;
    appendLine(text: string): void;
    toString(): string;
    clear(initialValue?: string): string;
}
