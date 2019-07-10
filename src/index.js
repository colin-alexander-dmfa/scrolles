const setStyle = (domElement, styles) => {
	for (let property in styles) {
		domElement.style.setProperty(`--sp-${property}`, styles[property]);
	}
};

const getScrollPercentage = domElement => {
	// prettier-ignore
	const percentage = domElement.scrollTop / (domElement.scrollHeight - domElement.clientHeight);
	return percentage < 0 ? 0 : percentage > 1 ? 1 : percentage.toFixed(3);
};

const scrollProgress = (domElement, config) => {
	/**
	 * Add the [data-scroll-progress] attribute to the
	 * element dataset to apply the minimum required style.
	 */
	domElement.dataset.scrollProgress = true;

	/**
	 * Define the configuration object
	 */
	const computedConfig = {
		position: config.position || 'top',
		mode: config.mode || 'continue',
		reverse: config.reverse || false,
		style: {
			height: config.style.height || '3px',
			color: config.style.color || 'hotpink'
		}
	};
	/*
	 * Call setStyle() to apply custom properties from
	 * the configuration object
	 */
	setStyle(domElement, computedConfig.style);

	document.addEventListener('DOMContentLoaded', () => {
		window.onscroll = () => {
			domElement.style.setProperty(
				'--sp-progress',
				getScrollPercentage(domElement)
			);
		};
	});
};
