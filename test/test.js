import {scrollProgress} from '../src/index.js';

scrollProgress({
	selector: '[data-sp]',
	mode: 'continuous', // or 'steps'
	reverse: false,
	style: {
		color: 'blue',
		height: '3px',
	}
});
