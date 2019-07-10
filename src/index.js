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
	return percentage < 0
		? 0
		: percentage > 1
		? 1
		: percentage.toFixed(computedMode);
};

const updateProgress = (domElement, config) => {
	domElement.style.setProperty(
		'--sp-progress',
		getScrollPercentage(domElement, config.mode)
	);
};

const scrollProgress = config => {
	const domElement = document.documentElement;
	/**
	 * Add the [data-scroll-progress] attribute to the
	 * element dataset to apply the minimum required style.
	 */
	domElement.dataset.scrollProgress = true;

	/**
	 * Define the configuration object
	 */
	const computedConfig = {
		mode: config.mode || 'continuous',
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
	setStyle(domElement, computedConfig);

	document.addEventListener('DOMContentLoaded', () => {
		window.addEventListener('scroll', () => {
			updateProgress(domElement, computedConfig);
		});
	});
};
