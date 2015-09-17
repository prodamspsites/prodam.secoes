define(function(require) {

  var $ = require('jquery'),
  Backbone = require('backbone'),
  headerAjax = require('ajax/header'),
  templateSubprefeituras = require('hbs!views/template/subprefeituras');

  return Backbone.View.extend({
    template : templateSubprefeituras,
    initialize : function() {
      this.buscarSubprefeituras();
    },

    render : function(subprefeituras) {
      this.$el.html(this.template({'subprefeituras' : subprefeituras}));
    },

    buscarSubprefeituras : function() {
      var self = this;
      headerAjax.findSubprefeituras(function(retorno){
        self.render(retorno);
      });
    },
  });
});