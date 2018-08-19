const gsheet = require('./gsheet');
const slugify = require('slugify');
const fs =require('fs');
const sheetId = '1t9WychTprrrYWdO4-vLBCFAjUXZG_VywDgEZ6NtJHKA';

gsheet(sheetId).then(data=> {
	let latestData = data.entry.map( entry => ({
		[slugify(entry.gsx$eventname.$t,{lower:true})] : fieldMap(entry)
	}));
	fs.writeFile('../eventlist.json',JSON.stringify(latestData));
	console.log(Object.assign(...latestData));
});



function fieldMap(entry){
	let arr = Object.keys(entry).filter(x => x.includes('gsx$')).map(field => ({
		[field.slice(4)]:entry[field].$t
	}));
	return Object.assign(...arr);
}

