import { EntityBase } from "../../../common/entityBase";
import { ConnectionOptions, ListOptions } from "../../../../common/interfaces";
import { Config } from "../../../client/config";
import { apiWrapper } from "../../../../common/functions";
import { Client } from "../../../client/client";
export class SubtenantAccount extends EntityBase {
    public readonly _renames: { [key: string]: string } = {
    };
    public readonly _foreignKeys: { [key: string]: { [key: string]: any } } = {
        SubtenantAccount: {
            type: SubtenantAccount,
            array: true,
        }
    };
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public addressLine1?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public addressLine2?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public adminEmail?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public adminFullName?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public adminId?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public adminKey?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public adminName?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public adminPassword?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public aliases?: Array<string>;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public city?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public company?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public contact?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public contractNumber?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public country?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public createdAt?: Date;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public customFields?: any;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public customerNumber?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public displayName?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public email?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public endMarket?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public expirationWarningThreshold?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public idleTimeout?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public limits?: any;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public mfaStatus?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public notificationEmails?: Array<string>;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public parentId?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public passwordPolicy?: any;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public phoneNumber?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public policies?: Array<undefined>;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public postalCode?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public reason?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public referenceNote?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public salesContact?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public state?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public status?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public subAccounts?: Array<SubtenantAccount>;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public templateId?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public tier?: string;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public updatedAt?: Date;
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public upgradedAt?: Date;
    constructor(config?: ConnectionOptions | Config) {
        super();
        if (config instanceof Config) {
            this.config = config;
        } else {
            this.config = new Config(config);
        }
    }
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public create(action?: string): Promise<SubtenantAccount> {
        return apiWrapper(resultsFn => {
            Client.CallApi<SubtenantAccount>({
                url: "/v3/accounts",
                method: "POST",
                query: {
                    "action":
                        action,
                },
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public get(include?: string, properties?: string): Promise<SubtenantAccount> {
        return apiWrapper(resultsFn => {
            Client.CallApi<SubtenantAccount>({
                url: "/v3/accounts/{accountID}",
                method: "GET",
                query: {
                    "include":
                        include,
                    "properties":
                        properties,
                },
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
    /**
    * Gets a user
    * @returns Promise containing user
    */
    public update(): Promise<SubtenantAccount> {
        return apiWrapper(resultsFn => {
            Client.CallApi<SubtenantAccount>({
                url: "/v3/accounts/{accountID}",
                method: "PUT",
                config: this.config,
            }, this, resultsFn);
        }, (data, done) => {
            done(null, data);
        });
    }
}