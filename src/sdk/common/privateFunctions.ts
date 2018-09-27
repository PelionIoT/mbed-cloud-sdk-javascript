import { User } from "../entities";

export function subtenantAccountSwitchCreate(self: User, action: string) {
    if (self.accountId) {
        return self.createOnSubtenant(action);
    }

    return self.createOnAggregator(action);
}

export function subtenantAccountSwitchGet(self: User) {
    if (self.accountId) {
        return self.getOnSubtenant();
    }

    return self.getOnAggregator();
}
