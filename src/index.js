const scrollPercent = () => {
	const bodyST = document.body.scrollTop;
	const docST = document.documentElement.scrollTop;
	const docSH = document.documentElement.scrollHeight;
	const docCH = document.documentElement.clientHeight;

	return ((docST + bodyST) / (docSH - docCH)) * 100;
};

document.addEventListener("DOMContentLoaded", () => {
	window.onscroll = () => {
		const progress = (scrollPercent() / 100).toFixed(3);
		console.log(progress);
		document.body.style.setProperty("--sp-progress", progress);
	};
});