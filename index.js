let eventlist = require('./eventlist.json');
let department = require('./dept.json');
const slugify = require('slugify');


const slug = (str)=> slugify(str,{lower:true,replacement:'-'});
module.exports = {
	eventlist,department,slug
};