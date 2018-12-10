import { PasswordPolicy } from "../passwordPolicy/passwordPolicy";

export type AccountMfaStatusEnum = "enforced" | "optional";

export type AccountStatusEnum = "ACTIVE" | "ENROLLING" | "RESTRICTED" | "SUSPENDED";

export interface AccountCreateRequest {
    readonly addressLine1?: string;
    readonly addressLine2?: string;
    readonly adminEmail?: string;
    readonly adminFullName?: string;
    readonly adminName?: string;
    readonly adminPassword?: string;
    readonly aliases?: Array<string>;
    readonly city?: string;
    readonly company?: string;
    readonly contact?: string;
    readonly contractNumber?: string;
    readonly country?: string;
    readonly customerNumber?: string;
    readonly displayName?: string;
    readonly endMarket?: string;
    readonly email?: string;
    readonly phoneNumber?: string;
    readonly postalCode?: string;
    readonly state?: string;
}

export interface AccountUpdateRequest {
    readonly addressLine1?: string;
    readonly addressLine2?: string;
    readonly aliases?: Array<string>;
    readonly city?: string;
    readonly company?: string;
    readonly contact?: string;
    readonly contractNumber?: string;
    readonly country?: string;
    readonly customFields?: { [key: string]: string };
    readonly customerNumber?: string;
    readonly displayName?: string;
    readonly email?: string;
    readonly endMarket?: string;
    readonly expirationWarningThreshold?: string;
    readonly idleTimeout?: string;
    readonly mfaStatus?: AccountMfaStatusEnum;
    readonly notificationEmails?: Array<string>;
    readonly passwordPolicy?: PasswordPolicy;
    readonly phoneNumber?: string;
    readonly postalCode?: string;
    readonly salesContact?: string;
    readonly state?: string;
}
