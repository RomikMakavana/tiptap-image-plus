import Image from '@tiptap/extension-image';
import { ImageNodeView } from './controllers/image-node-view';
export const ImagePlus = Image.extend({
    name: 'imagePlus',
    addOptions() {
        var _a;
        return Object.assign(Object.assign({}, (_a = this.parent) === null || _a === void 0 ? void 0 : _a.call(this)), { wrapperStyle: {}, containerStyle: {} });
    },
    addAttributes() {
        var _a;
        const inline = this.options.inline;
        return Object.assign(Object.assign({}, (_a = this.parent) === null || _a === void 0 ? void 0 : _a.call(this)), { width: {
                default: '',
                parseHTML: (element) => {
                    const width = element.style.width;
                    // If width value not exist direct then check style
                    if (typeof width === "string" && width.includes("%")) {
                        return width;
                    }
                    return '';
                },
            }, alignment: {
                default: 'left',
                parseHTML: (element) => {
                    return element.getAttribute('alignment') || 'left';
                },
            } });
    },
    addNodeView() {
        return ({ node, editor, getPos }) => {
            const inline = this.options.inline;
            const context = {
                node,
                editor,
                options: this.options,
                view: editor.view,
                getPos: typeof getPos === 'function' ? getPos : () => undefined,
            };
            const nodeView = new ImageNodeView(context, inline);
            return nodeView.initialize();
        };
    },
});
