const puppeteer = require('puppeteer');

const BannerButtonsTests = async (page, URL, FileName) => {
	const BannerButtons = await page.$$eval('button', (Buttons) =>
		Buttons.map((Button) => {
			if (Button.innerText == '') return;

			const style = window.getComputedStyle(Button);
			return {
				fontSize: style.getPropertyValue('font-size'),
				fontWeight: style.getPropertyValue('font-weight'),
				fontFamily: style.getPropertyValue('font-family'),
				backgroundcolor: style.getPropertyValue('background-color'),
				color: style.getPropertyValue('color'),
				textContent: Button.innerText,
				isClickable: !Button.disabled,
			};
		})
	);

	const BannerButtonTests = BannerButtons.map((Button, index) => {
		console.log(
			`Generating Banner Button Test (${index + 1}/${BannerButtons.length})`
		);

		if (Button !== null) {
			return {
				name: `${Button.textContent} Banner Button Test`,
				TestType: 'Button',
				test: [
					{
						name: 'Verifies button text content',
						test: {
							url: `${URL}`,
							selector: 'button',
							assertion: 'contain',
							value: `${Button.textContent}`,
						},
					},
					{
						name: 'Verifies button font sizing',
						test: {
							url: `${URL}`,
							selector: 'button',
							assertion: 'have.css',
							property: 'font-size',
							value: '14px',
						},
					},
					{
						name: 'Verifies button font family',
						test: {
							url: `${URL}`,
							selector: 'button',
							assertion: 'have.css',
							property: 'font-family',
							value: 'BrandonGrotesqueWeb-Reg',
						},
					},
					{
						name: 'Verifies button background color',
						test: {
							url: `${URL}`,
							selector: 'button',
							assertion: 'have.css',
							property: 'background-color',
							value: '#fff',
						},
					},
				],
			};
		}
	});

	console.log('Generated all banner Button tests successfully');

	return BannerButtonTests;
};

module.exports = { BannerButtonsTests };