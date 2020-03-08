# Scrolles

A deadly simple scroll progress indicator based on css and js.

## Installation

```sh
yarn add scrolles
```

## Usage

Import init the function by passing the optional configuration:

```js
import { scrollProgress } from 'scrolles';

scrollProgress({
   selector: '[data-sp]', // A valid css selector
   mode: 'continuous', // or 'steps'
   reverse: false, // Reverse the direction
   style: {
      color: 'blue',
      height: '3px',
   }
});
```

Then add this small css snippet to your CSS:

```css
[data-scroll-progress]::before {
   content: '';
   display: block;
   position: sticky;
   height: var(--sp-height);
   top: var(--sp-top, 0);
   transform-origin: var(--sp-origin-x, 0) var(--sp-origin-y, 50%);
   transform: scaleX(var(--sp-progress, 0));
   background: var(--sp-color);
   background-repeat: repeat;
}
```
