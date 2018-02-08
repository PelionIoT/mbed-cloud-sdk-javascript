export class ServerError extends Error {

    public date: Date;
    public code: number;
    public fromTestServer: boolean;

    public constructor(code = 500, ...params: Array<any>) {

        super(...params);

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ServerError);
        }

        this.code = code;
        this.date = new Date();
        this.fromTestServer = true;
    }
}
