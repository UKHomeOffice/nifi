/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var AppRun =  function($rootScope,$state,$http){

    if (nf.Storage.hasItem('jwt')) {
        var token = nf.Storage.getItem('jwt');
        $http.defaults.headers.common.Authorization = 'Bearer ' + token;
    }

    $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error){
        event.preventDefault();
        $state.go('error');
    });

};

var AppConfig = function ($urlRouterProvider,$mdThemingProvider) {

    $urlRouterProvider.otherwise(function($injector,$location){
        var urlComponents = $location.absUrl().split("?");
        return '/main?' + urlComponents[1];
    });

    //Define app palettes
    $mdThemingProvider.definePalette('basePalette', {
        '50': '595959',
        '100': '595959',
        '200': '004849', /* link-color */
        '300': '775351', /* value-color */
        '400': '595959',
        '500': '595959', /* base-color */
        '600': '595959',
        '700': '595959',
        '800': '595959',
        '900': 'rgba(249,250,251,0.97)', /* tint base-color 96% */
        'A100': '595959',
        'A200': '595959',
        'A400': '595959',
        'A700': '595959',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['A100'],
        'contrastLightColors': undefined
    });
    $mdThemingProvider.definePalette('tintPalette', {
        '50': '595959',
        '100': '595959',
        '200': 'CCDADB', /* tint link-color 20% */
        '300': '595959',
        '400': 'AABBC3', /* tint base-color 40% */
        '500': '595959',
        '600': 'C7D2D7', /* tint base-color 60% */
        '700': '595959',
        '800': 'E3E8EB', /* tint base-color 80% */
        '900': '595959',
        'A100': '595959',
        'A200': '595959',
        'A400': '595959',
        'A700': '595959',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['A100'],
        'contrastLightColors': undefined
    });
    $mdThemingProvider.definePalette('warnPalette', {
        '50': 'BA554A',
        '100': 'BA554A',
        '200': 'BA554A',
        '300': 'BA554A',
        '400': 'BA554A',
        '500': 'BA554A', /* warn-color */
        '600': 'BA554A',
        '700': 'BA554A',
        '800': 'BA554A',
        '900': 'BA554A',
        'A100': 'BA554A',
        'A200': 'BA554A',
        'A400': 'BA554A',
        'A700': 'BA554A',
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['A100'],
        'contrastLightColors': undefined
    });
    $mdThemingProvider.theme("default").primaryPalette("basePalette", {
        "default": "500",
        "hue-1": "200",
        "hue-2": "300",
        "hue-3": "900"
    }).accentPalette("tintPalette", {
        "default": "200",
        "hue-1": "400",
        "hue-2": "600",
        "hue-3": "800"
    }).warnPalette("warnPalette", {
        "default": "500"
    });

};

AppRun.$inject = ['$rootScope','$state','$http'];

AppConfig.$inject = ['$urlRouterProvider','$mdThemingProvider'];

angular.module('standardUI', ['ui.codemirror','ui.router','ngMaterial'])
    .run(AppRun)
    .config(AppConfig);
