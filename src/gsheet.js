const axios = require('axios');

const fetch = ( sheetId ) => new Promise( (resolve,reject) => {
	let url = `https://spreadsheets.google.com/feeds/list/${sheetId}/1/public/values?alt=json`;
	console.log(url);
	axios.get(url).then(data => {
		resolve(data.data.feed);
	}).catch(err=> reject(err));
});

module.exports = fetch;