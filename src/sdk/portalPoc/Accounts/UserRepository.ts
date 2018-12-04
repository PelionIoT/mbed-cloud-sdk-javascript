import { Config } from "../..";
import { User as UserEntity } from "../../generated";
import { User, UserUpdateRequest } from "./User";
import { ListOptions } from "../../../common/interfaces";
import { Paginator } from "../../../common/pagination";

export interface ListUsersParameters extends ListOptions {
    statusEq?: string;
}

export class UserRepository {
    constructor(
        private readonly config: Config
    ) {}

    public list(parameters: ListUsersParameters = {}): Paginator<User, ListUsersParameters> {
        // TODO: Make API call and parse response & error here
        const entity = new UserEntity(this.config);
        return entity.list(parameters);
    }

    public get(id: string): Promise<User> {
        // TODO: Make API call and parse response & error here
        const entity = new UserEntity(this.config);
        entity.id = id;
        return entity.get().then(this.mapEntity);
    }

    public delete(id: string): Promise<void> {
        // TODO: Make API call and parse response & error here
        const entity = new UserEntity(this.config);
        entity.id = id;
        // tslint:disable-next-line:no-empty
        return entity.delete().then(() => {});
    }

    public update(id: string, request: UserUpdateRequest): Promise<User> {
        // TODO: Make API call and parse response & error here
        const entity = new UserEntity(this.config);
        entity.id = id;
        entity.fullName = request.fullName;
        entity.email = request.email;
        return entity.update().then(this.mapEntity);
    }

    private mapEntity(entity: UserEntity): User {
        return {
            accountId: entity.accountId,
            address: entity.address,
            createdAt: entity.createdAt,
            creationTime: entity.creationTime,
            email: entity.email,
            emailVerified: entity.emailVerified,
            fullName: entity.fullName,
            groups: entity.groups,
            id: entity.id,
            lastLoginTime: entity.lastLoginTime,
            loginHistory: entity.loginHistory.map(history => ({ date: history.date, ipAddress: history.ipAddress, success: history.success, userAgent: history.userAgent })),
            marketingAccepted: entity.marketingAccepted,
            password: entity.password,
            passwordChangedTime: entity.passwordChangedTime,
            phoneNumber: entity.phoneNumber,
            status: entity.status
        };
    }
}
