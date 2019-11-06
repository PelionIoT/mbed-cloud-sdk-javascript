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
import { union } from "../../../common/utils";
import { ensureArray, matchWithWildcard } from "../../../legacy/common/functions";
import { ConnectApi } from "../../../legacy/connect/connectApi";
import {
    FirstValueEnum,
    NotificationData,
    PresubscriptionObject,
    presubscriptionsEqual,
    ResourceValuesFilter,
} from "../../../legacy/connect/types";
import { Observer } from "./observer";

export class ResourceValuesObserver extends Observer<NotificationData> {
    public firstValue: FirstValueEnum;

    public localPresubscriptions: Array<PresubscriptionObject>;

    private connect: ConnectApi;

    private filter: ResourceValuesFilter;

    constructor(_filter?: ResourceValuesFilter, _connect?: ConnectApi, firstValue: FirstValueEnum = "OnValueUpdate") {
        super();
        this.firstValue = firstValue;
        this.localPresubscriptions = new Array();
        if (_connect) {
            this.connect = _connect;
        }

        if (_filter) {
            this.filter = _filter;
            // create presubscriptions
            ensureArray(this.filter.deviceId).forEach(d => {
                this.localPresubscriptions.push({
                    deviceId: d,
                    resourcePaths: this.filter.resourcePaths || new Array(),
                });
            });
            this.syncPresubscriptions();
        }
    }

    /**
     * Notify this observer
     * @param data
     */
    public notify(data: NotificationData): void {
        if (this.subscribed) {
            if (this.localPresubscriptions.length === 0) {
                super.notify(data);
            }

            if (this.compareData(data)) {
                super.notify(data);
            }
        }
    }

    /**
     * Stop this observer from recieving notifications
     */
    public unsubscribe(): void {
        this.subscribed = false;
        super.clearListeners();
    }

    private compareData(data: NotificationData): boolean {
        return this.localPresubscriptions.some(sub => {
            return (
                matchWithWildcard(sub.deviceId, data.deviceId) &&
                (sub.resourcePaths.length === 0 || sub.resourcePaths.some(r => matchWithWildcard(r, data.path)))
            );
        });
    }

    private async syncPresubscriptions(): Promise<void> {
        if (this.connect) {
            this.connect
                .listPresubscriptions()
                .then(serverPresubscriptions =>
                    this.connect.updatePresubscriptions(
                        this.unionOfPresubscriptions(serverPresubscriptions, this.localPresubscriptions)
                    )
                );

            if (this.firstValue === "OnValueUpdate") {
                this.localPresubscriptions.forEach(p => {
                    this.connect.listConnectedDevices().then(devices => {
                        devices.data
                            .filter(device => matchWithWildcard(device.id, p.deviceId))
                            .forEach(m => {
                                m.listResources().then(r => {
                                    r.forEach(q => {
                                        if (
                                            p.resourcePaths.length === 0 ||
                                            p.resourcePaths.some(w => matchWithWildcard(w, q.path))
                                        ) {
                                            this.connect.addResourceSubscription(m.id, q.path);
                                        }
                                    });
                                });
                            });
                    });
                });
            }
        }
    }

    private unionOfPresubscriptions(server: Array<PresubscriptionObject>, local: Array<PresubscriptionObject>) {
        return union(server, local, presubscriptionsEqual);
    }
}
