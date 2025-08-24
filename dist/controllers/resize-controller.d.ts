import { ImageElements } from '../types';
export declare class ResizeController {
    private elements;
    private dispatchNodeView;
    private state;
    constructor(elements: ImageElements, dispatchNodeView: () => void);
    private handleMouseMove;
    private handleMouseUp;
    private handleTouchMove;
    private handleTouchEnd;
    createResizeHandle(index: number): HTMLElement;
}
