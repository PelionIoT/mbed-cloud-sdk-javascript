export declare type LightThemeColorReference = "error_color" | "primary" | "secondary" | "success_color" | "warning_color" | "canvas_background" | "canvas_background_font_color" | "workspace_background" | "workspace_background_font_color" | "info_color" | "info_font_color" | "primary_font_color" | "secondary_font_color" | "error_font_color" | "success_font_color" | "warning_font_color";
/**
 *LightThemeColorUpdateRequest
 */
export interface LightThemeColorUpdateRequest {
    /**
     *The color given as name (purple) or as a hex code.
     *@example #f3f93e
     */
    readonly color?: string;
    /**
     *Last update time in UTC.
     *@example 2018-02-14T15:24:14Z
     */
    readonly updatedAt?: Date;
}
