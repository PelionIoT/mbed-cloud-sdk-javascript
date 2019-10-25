import { Repository } from "../../../common/repository";
import { ServerCredentials } from "./serverCredentials";
/**
 *ServerCredentials repository
 */
export declare class ServerCredentialsRepository extends Repository {
    /**
     * getBootstrap
     */
    getBootstrap(): Promise<ServerCredentials>;
    /**
     * getLwm2m
     */
    getLwm2m(): Promise<ServerCredentials>;
}
