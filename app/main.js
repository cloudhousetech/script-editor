
requirejs(['common'], function(common) {
	
	requirejs(['knockout', 'X2JS', 'cryptoJS', 'component-loader'], function(ko, X2JS, cryptoJS) {
		function MainViewModel() {
			const self = this,
				x2js = new X2JS(),
				iv = window.localStorage.getItem('iv');
				key = window.localStorage.getItem('key');
				
			self.script = ko.observable();
			self.key = ko.observable(key);
			self.iv = ko.observable(iv);
			self.fileData = ko.observable({dataURL: ko.observable(), text: ko.observable()});
			self.fileData().dataURL.subscribe(
				function(dataURL){
					decrypt();
			});
			self.iv.subscribe(function(iv) {
				window.localStorage.setItem('iv', iv);
			});
			self.key.subscribe(function(key) {
				window.localStorage.setItem('key', key);
			});
			
			function decrypt(){
				var key  = cryptoJS.enc.Latin1.parse(self.key());
				var iv = cryptoJS.enc.Latin1.parse(self.iv());
				var bytes = cryptoJS.DES.decrypt(self.fileData().text().substring(2), key, {mode: cryptoJS.mode.ECB, iv: iv});
				var plainText = bytes.toString(cryptoJS.enc.Utf8);
				self.script(x2js.xml_str2json(plainText));
			}

			return self;
		}
		
		ko.applyBindings(MainViewModel(), document.body)
	});
});

