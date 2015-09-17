define(function(require) {
  var $ = require('jquery'),
  Backbone = require('backbone'),
  headerAjax = require('ajax/header'),
  templateSecretarias = require('hbs!views/template/secretarias');

  return Backbone.View.extend({

    template : templateSecretarias,
    events : {
    },

    initialize : function() {
      this.buscarSecretarias();
    },

    render : function(secretarias) {
      this.$el.html(this.template({'secretarias' : secretarias}));
      return this;
    },

    buscarSecretarias : function() {
      var self = this;
      headerAjax.findSecretarias(function(retorno){
        self.render(retorno);
      });
    },

  });
});