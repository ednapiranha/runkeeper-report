requirejs.config({
  deps: ['main'],
  paths: {
    'jquery': 'lib/jquery',
    'nunjucks': 'lib/nunjucks',
    'asyncStorage': 'lib/asyncStorage'
  },
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'nunjucks': {
      exports: 'nunjucks'
    },
    'asyncStorage': {
      exports: 'asyncStorage'
    }
  }
});
