export interface TestError {
    message: string;
    traceback: any;
}

export interface TestResult {
    payload: any;
}

export interface MethodDescription {
    name: string | undefined;
    number_of_arguments: number;
}

export interface ModuleDescription {
    id: string | undefined;
    module: string | undefined;
    created_at: string;
}
