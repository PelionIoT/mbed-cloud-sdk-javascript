export interface Field {
    name: string;
    apiName: string;
    type: string;
}
export interface Method {
    name: string;
    returnType: string;
    parameters: Array<Parameter>;
}
export interface Parameter {
    name: string;
    position?: number;
    type: string;
    subParams?: Array<Parameter>;
}
