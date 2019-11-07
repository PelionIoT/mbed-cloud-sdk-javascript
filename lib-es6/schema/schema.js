export class Schema {
    getMethod(name) {
        return this.methods.filter(m => m.name === name).pop();
    }
    getMethods() {
        return this.methods.map(m => m.name);
    }
    doesMethodExist(name) {
        return this.methods.some(m => m.name === name);
    }
}
//# sourceMappingURL=schema.js.map