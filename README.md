# Scrolles

A deadly simple scroll progress indicator based on css and js.

## Installation

```sh
yarn add scrolles
```

## Usage

Import the function and pass the **optional** configuration:

```js
import { Scrolles } from 'scrolles';

Scrolles({
   selector: '[data-scrolles]', // A valid css selector
   mode: 'continuous', // or 'steps'
});
```
Then you can add the selector you've defined to any not-void/replaced element (any element that can contains pseudo elements):
```html
<html lang="en" data-scrolles>
   <head>
   </head>
   <body>
      ....
   </body>
</html>
```

Finally, add this small `CSS` snippet to customize the progress indicator.

```css
[data-scrolles]::before {
   display: block;
   position: sticky;
   top: 0;

   /* Required style */
   content: '';
   background: hotpink;
   height: 3px;
   transform-origin: 0 var(--scrolles-origin-y, 50%);
   transform: scaleX(var(--scrolles-progress, 0));
}
```
