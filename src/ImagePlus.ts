import Image, { ImageOptions } from '@tiptap/extension-image';
import { ImageNodeView } from './controllers/image-node-view';
import { ImagePlusOptions } from './types';


export const ImagePlus = Image.extend<ImagePlusOptions>({
  name: 'imagePlus',
  addOptions() {
    return {
      ...(this.parent?.() as ImageOptions),
      wrapperStyle: {},
      containerStyle: {},
    };
  },

  addAttributes() {
    const inline = this.options.inline;
    return {
      ...this.parent?.(),
      width: {
        default: '',
        parseHTML: (element) => {
          const width = element.style.width;
          // If width value not exist direct then check style
          if(typeof width === "string" && width.includes("%")){
            return width
          }
          return '';
        },
      },
      alignment: {
        default: 'left',
        parseHTML: (element) => {
          return element.getAttribute('alignment') || 'left';
        },
      }
    };
  },

  addNodeView() {
    return ({ node, editor, getPos }) => {
      const inline = this.options.inline;
      const context = {
        node,
        editor,
        options: this.options as ImagePlusOptions,
        view: editor.view,
        getPos: typeof getPos === 'function' ? getPos : () => undefined,
      };

      const nodeView = new ImageNodeView(context, inline);
      return nodeView.initialize();
    };
  },
});
