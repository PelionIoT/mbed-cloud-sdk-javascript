export type ApiKeyOrderEnum = "ASC" | "DESC";

export type ApiKeyStatusEnum = "ACTIVE" | "INACTIVE";

export type CertificateEnrollmentEnrollResultEnum = "failure" | "forbidden" | "not_found" | "success";

export type CertificateEnrollmentEnrollStatusEnum = "completed" | "new";

export type CertificateIssuerIssuerTypeEnum = "CFSSL_AUTH" | "GLOBAL_SIGN";

export type EnrollmentBulkCreateTaskStatusEnum = "completed" | "new" | "processing";

export type EnrollmentBulkDeleteTaskStatusEnum = "completed" | "new" | "processing";

export type EnrollmentClaimOrderEnum = "ASC" | "DESC";

export type MyAccountMfaStatusEnum = "enforced" | "optional";

export type MyAccountStatusEnum = "ACTIVE" | "ENROLLING" | "RESTRICTED" | "SUSPENDED";

export type MyApiKeyOrderEnum = "ASC" | "DESC";

export type MyApiKeyStatusEnum = "ACTIVE" | "INACTIVE";

export type PolicyGroupOrderEnum = "ASC" | "DESC";

export type SubtenantAccountMfaStatusEnum = "enforced" | "optional";

export type SubtenantAccountOrderEnum = "ASC" | "DESC";

export type SubtenantAccountStatusEnum = "ACTIVE" | "ENROLLING" | "RESTRICTED" | "SUSPENDED";

export type TrustedCertificateOrderEnum = "ASC" | "DESC";

export type TrustedCertificateServiceEnum = "bootstrap" | "lwm2m";

export type TrustedCertificateStatusEnum = "ACTIVE" | "INACTIVE";

export type UserOrderEnum = "ASC" | "DESC";

export type UserStatusEnum = "ACTIVE" | "ENROLLING" | "INACTIVE" | "INVITED" | "RESET";
