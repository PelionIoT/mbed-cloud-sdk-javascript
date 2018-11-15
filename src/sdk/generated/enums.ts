export type AccountMfaStatusEnum = "enforced" | "optional";

export type AccountOrderEnum = "ASC" | "DESC";

export type AccountStatusEnum = "ACTIVE" | "ENROLLING" | "RESTRICTED" | "SUSPENDED";

export type ApiKeyOrderEnum = "ASC" | "DESC";

export type ApiKeyStatusEnum = "ACTIVE" | "INACTIVE";

export type CertificateEnrollmentEnrollResultEnum = "failure" | "forbidden" | "not_found" | "success";

export type CertificateEnrollmentEnrollStatusEnum = "completed" | "new";

export type CertificateEnrollmentIncludeEnum = "total_count";

export type CertificateEnrollmentOrderEnum = "ASC" | "DESC";

export type CertificateIssuerIssuerTypeEnum = "CFSSL_AUTH" | "GLOBAL_SIGN";

export type DeviceDeployedStateEnum = "development" | "production";

export type DeviceEnrollmentBulkCreateStatusEnum = "completed" | "new" | "processing";

export type DeviceEnrollmentBulkDeleteStatusEnum = "completed" | "new" | "processing";

export type DeviceEnrollmentOrderEnum = "ASC" | "DESC";

export type DeviceMechanismEnum = "connector" | "direct";

export type DeviceStateEnum = "bootstrapped" | "cloud_enrolling" | "deregistered" | "registered" | "unenrolled";

export type SubtenantTrustedCertificateServiceEnum = "bootstrap" | "lwm2m";

export type SubtenantTrustedCertificateStatusEnum = "ACTIVE" | "INACTIVE";

export type SubtenantUserStatusEnum = "ACTIVE" | "ENROLLING" | "INACTIVE" | "INVITED" | "RESET";

export type TrustedCertificateOrderEnum = "ASC" | "DESC";

export type TrustedCertificateServiceEnum = "bootstrap" | "lwm2m";

export type TrustedCertificateStatusEnum = "ACTIVE" | "INACTIVE";

export type UserInvitationOrderEnum = "ASC" | "DESC";

export type UserOrderEnum = "ASC" | "DESC";

export type UserStatusEnum = "ACTIVE" | "ENROLLING" | "INACTIVE" | "INVITED" | "RESET";
