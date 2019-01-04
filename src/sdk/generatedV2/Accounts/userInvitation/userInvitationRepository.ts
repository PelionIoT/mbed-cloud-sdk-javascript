import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../../common/functions";
import { UserInvitation } from "./userInvitation";
import { UserInvitationCreateRequest } from "./types";
/**
 *UserInvitation repository
 */
export class UserInvitationRepository extends Repository {
    public create(request: UserInvitationCreateRequest): Promise<UserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/user-invitations",
                        method: "POST",
                        body: {
                            email: request.email,
                            login_profiles: request.loginProfiles,
                            valid_for_days: request.validForDays,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public delete(id: string): Promise<void> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/user-invitations/{invitation_id}",
                        method: "DELETE",
                        pathParams: {
                            invitation_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
    public get(id: string): Promise<UserInvitation> {
        return apiWrapper(
            resultsFn => {
                this.client._CallApi(
                    {
                        url: "/v3/user-invitations/{invitation_id}",
                        method: "GET",
                        pathParams: {
                            invitation_id: id,
                        },
                    },
                    resultsFn
                );
            },
            (_data, done) => {
                done(null, null);
            }
        );
    }
}
