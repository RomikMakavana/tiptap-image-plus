import { CONSTANTS } from '../constants/index';
export const utils = {
    isMobile() {
        return document.documentElement.clientWidth < CONSTANTS.MOBILE_BREAKPOINT;
    },
    getDotPosition() {
        return utils.isMobile() ? CONSTANTS.DOT_POSITION.MOBILE : CONSTANTS.DOT_POSITION.DESKTOP;
    },
    getDotSize() {
        return utils.isMobile() ? CONSTANTS.DOT_SIZE.MOBILE : CONSTANTS.DOT_SIZE.DESKTOP;
    },
    clearContainerBorder(container) {
        const containerStyle = container.getAttribute('style');
        const newStyle = containerStyle === null || containerStyle === void 0 ? void 0 : containerStyle.replace('border: 1px dashed #6C6C6C;', '').replace('border: 1px dashed rgb(108, 108, 108)', '');
        container.setAttribute('style', newStyle);
    },
    removeResizeElements(container) {
        if (container.childElementCount > 3) {
            for (let i = 0; i < 5; i++) {
                container.removeChild(container.lastChild);
            }
        }
    },
};
