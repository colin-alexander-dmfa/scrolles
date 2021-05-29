import { ResizeObserver } from '@juggle/resize-observer';
import {Scrolles} from '../src/index.js';

Scrolles({
	selector: '[data-scrolles]',
	mode: 'continuous',
   reverse: false
});
