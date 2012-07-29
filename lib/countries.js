/*
 * countries
 * https://github.com/jameslafferty/countries
 *
 * Copyright (c) 2012 jameslafferty
 * Licensed under the GPL license.
 */

var countries = (function () {
	'use strict';
	var _attrsToHtml, _checkboxes, _checkboxSets, _continents, _countries,
		_countryAbbreviations, _countryNames, _getAbbr, _getName, _getOptions,
		_options, _optionSets, _primeCache, _processCountry;
	
	_continents = require('./continents');

	_attrsToHtml = function (attributes) {
		var _attributes, i;
		_attributes = '';
		for (i in attributes) {
			if (attributes.hasOwnProperty(i)) {
				_attributes += ' ' + i + '="' + attributes[i] + '"';
			}
		}
		return _attributes;
	};
	
	_primeCache = function () {
		var _processCountry;
		_options = '';
		_optionSets = {};
		_countryAbbreviations = {};
		_countryNames = {};
		_processCountry = function (country) {
			var _countryOption;
			_countryOption = '<option value="' + country.abbr + '">' + country.name + '</option>';
			_options += _countryOption;
			_optionSets[i] += _countryOption;
			_countryAbbreviations[country.name] = country.abbr;
			_countryNames[country.abbr] = country.name;
		};
		for (var i in _continents) {
			if (_continents.hasOwnProperty(i)) {
				_options += '<option>' + i + '</option>';
				_options += '<optgroup label="' + i + '">';
				_optionSets[i] = '';
				_continents[i].forEach(_processCountry);
				_options += '</optgroup>';
			}
		}
	};

	_getOptions = function (continent) {
		var _result;
		if (! _options || ! _optionSets) {
			_primeCache();
		}
		_result = 'string' === typeof continent ? _optionSets[continent] : _options;
		return _result;
	};
	
	_getAbbr = function (name) {
		var _result;
		if (! _countryAbbreviations) {
			_primeCache();
		}
		_result = _countryAbbreviations[name];
		return _result;
	};
	
	_getName = function (abbr) {
		var _result;
		if (! _countryNames) {
			_primeCache();
		}
		_result = _countryNames[abbr];
		return _result;
	};

	_countries = {};
	
	
	// Public API
	_countries.select = function (attributes, continent) {
		var _attributes, _options, _result;
		_attributes = _attrsToHtml(attributes) || '';
		_options = _getOptions(continent);
		_result = '<select' + _attributes + '>' + _options + '</select>';
		return _result;
	};
	
	_countries.checkboxes = function () {
		
	};
	
	_countries.getAbbr = function (name) {
		var _result;
		_result = _getAbbr(name);
		return _result;
	};
	
	_countries.getName = function (abbr) {
		var _result;
		_result = _getName(abbr);
		return _result;
	};
	
	_countries.getContinent = function (name) {
		var _result;
		_result = _continents[name];
		return _result;
	};
	return _countries;
}());

exports.checkboxes = countries.checkboxes;
exports.getAbbr = countries.getAbbr;
exports.getContinent = countries.getContinent;
exports.getName = countries.getName;
exports.select = countries.select;
