const { execSync } = require('child_process');
const fs = require('fs');
const https = require('https');
const querystring = require('querystring');

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
		const appId = '9NBLGGH4NC12';
		const tenantId = process.env.EDGE_TENANT_ID;
		const clientId = process.env.EDGE_CLIENT_ID;
		const clientSecret = process.env.EDGE_CLIENT_SECRET;

		const content = querystring.stringify({
			grant_type: 'client_credentials',
			resource: 'https://manage.devcenter.microsoft.com',
			client_id: clientId,
			client_secret: clientSecret,
		});

		// https://docs.microsoft.com/en-us/windows/uwp/monetize/create-and-manage-submissions-using-windows-store-services#obtain-an-azure-ad-access-token
		const req = https.request({
			method: 'POST',
			hostname: 'login.microsoftonline.com',
			path: `/${tenantId}/oauth2/token`,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Content-Length': content.length,
			},
		}, res => {
			let data = '';
			res.on('data', d => { data += d.toString('utf8'); });
			res.on('end', () => {
				const accessToken = JSON.parse(data).access_token;
				// https://docs.microsoft.com/en-us/windows/uwp/monetize/get-app-data
				https.get({
					hostname: 'manage.devcenter.microsoft.com',
					path: `/v1.0/my/applications/${appId}`,
					headers: { Authorization: `Bearer ${accessToken}` },
				}, res => {
					let data = '';
					res.on('data', d => { data += d.toString('utf8'); });
					res.on('end', () => {
						const submissionId = JSON.parse(data).lastPublishedApplicationSubmission.id;
						// https://docs.microsoft.com/en-us/windows/uwp/monetize/get-status-for-an-app-submission
						https.get({
							hostname: 'manage.devcenter.microsoft.com',
							path: `/v1.0/my/applications/${appId}/submissions/${submissionId}`,
							headers: { Authorization: `Bearer ${accessToken}` }
						}, res => {
							let data = '';
							res.on('data', d => { data += d.toString('utf8'); });
							res.on('end', () => {
								const version = JSON.parse(data).applicationPackages[0].version.slice(0, -'.0'.length);
								config = config.replace(/edge_version:.+/, `edge_version: v${version}`);
								done();
							});
						});
					});
				});
			});
		});
		req.write(content);
		req.end();
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
				const [, version] = (/<dd>(\d+\.\d+\.\d+)<\/dd>/).exec(data);
				config = config.replace(/opera_version:.+/, `opera_version: v${version}`);
				done();
			});
		});

	},
	function commitAndPush() {
		execSync('git checkout master');
		fs.writeFileSync('./_config.yml', config);
		const added = execSync('git add -v _config.yml', { encoding: 'utf8' }).trim();
		if (!added) {
			console.log('No new versions found.');
			return;
		}
		execSync(`git commit --author="${process.env.BOT_USER} <${process.env.BOT_USER}@users.noreply.github.com>" -m "update versions"`);
		execSync(`git push https://${process.env.BOT_USER}:${process.env.BOT_PASSWORD}@github.com/Reddit-Enhancement-Suite/Reddit-Enhancement-Suite.github.io.git`);
	}
);
