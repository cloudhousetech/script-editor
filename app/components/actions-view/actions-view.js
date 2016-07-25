ko.components.register('actions-view', {
    viewModel: function(params) {
		var self=this;

		self.actions = ko.observable([]);
				
		params.script.subscribe(function(value){
			var allActions = [];
			
			if (value.CloudloaderScript.Actions){
				_.forIn(value.CloudloaderScript.Actions, function(actions, type){
					if (_.isArray(actions)){
						_.each(actions, function (action) {
							if (action.Results && !_.isArray(action.Results.Result)){
								action.Results = [action.Results.Result]
							}else if (action.Results) {
								action.Results = action.Results.Result
							}
							allActions.push(_.merge({type: type, id: action['-Id'], userMessage: action['-UserMessage']}, action))
						});
					} else {
						if (actions.Results && !_.isArray(actions.Results.Result)){
								actions.Results = [actions.Results.Result]
						} else if (actions.Results){
							actions.Results = actions.Results.Result
						}
						allActions.push(_.merge({type: type, id: actions['-Id'], userMessage: actions['-UserMessage']}, actions))
					}
				});
			}
			
			self.actions(allActions);
		});
    },
    template: 	'<h1>Actions</h1>'
+	'<ul class="list-unstyled" data-bind="foreach: actions, as:action">'
+		'<li class="well">'
+		'<div class="row">'
+			'<div class="col-md-6">'
+				'<div class="form-horizontal">'
+					'<div class="form-group">'
+						'<label class="control-label col-sm-2">Id: </label>'
+						'<div class="col-sm-10">'
+							'<p class="form-control-static" data-bind="text: id"></p>'
+						'</div>'
+					'</div>'
+					'<div class="form-group">'
+						'<label class="control-label col-sm-2">Type: </label>'
+						'<div class="col-sm-10">'
+							'<p class="form-control-static" data-bind="text: type"></p>'
+						'</div>'
+					'</div>'
+					'<div class="form-group">'
+						'<label class="control-label col-sm-2">User Message: </label>'
+						'<div class="col-sm-10">'
+							'<p class="form-control-static" data-bind="text: userMessage"></p>'
+						'</div>'
+					'</div>'
+				'</div>'
+			'</div>'
+			'<div class="col-md-6">'
+				'<div class="form-horizontal" data-bind="foreach: Results">'
+					'<div class="form-group">'
+						'<label class="control-label col-sm-6" data-bind="text: $data[\'-ResultText\']"> </label>'
+						'<div class="col-sm-6">'
+							'<p class="form-control-static" data-bind="text: $data[\'-ResultAction\']"></p>'
+						'</div>'
+					'</div>'
+				'</div>'
+			'</div>'
+		'</div>'
+		'</li>'
+	'</ul>'
});