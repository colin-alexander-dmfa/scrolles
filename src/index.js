import ResizeObserver from 'resize-observer-polyfill';

/**
 * Calculate the relative percentage based on
 * the element height and set min/max values
 * @param {Element} domElement
 * @param {String} mode
 */
const getScrollPercentage = (domElement, mode) => {
	const computedMode = mode === 'steps' ? 1 : 3;
	const percentage = domElement.scrollTop / (domElement.scrollHeight - domElement.clientHeight);

	/**
	 * Set minimum [0] and maximum [1] values in order
	 * to prevent over transformations.
	 */
	switch (percentage) {
		case percentage < 0:
			return 1
		case percentage > 1:
			return 0
		default:
			return (percentage).toFixed(computedMode)
	}
};
/**
 * Return the current computed and formatted scroll percentage
 * @param {Element} domElement
 * @param {Object} config
 */
const updateProgress = (domElement, config) => {
	domElement.style.setProperty(
		'--scrolles-progress',
		getScrollPercentage(domElement, config.mode || 'continuous')
	);
};
/**
 * Get the user config and run sub function based on
 * the element resize and initialiation. Also set starting style.
 * @param {Object} config
 */
export const Scrolles = (config = {
	selector: '[data-scrolles]',
	mode: 'continuous',
	reverse: false
}) => {
	/**
	 * Get all elements by the provided selector.
	 */
	const elements = [...document.querySelectorAll(config.selector)]
	/**
	 * For each element found inside the page
	 * apply the required style and run the observer
	 */
	elements.forEach(element => {
		/**
		 * Add the [data-scrolles] attribute to the
		 * element dataset to apply the minimum required style.
		 */
		element.dataset.scrolles = true;
		/**
		 * Check if selector match the document element
		 * and set the scroll listener on window, otherwise
		 * watch element scrolling
		 */
		if (element.localName === 'html') {
			window.addEventListener('scroll', () => {
				updateProgress(element, config);
			});
		}
		else {
			element.addEventListener('scroll', () => {
				updateProgress(element, config);
			});
		}
		/**
		 * Set the resize observer on elements to update
		 * the scroll progress indicator matching the new
		 * scroll height
		 */
		const resizeObserver = new ResizeObserver(entries => {
			for (let entry of entries) {
				updateProgress(entry.target, config);
			}
		});
		resizeObserver.observe(element, { box : 'border-box' });
	});
};
