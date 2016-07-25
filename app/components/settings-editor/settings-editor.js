ko.components.register('settings-editor', {
    viewModel: function(params) {
		var self=this;

		self.postponedUpdateAllowed = ko.observable();
		self.postponedUpdateMaxTries = ko.observable();
		self.postponedUpdateForceUpdateDate	= ko.observable();
		self.postponedUpdateMessage= ko.observable();
		self.togglePostponedUpdateAllowed = function(){
			self.postponedUpdateAllowed(!self.postponedUpdateAllowed());
		}
		
		params.script.subscribe(function(value){
			self.postponedUpdateAllowed(value.CloudloaderScript.ScriptSetting.PostponedUpdateAllowed === 'true')
			self.postponedUpdateMaxTries(value.CloudloaderScript.ScriptSetting.PostponedUpdateMaxTries)
			self.postponedUpdateForceUpdateDate(value.CloudloaderScript.ScriptSetting.PostponedUpdateForceUpdateDate)
			self.postponedUpdateMessage(value.CloudloaderScript.ScriptSetting.PostponedUpdateMessage)
		});
			
		
        
    },
    template: 
	'<h1>Settings</h1>'
+	'<form>'
+	'<div class="form-group"><button type="button" class="btn btn-primary" aria-controls="postponedUpdateSettings" data-toggle="collapse" autocomplete="off" data-target="#postponedUpdateSettings" data-bind="click: togglePostponedUpdateAllowed, attr: {\'aria-expanded\': postponedUpdateAllowed}, text: postponedUpdateAllowed() ? \'Postponed Update Allowed\': \'Postponed Update Not Allowed\'"></button></div>'
+	'<div class="collapse" id="postponedUpdateSettings">'
+	'<div class="form-group"><label for="postponedUpdateMaxTries">PostponedUpdateMaxTries:</label> <input id="postponedUpdateMaxTries" class="form-control" type="text" data-bind="value: postponedUpdateMaxTries" /></div> '
+	'<div class="form-group"><label for="postponedUpdateForceUpdateDate">PostponedUpdateForceUpdateDate:</label> <input id="postponedUpdateForceUpdateDate" class="form-control" type="datetime-local" data-bind="value: postponedUpdateForceUpdateDate" /></div> '
+	'<div class="form-group"><label for="postponedUpdateMessage">PostponedUpdateMessage:</label> <textarea  id="postponedUpdateMessage" class="form-control" rows="3" data-bind="value: postponedUpdateMessage" /></div> '
+	'</div>'
+ 	'</form>'
});