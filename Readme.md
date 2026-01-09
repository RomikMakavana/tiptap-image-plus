
# TipTap Image Plus
[![NPM](https://img.shields.io/npm/v/tiptap-image-plus.svg)](https://www.npmjs.com/package/tiptap-image-plus)

An advanced image extension for [Tiptap](https://tiptap.dev/) editor with extra options like resize, align, caption, and more. Easily add rich image editing features to your Tiptap editor.

## Demo
http://romikmakavana.me/tiptap/image-plus/example

## Documentation
http://romikmakavana.me/tiptap/image-plus

## Features

- Resize images with drag handles
- Align images (left, center, right)
- Custom wrapper and container styles
- Mobile-friendly controls
- Easy integration with Tiptap v2


## Installation

This package supports both TipTap v2 and TipTap v3. Choose the appropriate installation command based on your TipTap version:

### For TipTap v3 (Recommended)

```bash
# Install latest version (defaults to TipTap v3)
npm install tiptap-image-plus

# Or explicitly install the tiptap-v3 tag
npm install tiptap-image-plus@tiptap-v3
```

### For TipTap v2

```bash
npm install tiptap-image-plus@tiptap-v2
```

**Note:** Both versions are maintained and updated with each release. The `latest` tag (default) points to the TipTap v3 compatible version.  

## Installation Peer Dependency

This package requires the following peer dependencies to be installed in your project:

- [@tiptap/extension-image](https://www.npmjs.com/package/@tiptap/extension-image)

Make sure to install them to ensure everything works correctly.

```bash
npm install @tiptap/extension-image
```

## Usage

```typescript
import { Editor } from '@tiptap/core';
import { ImagePlus } from 'tiptap-image-plus';

const editor = new Editor({
	extensions: [
		ImagePlus.configure({
			// Optional: custom options
			wrapperStyle: {},
			containerStyle: {
                background: "linear-gradient(90deg,rgba(30, 88, 117, 1) 0%, rgba(87, 199, 133, 1) 50%, rgba(237, 221, 83, 1) 100%)",
                padding: "25px",
                borderRadius: "10px",
            },
		}),
		// ...other extensions
	],
});
```

## Options

`ImagePlus` extends the default Tiptap image extension. You can pass all [@tiptap/extension-image](https://tiptap.dev/api/extensions/image) options, plus:

- `wrapperStyle`: CSS properties for the image wrapper (default: `{ background }`)
- `containerStyle`: CSS properties for the image container (default: `{  }`)

## Example

```typescript
ImagePlus.configure({
	wrapperStyle: { background: "" },
	containerStyle: {  },
})
```


## License

MIT

---

**Links:**
- [NPM](https://www.npmjs.com/package/tiptap-image-plus)
- [GitHub](https://github.com/RomikMakavana/tiptap-image-plus)
