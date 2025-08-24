export declare class AttributeParser {
    static parseImageAttributes(nodeAttrs: Record<string, any>, imgElement: HTMLImageElement): void;
    static extractWidthFromStyle(style: string): string | null;
}
