const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');
const querystring = require('querystring');

function request(options, doWrite = () => {}) {
	return new Promise((resolve, reject) => {
		const res = https.request(options, res => {
			let data = '';
			res.on('data', d => { data += d.toString('utf8'); });
			res.on('end', () => { resolve(data); });
		});
		res.on('error', reject);
		doWrite(res);
		res.end();
	});
}

(async () => {
	let config = fs.readFileSync('./_config.yml', 'utf8');

	// ----- Chrome -----
	const { value: chromeVersion } = JSON.parse(await request('https://img.shields.io/chrome-web-store/v/kbmfpngjjgdllneeigpgjifpgocmfgmb.json'));
	config = config.replace(/chrome_version:.+/, `chrome_version: ${chromeVersion}`);

	// ----- Edge -----
	// TODO: set this to the chrome version when Chromium Edge is mainstream
	//config = config.replace(/edge_version:.+/, `edge_version: v${edgeVersion}`);

	// ----- Firefox -----
	const { value: firefoxVersion } = JSON.parse(await request('https://img.shields.io/amo/v/reddit-enhancement-suite.json'));
	config = config.replace(/firefox_version:.+/, `firefox_version: ${firefoxVersion}`);

	// ----- Opera -----
	//const operaPage = await request('https://addons.opera.com/en-gb/extensions/details/reddit-enhancement-suite-2/');
	//const [, operaVersion] = (/<dd>(\d+\.\d+\.\d+)<\/dd>/).exec(operaPage);
	//config = config.replace(/opera_version:.+/, `opera_version: v${operaVersion}`);

	// ----- Commit Changes -----
	execSync('git checkout master');
	fs.writeFileSync('./_config.yml', config);
	const added = execSync('git add -v _config.yml', { encoding: 'utf8' }).trim();
	if (!added) {
		console.log('No new versions found.');
		return;
	}
	execSync(`git commit --author="${process.env.BOT_USER} <${process.env.BOT_USER}@users.noreply.github.com>" -m "update versions"`);
	execSync(`git push https://${process.env.BOT_USER}:${process.env.BOT_PASSWORD}@github.com/Reddit-Enhancement-Suite/Reddit-Enhancement-Suite.github.io.git`);
})().catch(e => {
	console.error(e);
	process.exitCode = 1;
});
