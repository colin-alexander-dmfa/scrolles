import { ResizeObserver } from '@juggle/resize-observer';
import {Scrolles} from '../src/index.js';

const scrollIndicator = Scrolles({
	selector: '[data-scrolles]',
	mode: 'continuous',
});
