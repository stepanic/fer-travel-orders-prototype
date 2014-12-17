'use strict';

angular.module('frontend')
  .controller('TravelOrderFormCtrl', [
    '$scope',
    '$filter',
    'Api',
    'TravelOrderModel',
    'Moment',
    'bootbox',
    function ($scope, $filter, Api, TravelOrderModel, Moment, bootbox) {

      $scope.model = {
        budgetsource: null,
        country: null,
        datetimeStart: null,
        datetimeFinish: null,
        items: []
      };

      function SaveTravelOrder() {
        var start = $filter('date')($scope.model.datetimeStart, 'yyyy-MM-ddTHH:mm:ss.sss') + 'Z';
        var finish = $filter('date')($scope.model.datetimeFinish, 'yyyy-MM-ddTHH:mm:ss.sss') + 'Z';

        var items = [];
        angular.forEach($scope.model.items, function(value, key) {
          items.push({
            name: value.name,
            quantity: value.quantity,
            price: value.price,
            currency: value.currency.name
          });
        });


        var params = {
          budgetsourcecode: $scope.model.budgetsource.code,
          countrycode: $scope.model.country.code,
          datetimeStart: start,
          datetimeFinish: finish,
          items: items
        }

        TravelOrderModel
        .create(angular.copy(params))
          .then(function (result) {
            console.log("result", result);

            var msg = "ID putnog naloga: " + result.data.id;

            bootbox.dialog({
              title: "Putni nalog je uspješno spremljen!",
              message: msg,
              buttons: {
                danger: {
                  label: "Zatvoriti",
                  className: "btn-danger",
                  callback: function() {

                  }
                }
              }
            });

          })
          .catch(function (error) {
            console.log("error", error);

            var msg = '';
            if (error.data.error) {
              msg += error.data.error + '<br><br>';
            }
            if (error.data.summary) {
              msg += error.data.summary + '<br><br>';
            }
            msg += 'Ova polja su neispravna: <br>';
            angular.forEach(error.data.invalidAttributes, function (value, key) {
              msg += key + '<br>';
            });
            bootbox.dialog({
              title: "Pogreška: NISTE sve podatke ispravno upisali!",
              message: msg,
              buttons: {
                danger: {
                  label: "Zatvoriti",
                  className: "btn-danger",
                  callback: function() {

                  }
                }
              }
            });
          });
      }
      $scope.SaveTravelOrder = SaveTravelOrder;

      function GetCurrencyIndex(currency) {
        var k = 0;
        angular.forEach($scope.model.currencies, function (value, key) {
          if (value.name === currency) {
            k = key;
          }
        });
        return k;
      }

      function AddNewItem() {
        var newItem = {
          name: null,
          quantity: 1,
          price: null,
          currency: $scope.model.currencies[GetCurrencyIndex($scope.model.country.dailyAllowanceCurrency)]
        };
        $scope.model.items.push(newItem);
      }
      $scope.AddNewItem = AddNewItem;

      function RemoveItem(index) {
        $scope.model.items.splice(index, 1);
      }
      $scope.RemoveItem = RemoveItem;

      function CleanForm() {
        $scope.model.datetimeStart = null;
        $scope.model.datetimeFinish = null;
        $scope.model.items = [];
      }
      $scope.CleanForm = CleanForm;



      Api.collection('budgetsource')
        .then(function(response) {
          $scope.model.budgetsources = response.data;
          $scope.model.budgetsource  = $scope.model.budgetsources[0];
        });
      Api.collection('country')
        .then(function(response) {
          $scope.model.countries = response.data;
          $scope.model.country   = $scope.model.countries[0];
        });
      Api.collection('currency')
        .then(function(response) {
          $scope.model.currencies = response.data;

          Api.collection('travelorderitem')
            .then(function(response) {
              $scope.model.travelorderitems = response.data;
              AddNewItem();
            });

        });
    }
  ]);
