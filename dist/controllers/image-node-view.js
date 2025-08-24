import { CONSTANTS } from '../constants';
import { utils } from '../utils';
import { PositionController } from './position-controller';
import { ResizeController } from './resize-controller';
export class ImageNodeView {
    constructor(context, inline) {
        this.clearContainerBorder = () => {
            utils.clearContainerBorder(this.elements.container);
        };
        this.dispatchNodeView = () => {
            const { view, getPos } = this.context;
            if (typeof getPos === 'function') {
                this.clearContainerBorder();
                const newAttrs = Object.assign(Object.assign({}, this.context.node.attrs), { width: this.elements.container.style.width, alignment: this.elements.wrapper.style.justifyContent });
                view.dispatch(view.state.tr.setNodeMarkup(getPos(), null, newAttrs));
            }
        };
        this.removeResizeElements = () => {
            utils.removeResizeElements(this.elements.container);
        };
        this.context = context;
        this.inline = inline;
        this.elements = this.createElements();
    }
    createElements() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('image-plus-wrapper');
        const container = document.createElement('div');
        container.classList.add('image-plus-container');
        const img = document.createElement('img');
        img.classList.add('image-plus-img');
        return {
            wrapper,
            container,
            img,
        };
    }
    setupImageAttributes() {
        Object.entries(this.context.node.attrs).forEach(([key, value]) => {
            if (value === undefined || value === null || key === "width")
                return;
            this.elements.img.setAttribute(key, value);
        });
        if (this.context.node.attrs.width) {
            this.elements.img.style.width = '100%';
        }
    }
    setupDOMStructure() {
        const { wrapperStyle, containerStyle } = CONSTANTS;
        const { containerStyle: containerStyleOptions, wrapperStyle: wrapperStyleOptions } = this.context.options;
        const containerWidth = this.context.node.attrs.width || 'fit-content';
        Object.assign(this.elements.wrapper.style, Object.assign(Object.assign(Object.assign({}, wrapperStyleOptions), wrapperStyle), { justifyContent: this.context.node.attrs.alignment }));
        this.elements.wrapper.appendChild(this.elements.container);
        Object.assign(this.elements.container.style, Object.assign(Object.assign(Object.assign({}, containerStyleOptions), containerStyle), { width: containerWidth }));
        this.elements.container.appendChild(this.elements.img);
    }
    createPositionController() {
        const positionController = new PositionController(this.elements, this.inline, this.dispatchNodeView);
        positionController.createPositionControls();
    }
    createResizeHandler() {
        const resizeHandler = new ResizeController(this.elements, this.dispatchNodeView);
        Array.from({ length: 4 }, (_, index) => {
            const dot = resizeHandler.createResizeHandle(index);
            this.elements.container.appendChild(dot);
        });
    }
    setupContainerClick() {
        this.elements.container.addEventListener('click', () => {
            var _a;
            const isMobile = utils.isMobile();
            isMobile && ((_a = document.querySelector('.ProseMirror-focused')) === null || _a === void 0 ? void 0 : _a.blur());
            this.removeResizeElements();
            this.createPositionController();
            Object.assign(this.elements.container.style, Object.assign({ position: 'relative', border: `1px dashed ${CONSTANTS.COLORS.BORDER}` }, this.context.options.containerStyle));
            this.createResizeHandler();
        });
    }
    setupContentClick() {
        document.addEventListener('click', (e) => {
            const target = e.target;
            const isClickInside = this.elements.container.contains(target) ||
                target.style.cssText ===
                    `width: ${CONSTANTS.ICON_SIZE}; height: ${CONSTANTS.ICON_SIZE}; cursor: pointer;`;
            if (!isClickInside) {
                this.clearContainerBorder();
                this.removeResizeElements();
            }
        });
    }
    initialize() {
        this.setupDOMStructure();
        this.setupImageAttributes();
        const { editable } = this.context.editor.options;
        if (!editable)
            return { dom: this.elements.container };
        this.setupContainerClick();
        this.setupContentClick();
        return {
            dom: this.elements.wrapper,
        };
    }
}
