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
import { Observer } from "./observer";
import { ensureArray, matchWithWildcard } from "../../../legacy/common/functions";
export class ResourceValuesObserver extends Observer {
    constructor(_filter, _connect, firstValue = "OnValueUpdate") {
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
                this.localPresubscriptions.push({ deviceId: d, resourcePaths: this.filter.resourcePaths || new Array() });
            });
            this.syncPresubscriptions();
        }
    }
    /**
     * Notify this observer
     * @param data
     */
    notify(data) {
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
    unsubscribe() {
        this.subscribed = false;
        super.clearListeners();
    }
    compareData(data) {
        return this.localPresubscriptions.some(sub => {
            return matchWithWildcard(sub.deviceId, data.deviceId) && (sub.resourcePaths.length === 0 || sub.resourcePaths.some(r => matchWithWildcard(r, data.path)));
        });
    }
    syncPresubscriptions() {
        if (this.connect) {
            this.connect.listPresubscriptions()
                .then(subs => {
                const concat = this.localPresubscriptions.concat(subs);
                const union = concat.filter((el, i, a) => i === a.indexOf(el));
                this.connect.updatePresubscriptions(union);
            });
            if (this.firstValue === "OnValueUpdate") {
                this.localPresubscriptions.forEach(p => {
                    this.connect.listConnectedDevices()
                        .then(devices => {
                        devices.data.filter(device => matchWithWildcard(device.id, p.deviceId))
                            .forEach(m => {
                            m.listResources()
                                .then(r => {
                                r.forEach(q => {
                                    if (p.resourcePaths.length === 0 || p.resourcePaths.some(w => matchWithWildcard(w, q.path))) {
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
}
//# sourceMappingURL=resourceValuesObserver.js.map