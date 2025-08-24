import { ImageOptions } from "@tiptap/extension-image";

export interface ImagePlusOptions extends ImageOptions {
  wrapperStyle: Partial<SafeCSSProperties>;
  containerStyle: Partial<SafeCSSProperties>;
}

export interface ResizeState {
  isResizing: boolean;
  startX: number;
  startWidth: number;
}

export interface PositionController {
  element: HTMLElement;
  leftController: HTMLElement;
  centerController?: HTMLElement;
  rightController: HTMLElement;
}

export interface ImageElements {
  wrapper: HTMLElement;
  container: HTMLElement;
  img: HTMLImageElement;
}

export type SafeCSSProperties = Pick<
  CSSStyleDeclaration,
  | "color"
  | "background"
  | "backgroundColor"
  | "backgroundImage"
  | "backgroundSize"
  | "backgroundRepeat"
  | "backgroundPosition"
  | "opacity"
  | "visibility"
  | "fontSize"
  | "fontWeight"
  | "fontStyle"
  | "fontFamily"
  | "lineHeight"
  | "letterSpacing"
  | "textAlign"
  | "textDecoration"
  | "textTransform"
  | "whiteSpace"
  | "wordBreak"
  | "cursor"
  | "borderColor"
  | "borderStyle"
  | "borderRadius"
  | "borderLeftColor"
  | "borderLeftStyle"
  | "borderTopLeftRadius"
  | "borderTopRightRadius"
  | "borderBottomLeftRadius"
  | "borderBottomRightRadius"
  | "borderRightColor"
  | "borderRightStyle"
  | "borderTopColor"
  | "borderTopStyle"
  | "borderTopWidth"
  | "borderBottomColor"
  | "borderBottomStyle"
  | "boxShadow"
  | "outline"
  | "transition"
  | "animation"
>;