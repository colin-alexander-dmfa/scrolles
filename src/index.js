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
         return 0
      case percentage > 1:
         return 1
      default:
         return percentage.toFixed(computedMode)
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
      getScrollPercentage(domElement, config.mode)
   );
};
/**
 * Get the user config and run sub function based on
 * the element resize and initialiation. Also set starting style.
 * @param {Object} [{}] config Configuration options
 * @param {String} [[data-scrolles]] config.selector The element selector.
 * @param {String} [continuous] config.mode The scroll mode. If "step" the indicator will grow with predefined steps.
 * @param {String} [top] config.position The position of the indicator.
 */
export const Scrolles = (configuration) => {
   const config = {
      ...configuration,
      selector: '[data-scrolles]',
      mode: 'continuous',
      position: 'top',
      reverse: false
   }
   /**
    * Create empty style element
    */
   const style = document.createElement('style');
   /**
    * Populate the style
    */
   style.innerHTML = `
      ${config.selector}::${config.position === 'top' ? 'before' : 'after'} {
         height: var(--scrolles-height, 3px);
         background: var(--scrolles-fill, hotpink);
         transition: transform 600ms var(--scrolles-easing, cubic-bezier(0.25, 1, 0.5, 1));

         ${config.position === 'top' ? 'top: var(--scrolles-margin, 0);' : 'bottom: var(--scrolles-margin, 0);'}
         transform-origin: ${config.reverse ? '100%' : '0'} 50%;
         position: sticky;
         display: block;
         content: '';
         margin: var(--scrolles-margin, 0);
         transform: scaleX(var(--scrolles-progress, 0));
         margin-bottom: calc((var(--scrolles-height, 3px) + var(--scrolles-margin, 0)) * -1);
      }
   `;
   /**
    * Append the style to the document
    */
    document.head.appendChild(style);
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
      if (element.localName === 'html' && (typeof window !== 'undefined')) {
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
      const ro = new ResizeObserver(entries => {
         for (let entry of entries) {
            updateProgress(entry.target, config);
         }
      });
      ro.observe(element);
   });
};
