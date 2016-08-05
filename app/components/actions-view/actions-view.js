
define(['knockout'], function (ko){
	
return ActionsViewModel;

function ActionsViewModel(params) {
	var self=this;

	self.actions = ko.observable([]);
			
	params.script.subscribe(function(value){
		var allActions = [];
		
		if (value.CloudloaderScript.Actions){
			_.forIn(value.CloudloaderScript.Actions, function(actions, type){
				if (_.isArray(actions)){			
					_.each(actions, function (action) {addAction(action, type)});
				} else {
					addAction(actions, type);
				}
			});
		}
		
		function addAction(action, type) {
			if (action.Results && !_.isArray(action.Results.Result)){
				action.Results = [action.Results.Result];
			}else if (action.Results) {
				action.Results = action.Results.Result;
			}else if (!action.Results){
				action.Results = [];
			}
			
			_.each(action.Results, function(result) {
				
				if (result._ResultAction == "" && result._EndScript) {
					result.goodend = true;
					result.badend = false;
					result.noend = false;
				}
				if (result._ResultAction == ""&& !result._EndScript) {
					result.badend = true;
					result.goodend = false;
					result.noend = false;
				}
				if (result._ResultAction != "") {
					result.noend = true;
					result.badend = false;
					result.goodend = false;
				}
			});
			
			allActions.push(_.merge({type: type, id: action['_Id'], userMessage: action['_UserMessage']}, action))
		}
		
		self.actions(allActions);
	});
}
});



