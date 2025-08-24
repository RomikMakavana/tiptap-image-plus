import { ImageElements } from '../types';
export declare class PositionController {
    private elements;
    private inline;
    private dispatchNodeView;
    constructor(elements: ImageElements, inline: boolean, dispatchNodeView: () => void);
    private createControllerIcon;
    private handleLeftClick;
    private handleCenterClick;
    private handleRightClick;
    createPositionControls(): PositionController;
}
