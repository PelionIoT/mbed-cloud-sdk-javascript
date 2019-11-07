import { LoginHistory as apiLoginHistory } from "../../_api/iam";
import { LoginHistory } from "./loginHistory";
/**
 * Login History Adapter
 */
export declare class LoginHistoryAdapter {
    static map(from: apiLoginHistory): LoginHistory;
}
