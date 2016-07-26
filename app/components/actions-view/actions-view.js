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
    },
    template: 	'<h1>Actions</h1>'
+	'<div class="list-unstyled" data-bind="foreach: actions, as:action">'
+		'<div class="panel panel-primary">'
+     	'<div class="panel-heading">'
+			'<h3><span data-bind="text: id"></span></h3>'
+		'</div>'
+			'<div class="panel-body">'
+				'<span data-bind="text: type"></span><span>   </span><h4>Results</h4>'
+					'<div class="row">'
+						'<div class="col-md-1">'
+						'</div>'
+						'<label class="col-md-3" >Result Text</label>'
+						'<label class="col-md-3" >Result Action</label>'
+					'</div>'
+				'<div class="" data-bind="foreach: Results">'
+					'<div class="row">'
+						'<div class="col-md-1">'
+							'<label class="glyphicon" data-bind="css: {\'glyphicon-play-circle\': noend, \'glyphicon-ok\': goodend, \'glyphicon-remove\': badend}"></label>'
+						'</div>'
+						'<label class="col-md-3" data-bind="text: $data[\'_ResultText\']"> </label>'
+						'<label class="col-md-3" data-bind="text: $data[\'_ResultAction\']"></label>'
+					'</div>'
+				'</div>'
+			'</div>'
+		'</div>'
+	'</div>'
});