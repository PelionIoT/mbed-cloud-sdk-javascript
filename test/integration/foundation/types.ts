/**
 * Foundation Instance swagger model
 */
export interface TestRunnerFoundationInstance {
    id: string;
    entity: string;
    created_at: Date;
}

export interface TestRunnerMethodInfo {
    name: string;
}

export interface TestRunnerMethodCallResult {
    payload: {
        [key: string]: string
    };
}

export interface TestRunnerParameters {
    [key: string]: string;
}
