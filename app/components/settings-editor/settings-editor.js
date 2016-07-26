ko.components.register('settings-editor', {
    viewModel: function(params) {
		var self=this;
		self.settings = ko.observable(
		{
			PostponedUpdateAllowed: ko.observable(),
			PostponedUpdateMaxTries: ko.observable(),
			PostponedUpdateForceUpdateDate: ko.observable(),
			PostponedUpdateMessage: ko.observable()
		});
		
		self.togglePostponedUpdateAllowed = function(){
			ko.unwrap(self.settings).PostponedUpdateAllowed(!ko.unwrap(self.settings).PostponedUpdateAllowed());
		}
		
		params.script.subscribe(function(value){
			self.settings(ko.mapping.fromJS(value.CloudloaderScript.ScriptSetting))
		});
			
		function save(){
			value.CloudloaderScript.ScriptSetting = ko.toJS(self.settings)
		}
    },
    template: 
	'<h1>Settings</h1>'
+	'<form>'
+	'<div class="form-group"><button type="button" class="btn btn-primary" aria-controls="postponedUpdateSettings" data-toggle="collapse" autocomplete="off" data-target="#postponedUpdateSettings" data-bind="click: togglePostponedUpdateAllowed, attr: {\'aria-expanded\': settings().PostponedUpdateAllowed}, text: settings().PostponedUpdateAllowed() ? \'Postponed Update Allowed\': \'Postponed Update Not Allowed\'"></button></div>'
+	'<div class="collapse" id="postponedUpdateSettings">'
+	'<div class="form-group"><label for="postponedUpdateMaxTries">PostponedUpdateMaxTries:</label> <input id="postponedUpdateMaxTries" class="form-control" type="text" data-bind="value: settings().PostponedUpdateMaxTries" /></div> '
+	'<div class="form-group"><label for="postponedUpdateForceUpdateDate">PostponedUpdateForceUpdateDate:</label> <input id="postponedUpdateForceUpdateDate" class="form-control" type="datetime-local" data-bind="value: settings().PostponedUpdateForceUpdateDate" /></div> '
+	'<div class="form-group"><label for="postponedUpdateMessage">PostponedUpdateMessage:</label> <textarea  id="postponedUpdateMessage" class="form-control" rows="3" data-bind="value: settings().PostponedUpdateMessage" /></div> '
+	'</div>'
+ 	'</form>'
});