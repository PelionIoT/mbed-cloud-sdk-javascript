export interface CertificateType {
    /**
     * UTC time of the entity creation.
     */
    "createdAt"?: string;
    /**
     * The developer certificate public key in raw format (65 bytes), Base64 encoded, NIST P-256 curve.
     */
    "publicKey"?: string;
    /**
     * Entity ID.
     */
    "id"?: string;
}
