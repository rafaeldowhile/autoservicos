define(['locatools-module'], function() {
	'use strict';
	// Declare app level module which depends on filters, and services
	return angular.module('locatools',['ui.router', 'restangular', 'LocalStorageModule', 'locatools.controllers', 'locatools.services']);
});