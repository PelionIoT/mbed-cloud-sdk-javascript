export class StringBuilder {
    constructor(initialValue) {
        this.buffer = initialValue ? [initialValue] : [];
    }
    get isEmpty() {
        return this.buffer.length === 0;
    }
    get last() {
        if (this.isEmpty) {
            return undefined;
        }
        const text = this.toString();
        return text[text.length - 1];
    }
    append(a, b) {
        if (b === undefined && typeof a === "string") {
            this.buffer.push(a);
        }
        else if (typeof a === "number") {
            this.buffer.push(Array(a + 1).join(b));
        }
    }
    appendLine(text) {
        this.buffer.push(text, "\n");
    }
    toString() {
        return this.buffer.join("");
    }
    clear(initialValue = "") {
        const value = this.toString();
        if (initialValue) {
            this.buffer = [initialValue];
        }
        else {
            this.buffer.length = 0;
        }
        return value;
    }
}
//# sourceMappingURL=stringBuilder.js.map