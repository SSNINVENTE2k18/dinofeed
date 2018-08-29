const gsheet = require('./gsheet');
const slugify = require('slugify');
const dept = require('../data/dept.json');
const fs =require('fs');
const _ = require('lodash');
const sheetId = '1t9WychTprrrYWdO4-vLBCFAjUXZG_VywDgEZ6NtJHKA';

gsheet(sheetId).then( data => {
	let obj = {};
	let eventList = [];
	Object.keys(dept).forEach(x => obj[x]= {});
	console.log(obj);
	data.entry.forEach( entry => {
		let fields = fieldMap(entry);
		eventList.push(slugify(fields.eventname.toLowerCase(),'-'));


		fields.department = slugify(fields.department,{
			lower:'true',
			replacement:'-'
		});

		obj[fields.department][slugify(fields.eventname,{lower:'true',replacement:'-'})] = fields.eventname;
		//depts[fields.department] || [];
		//depts[fields.department].push(fields.eventname);
		//[fields.eventname] = fields;
	});
	let uniqEventList = _.uniq(eventList);
	console.log(_.uniq(eventList).join(','));
	fs.writeFile('./eventlist.json',JSON.stringify(obj),(err,data)=>{
		console.log(err,data);
	});
	/*({
		[slugify(entry.gsx$eventname.$t,{lower:true})] : fieldMap(entry)
	}));





	*-+/iteFile('../eventlist.json',JSON.stringify(latestData));
	console.log(Object.assign(...latestData));
	*/
});



function fieldMap(entry){
	let arr = Object.keys(entry).filter(x => x.includes('gsx$')).map(field => ({
		[field.slice(4)]:entry[field].$t
	}));
	return Object.assign(...arr);
}
