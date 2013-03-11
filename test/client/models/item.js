define([
	'models/item',
], function(Item){
	describe('Item Model', function(){
		it('should work', function(){
			var item = new Item
			item.should.be.ok
		})
	})

})
