function MainViewModel() {
	var self = this,
		x2js = new X2JS();
	self.script = ko.observable();
	self.key = ko.observable();
	self.iv = ko.observable();
	self.fileData = ko.observable({dataURL: ko.observable(), text: ko.observable()});
	self.fileData().dataURL.subscribe(
	function(dataURL){
		decrypt();
	});
	
	function decrypt(){
		var key  = CryptoJS.enc.Latin1.parse(self.key());
		var iv = CryptoJS.enc.Latin1.parse(self.iv());
		var bytes = CryptoJS.DES.decrypt(self.fileData().text().substring(2), key, {mode: CryptoJS.mode.ECB, iv: iv});
		var plainText = bytes.toString(CryptoJS.enc.Utf8);
		self.script(x2js.xml_str2json(plainText));
	}
	
	$.getJSON('sample.json').success(function(data){
		self.key(data.key);
		self.iv(data.iv);
	});

	return self;
}

ko.applyBindings(MainViewModel() ,document.body)