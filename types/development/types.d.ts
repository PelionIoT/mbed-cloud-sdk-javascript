export interface Certificate {
    /**
     * UTC time of the entity creation.
     */
    "created_at"?: string;
    /**
     * Currently not used.
     */
    "etag"?: string;
    /**
     * The developer certificate public key in raw format (65 bytes), Base64 encoded, NIST P-256 curve.
     */
    "pub_key"?: string;
    /**
     * Entity ID.
     */
    "id"?: string;
}
