import { Observer } from "./observer";
export class MasterObserver extends Observer {
    constructor() {
        super();
    }
    /**
     * Stop this observer from receiving notifications
     */
    unsubscribe() {
        super.clearListeners();
    }
}
//# sourceMappingURL=masterObserver.js.map