import { CONSTANTS } from '../constants';
import { utils } from '../utils';
import { AttributeParser } from '../utils/attribute-parser';
import { ImageElements } from '../types';
import { PositionController } from './position-controller';
import { ResizeController } from './resize-controller';
import { ImagePlusOptions } from '../types';

interface NodeViewContext {
  node: any;
  editor: any;
  options: ImagePlusOptions;
  view: any;
  getPos: () => number | undefined;
}

export class ImageNodeView {
  private context: NodeViewContext;
  private elements: ImageElements;
  private inline: boolean;

  constructor(context: NodeViewContext, inline: boolean) {
    this.context = context;
    this.inline = inline;
    this.elements = this.createElements();
  }

  private createElements(): ImageElements {
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

  private clearContainerBorder = (): void => {
    utils.clearContainerBorder(this.elements.container);
  };

  private dispatchNodeView = (): void => {
    const { view, getPos } = this.context;
    if (typeof getPos === 'function') {
      this.clearContainerBorder();
      const newAttrs = {
        ...this.context.node.attrs,
        width: this.elements.container.style.width,
        alignment: this.elements.wrapper.style.justifyContent,
      };
      view.dispatch(view.state.tr.setNodeMarkup(getPos(), null, newAttrs));
    }
  };

  private removeResizeElements = (): void => {
    utils.removeResizeElements(this.elements.container);
  };

  private setupImageAttributes(): void {
    Object.entries(this.context.node.attrs).forEach(([key, value]) => {
      if (value === undefined || value === null || key === "width") return;
      this.elements.img.setAttribute(key, value as string)
    });
    if(this.context.node.attrs.width){
      this.elements.img.style.width = '100%';
    }
  }

  private setupDOMStructure(): void {
    const { wrapperStyle, containerStyle } = CONSTANTS;
    const { containerStyle : containerStyleOptions, wrapperStyle : wrapperStyleOptions } = this.context.options;
    const containerWidth = this.context.node.attrs.width || 'fit-content';

    Object.assign(this.elements.wrapper.style, {
      ...wrapperStyleOptions,
      ...wrapperStyle,
      justifyContent: this.context.node.attrs.alignment,
    });
    this.elements.wrapper.appendChild(this.elements.container);

    Object.assign(this.elements.container.style, {
      ...containerStyleOptions,
      ...containerStyle,
      width: containerWidth,
    });
    this.elements.container.appendChild(this.elements.img);
  }

  private createPositionController(): void {
    const positionController = new PositionController(
      this.elements,
      this.inline,
      this.dispatchNodeView
    );
    positionController.createPositionControls();
  }

  private createResizeHandler(): void {
    const resizeHandler = new ResizeController(this.elements, this.dispatchNodeView);

    Array.from({ length: 4 }, (_, index) => {
      const dot = resizeHandler.createResizeHandle(index);
      this.elements.container.appendChild(dot);
    });
  }

  private setupContainerClick(): void {
    this.elements.container.addEventListener('click', () => {
      const isMobile = utils.isMobile();
      isMobile && (document.querySelector('.ProseMirror-focused') as HTMLElement)?.blur();

      this.removeResizeElements();
      this.createPositionController();

      Object.assign(this.elements.container.style, {
        position: 'relative',
        border: `1px dashed ${CONSTANTS.COLORS.BORDER}`,
        ...this.context.options.containerStyle,
      });

      this.createResizeHandler();
    });
  }

  private setupContentClick(): void {
    document.addEventListener('click', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickInside =
        this.elements.container.contains(target) ||
        target.style.cssText ===
          `width: ${CONSTANTS.ICON_SIZE}; height: ${CONSTANTS.ICON_SIZE}; cursor: pointer;`;

      if (!isClickInside) {
        this.clearContainerBorder();
        this.removeResizeElements();
      }
    });
  }

  initialize(): { dom: HTMLElement } {
    this.setupDOMStructure();
    this.setupImageAttributes();

    const { editable } = this.context.editor.options;
    if (!editable) return { dom: this.elements.container };

    this.setupContainerClick();
    this.setupContentClick();

    return {
      dom: this.elements.wrapper,
    };
  }
}
