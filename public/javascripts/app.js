(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
require.register("application", function(exports, require, module) {
var Application, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Application = (function(_super) {
  __extends(Application, _super);

  function Application() {
    _ref = Application.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Application;

})(Chaplin.Application);
});

;require.register("controllers/add-controller", function(exports, require, module) {
var AddController, AddPageView, Controller, HeaderView, Transactions, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

HeaderView = require('views/home/header-view');

AddPageView = require('views/home/add-page-view');

Transactions = require('models/transactions');

module.exports = AddController = (function(_super) {
  __extends(AddController, _super);

  function AddController() {
    _ref = AddController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AddController.prototype.beforeAction = function() {
    AddController.__super__.beforeAction.apply(this, arguments);
    return this.compose('header', HeaderView, {
      region: 'header'
    });
  };

  AddController.prototype.index = function() {
    return this.view = new AddPageView({
      region: 'main',
      collection: new Transactions
    });
  };

  return AddController;

})(Controller);
});

;require.register("controllers/base/controller", function(exports, require, module) {
var Controller, SiteView, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

SiteView = require('views/site-view');

module.exports = Controller = (function(_super) {
  __extends(Controller, _super);

  function Controller() {
    _ref = Controller.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Controller.prototype.beforeAction = function() {
    return this.compose('site', SiteView);
  };

  return Controller;

})(Chaplin.Controller);
});

;require.register("controllers/graph-controller", function(exports, require, module) {
var Controller, GraphController, GraphPageView, HeaderView, Transactions, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Controller = require('controllers/base/controller');

HeaderView = require('views/home/header-view');

GraphPageView = require('views/home/graph-page-view');

Transactions = require('models/transactions');

module.exports = GraphController = (function(_super) {
  __extends(GraphController, _super);

  function GraphController() {
    _ref = GraphController.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  GraphController.prototype.beforeAction = function() {
    GraphController.__super__.beforeAction.apply(this, arguments);
    this.transactions = new Transactions;
    this.transactions.fetch();
    return this.compose('header', HeaderView, {
      region: 'header'
    });
  };

  GraphController.prototype.index = function() {
    return this.view = new GraphPageView({
      region: 'main',
      collection: this.transactions
    });
  };

  return GraphController;

})(Controller);
});

;require.register("initialize", function(exports, require, module) {
var Application, routes;

Application = require('application');

routes = require('routes');

$(function() {
  return new Application({
    title: 'Money Log',
    controllerSuffix: '-controller',
    routes: routes
  });
});
});

;require.register("lib/utils", function(exports, require, module) {
var utils;

utils = Chaplin.utils.beget(Chaplin.utils);

if (typeof Object.seal === "function") {
  Object.seal(utils);
}

module.exports = utils;
});

;require.register("lib/view-helper", function(exports, require, module) {
var register,
  __slice = [].slice;

register = function(name, fn) {
  return Handlebars.registerHelper(name, fn);
};

register('with', function(context, options) {
  if (!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(context);
  }
});

register('without', function(context, options) {
  var inverse;
  inverse = options.inverse;
  options.inverse = options.fn;
  options.fn = inverse;
  return Handlebars.helpers["with"].call(this, context, options);
});

register('url', function() {
  var options, params, routeName, _i;
  routeName = arguments[0], params = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
  return Chaplin.helpers.reverse(routeName, params);
});
});

;require.register("mediator", function(exports, require, module) {
var mediator;

mediator = module.exports = Chaplin.mediator;
});

;require.register("models/base/collection", function(exports, require, module) {
var Collection, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('./model');

module.exports = Collection = (function(_super) {
  __extends(Collection, _super);

  function Collection() {
    _ref = Collection.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Collection.prototype.model = Model;

  return Collection;

})(Chaplin.Collection);
});

;require.register("models/base/model", function(exports, require, module) {
var Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

module.exports = Model = (function(_super) {
  __extends(Model, _super);

  function Model() {
    _ref = Model.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Model;

})(Chaplin.Model);
});

;require.register("models/categories", function(exports, require, module) {
var Categories, Category, Collection, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('/models/base/collection');

Category = require('/models/category');

module.exports = Categories = (function(_super) {
  __extends(Categories, _super);

  function Categories() {
    _ref = Categories.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Categories.prototype.url = 'test-data/categories.json';

  Categories.prototype.model = Category;

  Categories.prototype.parse = function(response) {
    return response.data;
  };

  return Categories;

})(Collection);
});

;require.register("models/category", function(exports, require, module) {
var Category, Model, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('/models/base/model');

module.exports = Category = (function(_super) {
  __extends(Category, _super);

  function Category() {
    _ref = Category.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Category;

})(Model);
});

;require.register("models/transaction", function(exports, require, module) {
var Model, Transaction, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Model = require('/models/base/model');

module.exports = Transaction = (function(_super) {
  __extends(Transaction, _super);

  function Transaction() {
    _ref = Transaction.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  return Transaction;

})(Model);
});

;require.register("models/transactions", function(exports, require, module) {
var Collection, Transaction, Transactions, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Collection = require('/models/base/collection');

Transaction = require('/models/transaction');

module.exports = Transactions = (function(_super) {
  __extends(Transactions, _super);

  function Transactions() {
    _ref = Transactions.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Transactions.prototype.model = Transaction;

  Transactions.prototype.localStorage = new Backbone.LocalStorage('transactions-list');

  return Transactions;

})(Collection);
});

;require.register("routes", function(exports, require, module) {
module.exports = function(match) {
  match('', 'add#index');
  match('add', 'add#index');
  return match('graph', 'graph#index');
};
});

;require.register("views/base/collection-view", function(exports, require, module) {
var CollectionView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('./view');

module.exports = CollectionView = (function(_super) {
  __extends(CollectionView, _super);

  function CollectionView() {
    _ref = CollectionView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

  return CollectionView;

})(Chaplin.CollectionView);
});

;require.register("views/base/view", function(exports, require, module) {
var View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require('lib/view-helper');

module.exports = View = (function(_super) {
  __extends(View, _super);

  function View() {
    _ref = View.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  View.prototype.optionNames = Chaplin.View.prototype.optionNames.concat(['template']);

  View.prototype.getTemplateFunction = function() {
    return this.template;
  };

  return View;

})(Chaplin.View);
});

;require.register("views/home/add-page-view", function(exports, require, module) {
var AddView, Categories, CategoriesView, CollectionView, Transaction, View, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

CategoriesView = require('views/home/categories-view');

Categories = require('models/categories');

Transaction = require('models/transaction');

View = require('views/base/view');

module.exports = AddView = (function(_super) {
  __extends(AddView, _super);

  function AddView() {
    this.addNew = __bind(this.addNew, this);
    _ref = AddView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  AddView.prototype.autoRender = true;

  AddView.prototype.renderItems = false;

  AddView.prototype.className = 'add-container';

  AddView.prototype.template = require('./templates/add');

  AddView.prototype.itemView = View;

  AddView.prototype.render = function() {
    return AddView.__super__.render.apply(this, arguments);
  };

  AddView.prototype.attach = function() {
    AddView.__super__.attach.apply(this, arguments);
    return this.renderSubviews();
  };

  AddView.prototype.addNew = function() {
    var model,
      _this = this;
    if (this.amount.val().length > 0 && this.description.val().length > 0) {
      model = new Transaction({
        amount: this.amount.val(),
        description: this.description.val(),
        category: this.categoriesView.selected
      });
      this.collection.add(model);
      model.save();
      this.message.html('Transaction Logged');
      setTimeout((function() {
        return _this.message.html('');
      }), 1000);
      return this.resetForm();
    } else {
      return alert('Fill in your fields');
    }
  };

  AddView.prototype.resetForm = function() {
    this.amount.val('');
    return this.description.val('');
  };

  AddView.prototype.renderSubviews = function() {
    var amountSelector, categories, descriptionSelector, messageSelector,
      _this = this;
    messageSelector = '.message-container';
    amountSelector = 'input[name=amount]';
    descriptionSelector = 'input[name=description]';
    this.amount = $(amountSelector);
    this.message = $(messageSelector);
    this.description = $(descriptionSelector);
    this.delegate('click', 'input[type=submit]', this.addNew);
    categories = new Categories;
    this.categoriesView = new CategoriesView({
      collection: categories
    });
    return categories.fetch().then(function() {
      return _this.categoriesView.render();
    });
  };

  return AddView;

})(CollectionView);
});

;require.register("views/home/categories-view", function(exports, require, module) {
var CategoriesView, CategoryView, CollectionView, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

CategoryView = require('views/home/category-view');

module.exports = CategoriesView = (function(_super) {
  __extends(CategoriesView, _super);

  function CategoriesView() {
    this.onChange = __bind(this.onChange, this);
    _ref = CategoriesView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CategoriesView.prototype.autoRender = true;

  CategoriesView.prototype.className = 'categories';

  CategoriesView.prototype.itemView = CategoryView;

  CategoriesView.prototype.tagName = 'select';

  CategoriesView.prototype.container = '.category-container';

  CategoriesView.prototype.attach = function() {
    this.selected = $(this.el).val();
    this.delegate('change', this.onChange);
    return CategoriesView.__super__.attach.apply(this, arguments);
  };

  CategoriesView.prototype.onChange = function() {
    return this.selected = $(this.el).val();
  };

  return CategoriesView;

})(CollectionView);
});

;require.register("views/home/category-view", function(exports, require, module) {
var CategoryView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = CategoryView = (function(_super) {
  __extends(CategoryView, _super);

  function CategoryView() {
    _ref = CategoryView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  CategoryView.prototype.autoRender = true;

  CategoryView.prototype.className = 'category';

  CategoryView.prototype.template = require('./templates/category');

  CategoryView.prototype.tagName = 'option';

  CategoryView.prototype.getTemplateData = function() {
    return this.model.attributes;
  };

  return CategoryView;

})(View);
});

;require.register("views/home/graph-page-view", function(exports, require, module) {
var CollectionView, GraphPageView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CollectionView = require('views/base/collection-view');

View = require('views/base/view');

module.exports = GraphPageView = (function(_super) {
  __extends(GraphPageView, _super);

  function GraphPageView() {
    _ref = GraphPageView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  GraphPageView.prototype.autoRender = true;

  GraphPageView.prototype.renderItems = false;

  GraphPageView.prototype.className = 'transactions-container';

  GraphPageView.prototype.template = require('views/home/templates/graph');

  GraphPageView.prototype.itemView = View;

  GraphPageView.prototype.render = function() {
    return GraphPageView.__super__.render.apply(this, arguments);
  };

  GraphPageView.prototype.attach = function() {
    GraphPageView.__super__.attach.apply(this, arguments);
    return this.renderSubviews();
  };

  GraphPageView.prototype.renderSubviews = function() {
    var classSelector, data;
    classSelector = "." + (this.$el.attr('class'));
    data = [this.getTotalsByCategory()];
    return this.renderD3(classSelector, data);
  };

  GraphPageView.prototype.getTotalsByCategory = function() {
    var category, categoryExists, total, totals, transaction, transactions, _i, _j, _len, _len1;
    transactions = this.collection.models;
    totals = [];
    for (_i = 0, _len = transactions.length; _i < _len; _i++) {
      transaction = transactions[_i];
      category = transaction.get('category');
      categoryExists = false;
      for (_j = 0, _len1 = totals.length; _j < _len1; _j++) {
        total = totals[_j];
        if (total.category === category) {
          categoryExists = true;
          total.amount += parseFloat(transaction.get('amount'));
          break;
        }
      }
      if (!categoryExists) {
        total = {
          amount: parseFloat(transaction.get('amount')),
          category: category
        };
        totals.push(total);
      }
    }
    return totals;
  };

  GraphPageView.prototype.renderD3 = function(selector, data) {
    var axis, barGroup, barHeight, cheight, cmargin, cpadding, cspacing, cwidth, leagueBG, leagueGroup, leagueLabel, maxAmount, numericAxisGroup, svg, teamNameWidth, x, y;
    cspacing = 40;
    cmargin = 10;
    cpadding = 5;
    cwidth = 450;
    cheight = 200;
    maxAmount = 450;
    barHeight = 20;
    teamNameWidth = 100;
    svg = d3.select(selector).append("svg").attr("class", "chart").attr("width", cwidth + teamNameWidth).attr("height", 1000);
    leagueGroup = svg.selectAll("g").data(data).enter().append("g").attr("transform", function(d, i) {
      return "translate(0," + ((cheight + cmargin) * i + cspacing * i) + ")";
    });
    leagueBG = leagueGroup.append("rect").attr("x", cmargin).attr("y", cmargin).attr("width", cwidth + teamNameWidth).attr("height", cheight - 2 * cmargin);
    leagueLabel = leagueGroup.append("text").attr("y", cheight + 10).attr("x", cmargin).text(function(d) {
      return d.key;
    });
    y = d3.scale.ordinal().domain(data).rangeBands([0, cheight]);
    x = d3.scale.linear().domain([0, maxAmount]).range([0, cwidth]);
    axis = d3.svg.axis().scale(x);
    numericAxisGroup = leagueGroup.append("g").attr("class", "axis").attr("transform", "translate(" + teamNameWidth + "," + cheight + ")").call(axis);
    barGroup = leagueGroup.selectAll("team").data(function(d) {
      return d;
    }).enter().append("g").attr("transform", function(d, i) {
      return "translate(" + teamNameWidth + "," + (cmargin + cpadding + i * (barHeight + 1)) + ")";
    });
    barGroup.append("text").attr("class", "title").text(function(d) {
      return d.category;
    }).style("text-anchor", "end").attr("transform", "translate(-6," + barHeight * 2 / 3 + ")");
    return barGroup.append("rect").attr("class", "bar").attr("height", barHeight).attr("width", 0).transition().duration(1000).delay(function(d, i) {
      return i * 100;
    }).attr("width", function(d) {
      var amount;
      amount = d.amount > 0 ? d.amount : 0;
      return x(amount);
    });
  };

  return GraphPageView;

})(CollectionView);
});

;require.register("views/home/header-view", function(exports, require, module) {
var HeaderView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = HeaderView = (function(_super) {
  __extends(HeaderView, _super);

  function HeaderView() {
    _ref = HeaderView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  HeaderView.prototype.autoRender = true;

  HeaderView.prototype.className = 'header';

  HeaderView.prototype.tagName = 'header';

  HeaderView.prototype.template = require('./templates/header');

  return HeaderView;

})(View);
});

;require.register("views/home/templates/add", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div>Log a Transaction :</div>\n\n<form onSubmit=\"return false;\">\n\n<table>\n	<tr>\n		<td><label for=\"amount\">Amount</label></td>\n		<td><input name=\"amount\" type=\"text\"></input></td>\n	</tr>\n	<tr>\n		<td><label for=\"description\">Description</label></td>\n		<td><input name=\"description\" type=\"text\"></input></td>\n	</tr>	\n	<tr>\n		<td><label for=\"category\">Category</label></td>\n		<td><span class=\"category-container\"></span></td>\n	</tr>\n</table>\n	<input type=\"submit\" value=\"Add\"/>\n	<span class=\"message-container\"></span>\n</form>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/category", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var stack1, functionType="function", escapeExpression=this.escapeExpression;


  if (stack1 = helpers.title) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  return escapeExpression(stack1);
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/graph", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<h3>Totals by Category</h3>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/home/templates/header", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return " <ul>\n  <li><a class=\"header-link\" href=\"add\">Add</a></li>\n  <li><a class=\"header-link\" href=\"graph\">Chart</a></li>\n</ul>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;require.register("views/site-view", function(exports, require, module) {
var SiteView, View, _ref,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

View = require('views/base/view');

module.exports = SiteView = (function(_super) {
  __extends(SiteView, _super);

  function SiteView() {
    _ref = SiteView.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  SiteView.prototype.container = 'body';

  SiteView.prototype.id = 'site-container';

  SiteView.prototype.regions = {
    header: '#header-container',
    main: '#page-container'
  };

  SiteView.prototype.template = require('./templates/site');

  return SiteView;

})(View);
});

;require.register("views/templates/site", function(exports, require, module) {
var __templateData = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"header-container\" id=\"header-container\"></div>\n\n<div class=\"outer-page-container\">\n  <div class=\"page-container\" id=\"page-container\">\n  </div>\n</div>\n";
  });
if (typeof define === 'function' && define.amd) {
  define([], function() {
    return __templateData;
  });
} else if (typeof module === 'object' && module && module.exports) {
  module.exports = __templateData;
} else {
  __templateData;
}
});

;
//@ sourceMappingURL=app.js.map