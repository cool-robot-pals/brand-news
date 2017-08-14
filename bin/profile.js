/*eslint no-console:0 */

const svg_to_png = require('svg-to-png');
const base64Img = require('base64-img');
const path = require('path');
const fs = require('fs');
const colorGetter = require('./../src/colorscheme.js');
const Twitter = require('twitter');
const env = require('./../env.js');
const chalk = require('chalk');

const client = new Twitter({
	consumer_key: env.twitterConsumerKey,
	consumer_secret: env.twitterConsumerSecret,
	access_token_key: env.twitterAccess,
	access_token_secret: env.twitterSecret
});

const files = [
	path.resolve(__dirname,'..','assets','avatar.svg'),
	path.resolve(__dirname,'..','assets','cover.svg'),
];

const exported = [
	path.resolve(__dirname,'..','build','avatar.png'),
	path.resolve(__dirname,'..','build','cover.png'),
];

let complete = 0;
const completeAndCheck = () => {
	complete++;
	if(complete >= 3) {
		console.info(chalk.green('✔ Updated profile colors'));
	}
};

colorGetter().then(colors => {

	files.map(file => {
		const original = file.replace('.svg','-original.svg');
		let content = fs.readFileSync(original,'utf8');
		content = content.replace(/#000000/g,'#'+colors.color).replace(/#FFFFFF/g,'#'+colors.complement);
		fs.writeFileSync(file, content);
	});


	svg_to_png.convert(files, path.resolve(__dirname,'..','build'),{
		compress: true,
	}).then(()=>{

		client.post('account/update_profile_image.json',{
			'image': base64Img.base64Sync(exported[0]).replace('data:image/png;base64,','')
		},(err)=>{
			if(err) {
				console.error(err);
				throw err;
			} else {
				completeAndCheck();
			}
		});
		client.post('account/update_profile_banner.json',{
			'banner': base64Img.base64Sync(exported[1]).replace('data:image/png;base64,','')
		},(err)=>{
			if(err) {
				console.error(err);
				throw err;
			} else {
				completeAndCheck();
			}
		});
		client.post('account/update_profile.json',{
			'profile_link_color': colors.dark
		},(err)=>{
			if(err) {
				console.error(err);
				throw err;
			} else {
				completeAndCheck();
			}
		});

	});

});
