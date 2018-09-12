import superagent = require("superagent");
import { SdkApiBase } from "./sdkApiBase";

export class Client extends SdkApiBase {
    public static CallApi<T>(url?: string, method?: string, headers?: any, query?: any, formParams?: any, body?: T, callback?: (error: any, data?: T, response?: superagent.Response) => any, requestOptions?: { [key: string]: any }): superagent.SuperAgentRequest {

        // const headerParams: any = {};

        // const queryParameters: any = {};

        // tslint:disable-next-line:prefer-const
        let useFormData = false;

        // Determine the Content-Type header
        const contentTypes: Array<string> = [
            "application/json"
        ];

        // Determine the Accept header
        const acceptTypes: Array<string> = [
            "application/json"
        ];

        return this.request<T>({
            url: url,
            method: method,
            headers: headers,
            query: query,
            formParams: formParams,
            useFormData: useFormData,
            contentTypes: contentTypes,
            acceptTypes: acceptTypes,
            requestOptions: requestOptions,
            body: body,
        }, callback);
    }
}
