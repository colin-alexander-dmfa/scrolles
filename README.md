# Scrolles

A deadly simple and higlhy customizable scroll progress indicator.

## Installation

```sh
yarn add scrolles
```

## Usage

Import the function and pass the **optional** configuration:

```js
import { Scrolles } from 'scrolles';

const scrollIndicator = Scrolles({
  selector: '[data-scrolles]',
  mode: 'continuous',
});
```

Then you can add the selector you've defined to any not-void/replaced element (any element that can contains pseudo elements):

```html
<html lang="en" data-scrolles>
   <head>
   </head>
   <body>
      <div data-scrolles>
         ....
      </div>
   </body>
</html>
```

Finally, add this small `CSS` snippet to customize the progress indicator.

```css
[data-scrolles]::before {
   /* Visual Appearance */
   border-radius: 50px;
   height: 3px;
   background: hotpink;
   transition: transform 600ms cubic-bezier(0.25, 1, 0.5, 1);

   /* Required style */
   top: 0;
   position: sticky;
   display: block;
   content: '';
   transform-origin: 0 50%;
   transform: scaleX(var(--scrolles-progress, 0));
}
```

> Note: `[data-scrolles]` is the dafult selector, if you change it, you have to change it also inside the CSS.
