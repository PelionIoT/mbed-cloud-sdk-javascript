
export interface RunnerConnectionOptionsBase {
    api_key: string | undefined;
    host: string | undefined;
}

export interface RunnerConnectionOptions extends RunnerConnectionOptionsBase {
    params: RunnerConnectionOptionsBase | undefined;
}
