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

Finally, add this small and optional `CSS` snippet if you want to customize the progress indicator.

```css
[data-scrolles]{
   --scrolles-height: 3px;
   --scrolles-fill: hotpink;
   --scrolles-margin: 0;
}
```

> Note: `[data-scrolles]` is the dafult selector, if you change it, you have to change it also inside the CSS.
