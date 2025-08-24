export class AttributeParser {
    static parseImageAttributes(nodeAttrs, imgElement) {
        Object.entries(nodeAttrs).forEach(([key, value]) => {
            if (value === undefined || value === null || key === 'wrapperStyle')
                return;
            if (key === 'containerStyle') {
                const width = value.match(/width:\s*([0-9.]+)px/);
                if (width) {
                    imgElement.setAttribute('width', width[1]);
                }
                return;
            }
            imgElement.setAttribute(key, value);
        });
    }
    static extractWidthFromStyle(style) {
        const width = style.match(/width:\s*([0-9.]+)px/);
        return width ? width[1] : null;
    }
}
