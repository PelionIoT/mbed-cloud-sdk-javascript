import * as fs from "fs-extra";

export class File {
    public fileName: string;
    public folder: string;
    public content: string;

    constructor(fileName: string, folder: string, content: string) {
        this.fileName = fileName;
        this.folder = folder;
        this.content = content;
    }

    public writeFile(): void {
        const filePath = `${this.folder}/${this.fileName}.ts`;
        fs.createFileSync(filePath);
        fs.writeFileSync(filePath, this.content);
    }
}
