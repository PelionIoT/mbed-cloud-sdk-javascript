import { User, Certificate } from "../entities";

export function subtenantAccountSwitchCreate(self: User, action: string) {
    if (self.accountId) {
        // tslint:disable-next-line:no-string-literal
        return self["createOnSubtenant"](action);
    }

    // tslint:disable-next-line:no-string-literal
    return self["createOnAggregator"](action);
}

export function subtenantAccountSwitchGet(self: User) {
    if (self.accountId) {
        // tslint:disable-next-line:no-string-literal
        return self["getOnSubtenant"]();
    }

    // tslint:disable-next-line:no-string-literal
    return self["getOnAggregator"]();
}

export function certificateTypeGetter(self: Certificate) {
    return null;
}

export function certificateTypeSetter(self: Certificate, value: string) {
    return null;
}
