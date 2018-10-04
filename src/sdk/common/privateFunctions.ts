import { User, Certificate, CertificateCertificateTypeEnum, MyAccount, ServerCredentials } from "../entities";

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

export function certificateTypeGetter(self: Certificate): CertificateCertificateTypeEnum {
    if (self.deviceExecutionMode) {
        if (self.deviceExecutionMode === 1) {
            return "DEVELOPER";
        }
    }

    return self.service === "lwm2m" ? "LWM2M" : "BOOTSTRAP";
}

export function certificateTypeSetter(self: Certificate, value: CertificateCertificateTypeEnum) {
    switch (value) {
        case "DEVELOPER":
            self.deviceExecutionMode = 1;
            self.service = "bootstrap";
            break;
        case "BOOTSTRAP":
            self.deviceExecutionMode = 0;
            self.service = "bootstrap";
            break;
        case "LWM2M":
            self.deviceExecutionMode = 0;
            self.service = "lwm2m";
        default:
            break;
    }
}

export function createAnyCertificate(self: Certificate, signature: string) {
    // tslint:disable-next-line:no-string-literal
    return self["createStandard"](signature);
}

export function getAnyCertificate(self: Certificate) {
    // tslint:disable-next-line:no-string-literal
    return self["getDeveloper"](self.id);
}

export function extendUpdateResponse(self: Certificate, signature: string) {
    extendCertificate(self);
    return self.update(signature);
}

async function extendCertificate(self: Certificate) {
    if (self.deviceExecutionMode === 1) {
        // tslint:disable-next-line:no-string-literal
        return self["getDeveloper"](self.id);
    }

    if (self.service === "bootstrap") {
        const credentials = await new ServerCredentials().getBootstrap();
        self.certificate = credentials.serverCertificate;
        return self;
    }

    if (self.service === "lwm2m") {
        const credentials = await new ServerCredentials().getLwm2m();
        self.certificate = credentials.serverCertificate;
        return self;
    }
}
