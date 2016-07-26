ko.components.register('actions-view', {
    viewModel: function(params) {
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
				
				allActions.push(_.merge({type: type, id: action['-Id'], userMessage: action['-UserMessage']}, action))
			}
			
			self.actions(allActions);
		});
    },
    template: 	'<h1>Actions</h1>'
+	'<ul class="list-unstyled" data-bind="foreach: actions, as:action">'
+		'<li class="well">'
+		'<h2><span data-bind="text: id"></span><span>   </span><small data-bind="text: type"></small><span>   </span><small data-bind="text: userMessage"></small></h2>'
+		'<h4>Results</h4>'
+			'<div class="form-horizontal" data-bind="foreach: Results">'
+				'<div class="form-group">'
+					'<label class="control-label col-sm-3" data-bind="text: $data[\'-ResultText\']"> </label>'
+					'<div class="col-sm-6">'
+						'<p class="form-control-static" data-bind="text: $data[\'-ResultAction\']"></p>'
+					'</div>'
+				'</div>'
+			'</div>'
+		'</li>'
+	'</ul>'
});