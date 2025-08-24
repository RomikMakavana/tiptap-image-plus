import { ImagePlusOptions } from '../types';
interface NodeViewContext {
    node: any;
    editor: any;
    options: ImagePlusOptions;
    view: any;
    getPos: () => number | undefined;
}
export declare class ImageNodeView {
    private context;
    private elements;
    private inline;
    constructor(context: NodeViewContext, inline: boolean);
    private createElements;
    private clearContainerBorder;
    private dispatchNodeView;
    private removeResizeElements;
    private setupImageAttributes;
    private setupDOMStructure;
    private createPositionController;
    private createResizeHandler;
    private setupContainerClick;
    private setupContentClick;
    initialize(): {
        dom: HTMLElement;
    };
}
export {};
