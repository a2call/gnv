backofficeApp.factory('cmsService', ['$resource', function ($resource) {

  var City = $resource('/cms/city', null, {
    'update': {method: 'PUT'},
  });

  var Connection = $resource('/cms/city_connections', null, {
    'update': {method: 'PUT'},
  });

  var Supplies = $resource('/cms/supplies', null, {
    'update': {method: 'PUT'},
  });

  var Stories = $resource('/cms/stories', null, {
    'update': {method: 'PUT'},
  });

  return {
    updateCity: function (city) {
      city.affiliates_attributes = city.affiliates ? city.affiliates : [];
      return City.update(city).$promise;
    },

    updateConnection: function (connection) {
      connection.twitter_accounts_attributes = connection.twitter_accounts ? connection.twitter_accounts : [];
      connection.city_networks_attributes = connection.city_networks ? connection.city_networks : [];
      connection.city_resources_attributes = connection.city_resources ? connection.city_resources : [];
      return Connection.update(_(connection).omit('twitter_accounts', 'city_networks', 'city_resources')).$promise;
    },

    updateSupplies: function (essentials, usefuls, personals) {
      var allSupplies = _(essentials).chain().union(usefuls).union(personals).value();
      return Supplies.update({supplies: allSupplies}).$promise;
    },

    updateStories: function (stories, city) {
      return Stories.update({stories: stories, city: city}).$promise;
    }
  }

}]);