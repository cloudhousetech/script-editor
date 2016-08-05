requirejs.config({
    baseUrl: '',
    paths: {
        X2JS: '../node_modules/x2js/xml2json.min',
        cryptoJS: '../node_modules/crypto-js/crypto-js',
        _: '../node_modules/lodash/lodash.min',
        jquery: '../node_modules/jquery/dist/jquery.min',
        bootstrap: '../node_modules/bootstrap/dist/js/bootstrap.min',
        knockout: '../node_modules/knockout/build/output/knockout-latest',
        koMapping: '../node_modules/knockout-mapping/dist/knockout.mapping',
        koFileBindings: '../bower_components/knockout-file-bindings/knockout-file-bindings',
		text: '../node_modules/text/text',
    }
});


require(['koFileBindings'])