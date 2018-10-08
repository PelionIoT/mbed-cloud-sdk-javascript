import { User, MyAccount, TrustedCertificate } from "../entities";

export async function subtenantAccountSwitchCreate(self: User, action: string) {
    const myAccount = await new MyAccount().get();
    if (self.accountId || self.id === myAccount.id) {
        // tslint:disable-next-line:no-string-literal
        return self["createOnSubtenant"](action);
    }

    // tslint:disable-next-line:no-string-literal
    return self["createOnAggregator"](action);
}

export async function subtenantAccountSwitchGet(self: User) {
    const myAccount = await new MyAccount().get();
    if (self.accountId || self.id === myAccount.id) {
        // tslint:disable-next-line:no-string-literal
        return self["getOnSubtenant"]();
    }

    // tslint:disable-next-line:no-string-literal
    return self["getOnAggregator"]();
}

export function developerCertificateGetter(self: TrustedCertificate) {
    return !!self.deviceExecutionMode;
}

export function developerCertificateSetter(self: TrustedCertificate, value: boolean): void {
    self.deviceExecutionMode = value ? 1 : 0;
    self.developer = value;
}
