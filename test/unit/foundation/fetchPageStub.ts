import { ListOptions } from "../../../src/legacy/common/interfaces";
import { Page } from "../../../src";
import { Entity } from "../../../src/common/entity";

export class FetchPageStub {

    private allData = [
        {
            id: "AAAA"
        },
        {
            id: "AAAB"
        },
        {
            id: "AAAC"
        },
        {
            id: "AAAD"
        },
        {
            id: "AAAE"
        },
        {
            id: "AAAF"
        },
        {
            id: "AAAG"
        },
        {
            id: "AAAH"
        },
        {
            id: "AAAI"
        },
        {
            id: "AAAJ"
        },
        {
            id: "AAAK"
        },
        {
            id: "AAAL"
        },
    ];

    private afters = [
        "AAAC",
        "AAAF",
        "AAAI",
        null
    ];

    private index = 0;

    public getDataFunc = () => {
        return (_options: ListOptions) => {
            return Promise.resolve(new Page<Entity>({
                total_count: 12,
                has_more: this.index < 3,
                limit: 3,
                order: "ASC",
                after: this.afters[this.index++],
            },
                this.allData.slice(this.index * 3, (this.index * 3) + 2)
            ));
        };

    }
}
