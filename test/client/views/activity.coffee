define [
	'jquery'
	'cs!models/activity'
	'cs!views/activity'	
], ($, Activity, ActivityView)->
	describe 'Activity View', ()->
	
		describe 'Rendering an activity about a post', ()->		
			activity = null
			
			before ()->
				activity = 
					actor:
						_id:"5006de43a836cb97c144ff81"
						email:"actor@email.com"
					object:
						_id : "5016b37f1c97f88c0f00002f"
						text: "Text"
						created_at :"2012-07-30T16:17:03.000Z"
						user : 
							_id: "5006de43a836cb97c144ff81"
							email: "email@service.com"
					object_type : "Post"											
					verb:"create"
					created_at:"2012-08-02T05:27:16.831Z"						
				
			it 'should render the corresponding post view of a create activity'
								
		describe 'Rendering an activity about a wiki page', ()->
			describe 'an activity with create verb', ()->
				it 'should display the correct activity message'			
				it 'should render the corresponding revision embeded'
				
			describe 'an activity with edit verb', ()->
				it 'should display the correct activity message'			
				it 'should render the corresponding revision embeded'
				it 'should render the diff view on demand'												
					
		describe 'Aggregated Activities rendering', ()->
			describe 'several edits on the same wikipage by the same person', ()->
				it 'should display the correct activity message'			
				it 'should render the the last revision embeded'
				
			describe 'several edits on the same wikipage by the many people', ()->
				it 'should display the correct activity message'			
				it 'should render the the last revision embeded'				

