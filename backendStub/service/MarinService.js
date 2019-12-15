'use strict';


/**
 * Add a menuItem to a menu
 * Add a menuItem to the menu with given menuID. Authentication required.
 *
 * menuID Integer ID of the menu
 * body MenuItemWithoutColors Menu data
 * returns Menu
 **/
exports.addMenuItem = function(menuID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "menuItems" : [ {
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "type" : "dish",
    "priceEuros" : 10,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Pasta",
      "color" : "#99C99B"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara"
  }, {
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "type" : "dish",
    "priceEuros" : 7,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Meat",
      "color" : "#FFBC8C"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Meatballs"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Return profile data of the customer
 * Return own data of the logged in customer. This endpoints should be used when the frontend has to visualize the profile of the customer.
 *
 * returns CustomerUsernameAndEmail
 **/
exports.apiUserCustomerGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "username" : "emilio_imperiali",
  "email" : "emilioimperiali@mail.it"
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a review
 * Delete the review with the given reviewID. This will also delete the reviews of the menu items associated to the review with given reviewID.
 *
 * reviewID Integer ID of the review
 * no response value expected for this operation
 **/
exports.apiUserCustomerReviewReviewIDDELETE = function(reviewID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Return pending reviews
 * Return all the pending reviews of the owner's restaurant. Only the image of the receipt is sent (the link to download it from the cloud), together with the name of the reviewed menu and the list of the reviewed menu items.The pending reviews are sent in an array, which will be empty in case there are no pending reviews. With a POST the restaurant owner will approve or disapprove the review.
 *
 * returns List
 **/
exports.apiUserOwnerRestaurantReviewGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "reviewID" : 988,
  "menuName" : "Sea menu",
  "menuItemNames" : [ {
    "menuItemName" : "Spaghetti allo scoglio"
  }, {
    "menuItemName" : "Sashimi"
  } ]
}, {
  "reviewID" : 988,
  "menuName" : "Sea menu",
  "menuItemNames" : [ {
    "menuItemName" : "Spaghetti allo scoglio"
  }, {
    "menuItemName" : "Sashimi"
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Approve or disapprove pending review
 * Submit the decision of the restaurant owner about the pending review with given reviewID (approved or disapproved). In case of a successful operation, an array containing all the pending reviews is sent, so that the frontend is able to refresh the list (the array sent is like the array sent with the GET endpoint).
 *
 * reviewID Integer ID of the pending review
 * body ApprovalStatus Submitted status of pending review (approved or disapproved)
 * returns List
 **/
exports.apiUserOwnerRestaurantReviewReviewIDPOST = function(reviewID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "reviewID" : 988,
  "menuName" : "Sea menu",
  "menuItemNames" : [ {
    "menuItemName" : "Spaghetti allo scoglio"
  }, {
    "menuItemName" : "Sashimi"
  } ]
}, {
  "reviewID" : 988,
  "menuName" : "Sea menu",
  "menuItemNames" : [ {
    "menuItemName" : "Spaghetti allo scoglio"
  }, {
    "menuItemName" : "Sashimi"
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete a menuItem
 * Delete the menuItem with given menuItemID of the menu with given menuID. Authentication required.
 *
 * menuID Integer ID of the menu
 * menuItemID Integer ID of the menuItem
 * no response value expected for this operation
 **/
exports.deleteMenuItem = function(menuID,menuItemID) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Edit a menuItem
 * Edit the menuItem with given menuItemID of the menu with given menuID. Authentication required.
 *
 * menuID Integer ID of the menu
 * menuItemID Integer ID of the menuItem
 * body MenuItemWithoutColors Data of the menuItem
 * returns Menu
 **/
exports.editMenuItem = function(menuID,menuItemID,body) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "name" : "Emilio's menu of the day",
  "description" : "Our special menu of today",
  "tags" : [ {
    "name" : "Italian",
    "color" : "#FFBC8C"
  }, {
    "name" : "Mediterranean",
    "color" : "#FFBC8C"
  } ],
  "menuItems" : [ {
    "name" : "Spaghetti alla carbonara",
    "description" : "Fantastic italian dish made of spaghetti, pig cheek, eggs, black pepper, pecorino romano",
    "type" : "dish",
    "priceEuros" : 10,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Pasta",
      "color" : "#99C99B"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Carbonara"
  }, {
    "name" : "Polpette al sugo",
    "description" : "Meatballs with tomato sauce",
    "type" : "dish",
    "priceEuros" : 7,
    "tags" : [ {
      "name" : "Mediterranean",
      "color" : "#FFBC8C"
    }, {
      "name" : "Meat",
      "color" : "#FFBC8C"
    }, {
      "name" : "Italian",
      "color" : "#FFBC8C"
    } ],
    "imageLink" : "www.cloudStorage.com/Meatballs"
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Upload an image
 * This endpoint is used in order to upload EVERY image. For example, when a restaurant owner is registering his restaurant data, he will need to upload an image. Both this endpoint and the dedicated endpoint (POST /api/user/owner/restaurant) will be used. This endpoint to upload the image, the other one to upload all the other textual data (with a json). The images will be stored using Amazon s3. The ID of the image is returned.  For more information, this is used as a reference:  https://stackoverflow.com/questions/33279153/rest-api-file-ie-images-processing-best-practices   This endpoint requires authentication: we don't want anyone to update images but only authenticated users.
 *
 * returns ImageID
 **/
exports.uploadImage = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "imageID" : 5
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}

