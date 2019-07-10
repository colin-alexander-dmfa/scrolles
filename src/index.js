const scrollPercentage = () => {
	const bodyST = document.body.scrollTop;
	const docST = document.documentElement.scrollTop;
	const docSH = document.documentElement.scrollHeight;
	const docCH = document.documentElement.clientHeight;

	return ((docST + bodyST) / (docSH - docCH)) * 100;
};

const defaultConfig = {
	top: 0,
	left: 0,
	right: 0,
	bottom: "auto"
};

const scrollProgress = ({ config = defaultConfig }) => {
	document.addEventListener("DOMContentLoaded", () => {
		window.onscroll = () => {
			const progress = (scrollPercentage() / 100).toFixed(3);
			console.log(progress);
			document.body.style.setProperty("--sp-progress", progress);
		};
	});
};

export default scrollProgress;
