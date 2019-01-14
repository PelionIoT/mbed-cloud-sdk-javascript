export type ColorReferenceEnum =
    | "error_color"
    | "primary"
    | "secondary"
    | "success_color"
    | "warning_color"
    | "canvas_background"
    | "canvas_background_font_color"
    | "workspace_background"
    | "workspace_background_font_color"
    | "info_color"
    | "info_font_color"
    | "primary_font_color"
    | "secondary_font_color"
    | "error_font_color"
    | "success_font_color"
    | "warning_font_color";
/**
 *ColorUpdateDarkRequest
 */
export interface ColorUpdateDarkRequest {
    /**
     *color
     */
    readonly color?: string;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;
}
/**
 *ColorUpdateLightRequest
 */
export interface ColorUpdateLightRequest {
    /**
     *color
     */
    readonly color?: string;

    /**
     *updatedAt
     */
    readonly updatedAt?: Date;
}
