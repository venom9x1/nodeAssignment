const Role = require('../model/Roles')


const createRole = async ()=>{
   
    try { 
    	const count = await Role.estimatedDocumentCount()
	    if(count > 0) return null ;

	    const value = await Promise.all([
	    	 new Role({name:'customer'}).save(),
	         new Role({name:'moderator'}).save(),
	         new Role({name:'admin'}).save()
	    ])
	    console.log(value)
    } catch(e) {
    	console.log(e);
    }
}   

module.exports ={
	createRole
}