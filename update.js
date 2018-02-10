const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');
const url = require('url');

function seq(fn, ...fns) {
	fn(fns.length > 0 ? () => seq(...fns) : () => {});
}

let config = fs.readFileSync('./_config.yml', 'utf8');

seq(
	function updateChrome(done) {
		https.get('https://img.shields.io/chrome-web-store/v/kbmfpngjjgdllneeigpgjifpgocmfgmb.json', res => res.on('data', d => {
			const { value } = JSON.parse(d);
			config = config.replace(/chrome_version:.+/, `chrome_version: ${value}`);
			done();
		}));
	},
	function updateEdge(done) {
		https.get(Object.assign(
			url.parse('https://www.microsoft.com/en-ca/store/p/reddit-enhancement-suite/9nblggh4nc12'),
			{ headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36' } }
		), res => {
			let data = '';
			res.on('data', d => { data += d.toString('utf8'); });
			res.on('end', () => {
				const [, version] = (/Version number: (\d+\.\d+\.\d+)/).exec(data);
				config = config.replace(/edge_version:.+/, `edge_version: v${version}`);
				done();
			});
		});
	},
	function updateFirefox(done) {
		https.get('https://img.shields.io/amo/v/reddit-enhancement-suite.json', res => res.on('data', d => {
			const { value } = JSON.parse(d);
			config = config.replace(/firefox_version:.+/, `firefox_version: ${value}`);
			done();
		}));
	},
	function updateOpera(done) {
		https.get('https://addons.opera.com/en-gb/extensions/details/reddit-enhancement-suite-2/', res => {
			let data = '';
			res.on('data', d => { data += d.toString('utf8'); });
			res.on('end', () => {
				const [, version] = (/Version (\d+\.\d+\.\d+)/).exec(data);
				config = config.replace(/opera_version:.+/, `opera_version: v${version}`);
				done();
			});
		});

	},
	function commitAndPush() {
		fs.writeFileSync('./_config.yml', config);
		execSync('git add _config.yml');
		execSync(`git commit --author="${process.env.BOT_USER} <${process.env.BOT_USER}@users.noreply.github.com>" -m "update versions"`);
		execSync(`git push https://${process.env.BOT_USER}:${process.env.BOT_PASSWORD}@github.com/Reddit-Enhancement-Suite/Reddit-Enhancement-Suite.github.io.git`);
	}
);
