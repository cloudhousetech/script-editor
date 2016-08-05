
define(['knockout', 'koMapping'], function (ko){
	
 return function (params) {
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
	}

});

