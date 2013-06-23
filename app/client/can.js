define(function(){

	return function(action, object){

		switch (action) {
		
			case "comment":			
					if (!this.isLoggedIn()) { return false }
					else {		
						var wallType = object.get('wall').get('wallType')		
						if ( wallType === 'user' ){
							return true		
						}	else if ( wallType == 'material' ) {
							if (this.isContainerMember()){
								return true
							} else {
								return false
							}				
						}		
					}					
			
			break
			
			case "publishOnWall":
			
				if (!this.isLoggedIn()) { return false }		
				else {		
					var wallType = object.get('wallType')		
					if ( wallType === 'user' ){
						if ( object.get('owner').$id === this.currentUser.id ) {
							return true
						} else {
							return false			
						}			
					}	else if ( wallType == 'material' ) {			
						if (this.isContainerMember()){
							return true
						} else {
							return false
						}				
					}		
				}						
			
			break
					
		}	
	}

})
