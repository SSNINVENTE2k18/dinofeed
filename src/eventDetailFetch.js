const gsheet = require('./gsheet');
const slugify = require('slugify');
const dept = require('../data/dept.json');
const eventlist = require('../data/eventlist.json');
const fs =require('fs');
const _ = require('lodash');
const sheetId = '1g8_Aj2J3jtdzkwOhPvAmNLQhmhN93pL8X7BCKzBFDxA';

gsheet(sheetId).then( data => {
	let obj = {};
	Object.keys(dept).forEach(x => obj[x]= {});
	data.entry.forEach( entry => {
		let fields = fieldMap(entry);

		obj[fields.dept][fields.eventname] = clean(fields);

	});

	console.log(obj);
	write('../data/eventdetail.json',obj);

});


function clean(obj){
	//let cleanobj = {};
	let cleanobj = {
		email:obj.email,
		dept:obj.dept,
		slug:obj.eventname,
		last_updated:obj.timestamp,
		description:obj.description,
		eventtype:obj.eventtype,
		tagline:obj.taglineifany || null,
		eventname:eventlist[obj.dept][obj.eventname],
		notes:obj.notesifany,
		eventHeads:[{
				name:obj.eventhead1name,
				email:obj.eventhead1gmailssnmailid,
				contact:obj.contactnumber},
			{
				name:obj.eventhead2name,
				email:obj.eventhead2gmailssnmailid,
				contact:obj.eventhead2contactnumber
			}]

	};

	cleanobj.attachments = obj['attachmenturlifanyex-googledocsforms'].split('\n','') || [];
	cleanobj.rules = Array(5).fill(0).map((x,i)=> obj[`round${i}rules`]/*.split('\n') */|| []) || [];

	return cleanobj;

}

function write(path,obj){
	let str = JSON.stringify(obj,null,2);
	fs.writeFile(path,str,(err,dat)=>{
		console.log(err,dat);
	})
}

function fieldMap(entry){
	let arr = Object.keys(entry).filter(x => x.includes('gsx$')).map(field => ({
		[field.slice(4)]:entry[field].$t
	}));
	return Object.assign(...arr);
}
