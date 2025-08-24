import { StyleManager } from '../utils/style-manager';
export class ResizeController {
    constructor(elements, dispatchNodeView) {
        this.state = {
            isResizing: false,
            startX: 0,
            startWidth: 0,
        };
        this.handleMouseMove = (e, index) => {
            if (!this.state.isResizing)
                return;
            const deltaX = index % 2 === 0 ? -(e.clientX - this.state.startX) : e.clientX - this.state.startX;
            const newWidth = this.state.startWidth + deltaX;
            const containerWidth = this.elements.wrapper.offsetWidth;
            let percentageWidth = (newWidth / containerWidth) * 100;
            percentageWidth = percentageWidth > 100 ? 100 : percentageWidth;
            this.elements.container.style.width = percentageWidth + '%';
            this.elements.img.style.width = '100%';
        };
        this.handleMouseUp = () => {
            if (this.state.isResizing) {
                this.state.isResizing = false;
            }
            this.dispatchNodeView();
        };
        this.handleTouchMove = (e, index) => {
            if (!this.state.isResizing)
                return;
            const deltaX = index % 2 === 0
                ? -(e.touches[0].clientX - this.state.startX)
                : e.touches[0].clientX - this.state.startX;
            const newWidth = this.state.startWidth + deltaX;
            const containerWidth = this.elements.wrapper.offsetWidth;
            let percentageWidth = (newWidth / containerWidth) * 100;
            percentageWidth = percentageWidth > 100 ? 100 : percentageWidth;
            this.elements.container.style.width = percentageWidth + '%';
            this.elements.img.style.width = '100%';
        };
        this.handleTouchEnd = () => {
            if (this.state.isResizing) {
                this.state.isResizing = false;
            }
            this.dispatchNodeView();
        };
        this.elements = elements;
        this.dispatchNodeView = dispatchNodeView;
    }
    createResizeHandle(index) {
        const dot = document.createElement('div');
        dot.setAttribute('style', StyleManager.getDotStyle(index));
        dot.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.state.isResizing = true;
            this.state.startX = e.clientX;
            this.state.startWidth = this.elements.container.offsetWidth;
            const onMouseMove = (e) => this.handleMouseMove(e, index);
            const onMouseUp = () => {
                this.handleMouseUp();
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        });
        dot.addEventListener('touchstart', (e) => {
            e.cancelable && e.preventDefault();
            this.state.isResizing = true;
            this.state.startX = e.touches[0].clientX;
            this.state.startWidth = this.elements.container.offsetWidth;
            const onTouchMove = (e) => this.handleTouchMove(e, index);
            const onTouchEnd = () => {
                this.handleTouchEnd();
                document.removeEventListener('touchmove', onTouchMove);
                document.removeEventListener('touchend', onTouchEnd);
            };
            document.addEventListener('touchmove', onTouchMove);
            document.addEventListener('touchend', onTouchEnd);
        }, { passive: false });
        return dot;
    }
}
