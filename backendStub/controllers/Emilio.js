'use strict';

var utils = require('../utils/writer.js');
var Emilio = require('../service/EmilioService');

module.exports.addMenu = function addMenu (req, res, next) {
  var body = req.swagger.params['body'].value;
  Emilio.addMenu(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerDELETE = function apiUserOwnerDELETE (req, res, next) {
  Emilio.apiUserOwnerDELETE()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerGET = function apiUserOwnerGET (req, res, next) {
  Emilio.apiUserOwnerGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerPUT = function apiUserOwnerPUT (req, res, next) {
  var body = req.swagger.params['body'].value;
  Emilio.apiUserOwnerPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerPasswordPUT = function apiUserOwnerPasswordPUT (req, res, next) {
  var body = req.swagger.params['body'].value;
  Emilio.apiUserOwnerPasswordPUT(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.apiUserOwnerTagGET = function apiUserOwnerTagGET (req, res, next) {
  Emilio.apiUserOwnerTagGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteMenu = function deleteMenu (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  Emilio.deleteMenu(menuID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editMenu = function editMenu (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  var body = req.swagger.params['body'].value;
  Emilio.editMenu(menuID,body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editRestaurant = function editRestaurant (req, res, next) {
  var body = req.swagger.params['body'].value;
  Emilio.editRestaurant(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getItemsOfMenu = function getItemsOfMenu (req, res, next) {
  var menuID = req.swagger.params['menuID'].value;
  Emilio.getItemsOfMenu(menuID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMenusOfRestaurant = function getMenusOfRestaurant (req, res, next) {
  var restaurantID = req.swagger.params['restaurantID'].value;
  Emilio.getMenusOfRestaurant(restaurantID)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getRestaurants = function getRestaurants (req, res, next) {
  Emilio.getRestaurants()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
