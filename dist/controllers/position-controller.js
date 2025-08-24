import { CONSTANTS } from '../constants';
import { StyleManager } from '../utils/style-manager';
export class PositionController {
    constructor(elements, inline, dispatchNodeView) {
        this.elements = elements;
        this.inline = inline;
        this.dispatchNodeView = dispatchNodeView;
    }
    createControllerIcon(src) {
        const controller = document.createElement('img');
        controller.setAttribute('src', src);
        controller.setAttribute('style', `width: ${CONSTANTS.ICON_SIZE}; height: ${CONSTANTS.ICON_SIZE}; cursor: pointer;`);
        controller.addEventListener('mouseover', (e) => {
            e.target.style.opacity = '0.6';
        });
        controller.addEventListener('mouseout', (e) => {
            e.target.style.opacity = '1';
        });
        return controller;
    }
    handleLeftClick() {
        if (!this.inline) {
            this.elements.wrapper.style.justifyContent = 'left';
        }
        else {
            const style = 'display: inline-block; float: left; padding-right: 8px;';
            this.elements.wrapper.setAttribute('style', style);
            this.elements.container.setAttribute('style', style);
        }
        this.dispatchNodeView();
    }
    handleCenterClick() {
        this.elements.wrapper.style.justifyContent = 'center';
        this.dispatchNodeView();
    }
    handleRightClick() {
        if (!this.inline) {
            this.elements.wrapper.style.justifyContent = 'right';
        }
        else {
            const style = 'display: inline-block; float: right; padding-left: 8px;';
            this.elements.wrapper.setAttribute('style', style);
            this.elements.container.setAttribute('style', style);
        }
        this.dispatchNodeView();
    }
    createPositionControls() {
        const controller = document.createElement('div');
        controller.setAttribute('style', StyleManager.getPositionControllerStyle(this.inline));
        const leftController = this.createControllerIcon(CONSTANTS.ICONS.LEFT);
        leftController.addEventListener('click', () => this.handleLeftClick());
        controller.appendChild(leftController);
        if (!this.inline) {
            const centerController = this.createControllerIcon(CONSTANTS.ICONS.CENTER);
            centerController.addEventListener('click', () => this.handleCenterClick());
            controller.appendChild(centerController);
        }
        const rightController = this.createControllerIcon(CONSTANTS.ICONS.RIGHT);
        rightController.addEventListener('click', () => this.handleRightClick());
        controller.appendChild(rightController);
        this.elements.container.appendChild(controller);
        return this;
    }
}
