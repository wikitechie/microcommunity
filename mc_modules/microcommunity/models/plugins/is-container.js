var mongoose = require('mongoose')
	, hasWall = require('./has-wall')
	, hasStream = require('./has-stream')		
	, _ = require('underscore')

module.exports = function isContainer(schema, options){
	
	var	containerType = 'container'	
	var	defaultRoles = [ "mc:admin", "mc:member" ]	
	var displayNameAttribute = 'displayName'
	
	if (options){	
		if (options.containerType){
			containerType = options.containerType
		}
		if (options.defaultRoles){
			defaultRoles	= options.defaultRoles
		}
		if (options.displayNameAttribute)
			displayNameAttribute = options.displayNameAttribute
	}	
	
	var membershipsSchema = new mongoose.Schema({
		user : { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
		roles : [ String ]
	})	

	schema.add({
		containerType : { type : String, default : containerType },
		roles : [ String ],
		memberships : [ membershipsSchema ]			
	})
	
	schema.methods.populateMemberships = function(callback){
		this.populate('memberships.user', callback)		
	}
	
	//adding default roles	
	schema.pre('save', function(next){
		if (this.isNew){
			this.roles = defaultRoles								
		}
		next()
	})
	
	schema.methods.isMember = function(user){
		var existingMembership = _.find(this.memberships, function(membership){ 
			return (membership.user.toString() === user.id.toString()) 
		})		
		if (typeof existingMembership === "undefined"){
			return false
		} else {
			return existingMembership
		}			
	}
	
	schema.methods.membershipIndex = function(targetMembership){		
		var index = 0		
		for (index=0; index<this.memberships.length; index++){
			var membership = this.memberships[index]
			if (membership.id.toString() === targetMembership.id.toString()){
				return index
			}	
		}
		return -1		
	}	
	
	schema.methods.isValidRoleName = function(roleName){
		var matchingRole = _.find(this.roles, function(role){	return (role === roleName) })
		if (typeof matchingRole === "undefined"){
			return false
		} else {
			return matchingRole
		}	
	}
	
	schema.methods.hasRole = function(user, roleName){
		var membership = this.isMember(user)
		var role = this.isValidRoleName(roleName)		
		
		if (!role)
			throw new Error("MicroCommunity: Container of type '" + this.containerType + "' does not have role '" + roleName + "'")		
		
		if (membership && role){
			var resultRole = _.find(membership.roles, function(userRole){
				return (userRole === role)
			})			
			if (typeof resultRole === "undefined"){
				return false
			} else {
				return true			
			}			
		} else 
			return false
	}
	
	schema.methods.newMembership = function(user){
		if (!this.isMember(user)){
			return this.memberships.push({ user : user })			
		} else {
			return false
		}		
	}

	schema.methods.addRole = function(user, roleName){		
		var membership = this.isMember(user)
		var role = this.isValidRoleName(roleName)		
		
		if (!role)
			throw new Error("MicroCommunity: Container of type '" + this.containerType + "' does not have role '" + roleName + "'")
			
		if (!membership)
			throw new Error("MicroCommunity: Container of type '" + this.containerType + "' does not have member '" + user.id + "'")	
			
		var index = this.membershipIndex(membership)
		this.memberships[index].roles.push(role)	
				
	}	
	
	//populating options
	schema.pre('init', function(next, doc){
		//dangerous hack!
		var type = doc.containerType
		if (!type) type = containerType
		//
		var mc = require('microcommunity')
		var modelName = mc.models.convert(type, 'object', 'model')
		var populateContainer = mc.models.getModel(modelName).populateContainer
		if (populateContainer){			
			populateContainer(doc, next)
		}	else {
			next()
		}

	})
	
	
	
	schema.plugin(hasWall, { displayNameAttribute : displayNameAttribute, wallType : containerType })
	schema.plugin(hasStream)
	
}
