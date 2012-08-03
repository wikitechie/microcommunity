define [
	'jquery'
	'cs!models/activity'
	#'cs!views/activity'	
], ($, Activity, ActivityView)->
	describe 'Activity View', ()->
	
		describe 'Rendering an activity about a post', ()->		
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

