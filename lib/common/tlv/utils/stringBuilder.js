"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringBuilder = /** @class */ (function () {
    function StringBuilder(initialValue) {
        this.buffer = initialValue ? [initialValue] : [];
    }
    Object.defineProperty(StringBuilder.prototype, "isEmpty", {
        get: function () {
            return this.buffer.length === 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringBuilder.prototype, "last", {
        get: function () {
            if (this.isEmpty) {
                return undefined;
            }
            var text = this.toString();
            return text[text.length - 1];
        },
        enumerable: true,
        configurable: true
    });
    StringBuilder.prototype.append = function (a, b) {
        if (b === undefined && typeof a === "string") {
            this.buffer.push(a);
        }
        else if (typeof a === "number") {
            this.buffer.push(Array(a + 1).join(b));
        }
    };
    StringBuilder.prototype.appendLine = function (text) {
        this.buffer.push(text, "\n");
    };
    StringBuilder.prototype.toString = function () {
        return this.buffer.join("");
    };
    StringBuilder.prototype.clear = function (initialValue) {
        if (initialValue === void 0) { initialValue = ""; }
        var value = this.toString();
        if (initialValue) {
            this.buffer = [initialValue];
        }
        else {
            this.buffer.length = 0;
        }
        return value;
    };
    return StringBuilder;
}());
exports.StringBuilder = StringBuilder;
//# sourceMappingURL=stringBuilder.js.map