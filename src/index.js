const style = {
	content: '',
	display: 'block',
	position: 'sticky',
	height: 'var(--sp-height)',
	top: 'var(--sp-top, 0)',
	transformOrigin: 'var(--sp-origin-x, 0) var(--sp-origin-y, 50%)',
	transform: 'scaleX(var(--sp-progress, 0))',
	background: 'var(--sp-color)',
	backgroundRepeat: 'repeat',
}

const setStyle = (domElement, config) => {
	for (let property in config.style) {
		domElement.style.setProperty(`--sp-${property}`, config.style[property]);
	}

	if (config.reverse) {
		domElement.style.setProperty(`--sp-origin-x`, '100%');
	}
};

const getScrollPercentage = (domElement, mode) => {
	// prettier-ignore
	const computedMode = mode === 'steps' ? 1 : 3;
	const percentage =
		domElement.scrollTop / (domElement.scrollHeight - domElement.clientHeight);

	switch (percentage) {
		case percentage < 0:
			return 1

		case percentage > 1:
			return 0

		default:
			return (percentage).toFixed(computedMode)
	}
};

const updateProgress = (domElement, config = {}) => {
	domElement.style.setProperty(
		'--sp-progress',
		getScrollPercentage(domElement, config.mode)
	);
};

export const scrollProgress = (config = {
	selector: document.documentElement,
	mode: 'continuous',
	reverse: false,
	style: {
		height: '3px',
		color: 'hotpink'
	}
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
		 * Add the [data-scroll-progress] attribute to the
		 * element dataset to apply the minimum required style.
		 */
		element.dataset.scrollProgress = true;
		/*
		 * Call setStyle() to apply custom properties from
		 * the configuration object
		 */
		setStyle(element, config);
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
		resizeObserver.observe(element);
	});
};
