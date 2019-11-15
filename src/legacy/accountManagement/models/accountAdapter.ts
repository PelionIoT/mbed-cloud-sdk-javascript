/*
 * Pelion Device Management JavaScript SDK
 * Copyright Arm Limited 2017
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { AccountInfo as apiAccount, AccountUpdateReq as apiAccountRequest } from "../../_api/iam";
import { AccountManagementApi } from "../accountManagementApi";
import { UpdateAccountObject } from "../types";
import { Account } from "./account";
import { PolicyAdapter } from "./policyAdapter";

/**
 * Account Adapter
 */
export class AccountAdapter {
    public static map(from: apiAccount, api: AccountManagementApi): Account {
        let policies = [];
        if (from.policies) {
            policies = from.policies.map(policy => {
                return PolicyAdapter.map(policy);
            });
        }

        return new Account(
            {
                // parentId               : from.parent_id,
                // subAccounts            : from.sub_accounts,
                displayName: from.display_name,
                aliases: from.aliases,
                company: from.company,
                contact: from.contact,
                email: from.email,
                phoneNumber: from.phone_number,
                addressLine1: from.address_line1,
                addressLine2: from.address_line2,
                city: from.city,
                state: from.state,
                postcode: from.postal_code,
                country: from.country,
                id: from.id,
                status: from.status,
                tier: from.tier,
                limits: from.limits,
                policies,
                createdAt: from.created_at,
                upgradedAt: from.upgraded_at,
                reason: from.reason,
                templateId: from.template_id,
                customerNumber: from.customer_number,
                expiryWarning: from.expiration_warning_threshold,
                salesContactEmail: from.sales_contact,
                multifactorAuthenticationStatus: from.mfa_status,
                notificationEmails: from.notification_emails,
                referenceNote: from.reference_note,
                updatedAt: from.updated_at,
                contractNumber: from.contract_number,
            },
            api
        );
    }

    public static reverseMap(from: UpdateAccountObject): apiAccountRequest {
        return {
            display_name: from.displayName,
            aliases: from.aliases,
            company: from.company,
            contact: from.contact,
            email: from.email,
            phone_number: from.phoneNumber,
            address_line1: from.addressLine1,
            address_line2: from.addressLine2,
            city: from.city,
            state: from.state,
            postal_code: from.postcode,
            country: from.country,
            mfa_status: from.multifactorAuthenticationStatus,
            notification_emails: from.notificationEmails,
            expiration_warning_threshold: from.expiryWarning,
        };
    }
}
