ko.applyBindings(function() {
	var self = this;
	self.script = ko.observable();
	
	$.getJSON('sample.json').done(function(data) {
		self.script(data);
	});
} ,document.body)