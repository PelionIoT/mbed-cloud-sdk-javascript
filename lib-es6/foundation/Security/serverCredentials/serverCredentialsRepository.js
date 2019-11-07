import { Repository } from "../../../common/repository";
import { apiWrapper } from "../../../legacy/common/functions";
import { ServerCredentialsAdapter } from "../../index";
/**
 *ServerCredentials repository
 */
export class ServerCredentialsRepository extends Repository {
    /**
     * getBootstrap
     */
    getBootstrap() {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/server-credentials/bootstrap",
                method: "GET",
            }, resultsFn);
        }, (data, done) => {
            done(null, ServerCredentialsAdapter.fromApi(data));
        });
    }
    /**
     * getLwm2m
     */
    getLwm2m() {
        return apiWrapper(resultsFn => {
            this.client._CallApi({
                url: "/v3/server-credentials/lwm2m",
                method: "GET",
            }, resultsFn);
        }, (data, done) => {
            done(null, ServerCredentialsAdapter.fromApi(data));
        });
    }
}
//# sourceMappingURL=serverCredentialsRepository.js.map