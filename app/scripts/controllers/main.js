'use strict';

/**
 * @ngdoc function
 * @name calculadoraSalarialApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the calculadoraSalarialApp
 */
angular.module('calculadoraSalarialApp')
  .controller('MainCtrl', function ($scope) {
    
    var defaults = {
      afp : 6.25,
      isss : {
        percentage: 3.00,
        maxIncome : 685.71,
        maxAmount : 20.57
      },
      utilityTax : {
        range1 : {
          min: 0.00,
          max: 487.60,
          percentage: 0,
          fixedAmount: 0
        },
        range2 : {
          min: 487.61,
          max: 642.85,
          percentage: 10,
          fixedAmount: 17.48
        },
        range3 : {
          min: 642.86,
          max: 915.81,
          percentage: 10,
          fixedAmount: 32.70
        },
        range4 : {
          min: 915.82,
          max: 2058.67,
          percentage: 20,
          fixedAmount: 60.00
        },
        range5 : {
          min: 2058.68,
          percentage: 30,
          fixedAmount: 288.57
        }
      }
    };
    
    $scope.afpAmount = 0;
    $scope.isssTaxAmount = 0;
    $scope.utilityTaxAmount = 0;
    $scope.result = 0;

    var calculateUtilityTax = function(income) {

      var tax;

      if ( income > defaults.utilityTax.range1.min && income <= defaults.utilityTax.range1.max ) {
        tax = 0;
      }
      if ( income > defaults.utilityTax.range2.min && income <= defaults.utilityTax.range2.max ) {
        tax = ( income - defaults.utilityTax.range1.max ) * defaults.utilityTax.range2.percentage / 100 + defaults.utilityTax.range2.fixedAmount;
      }
      if ( income > defaults.utilityTax.range3.min && income <= defaults.utilityTax.range3.max ) {
        tax = ( income - defaults.utilityTax.range2.max ) * defaults.utilityTax.range3.percentage / 100 + defaults.utilityTax.range3.fixedAmount;
      }
      if ( income > defaults.utilityTax.range4.min && income <= defaults.utilityTax.range4.max ) {
        tax = ( income - defaults.utilityTax.range3.max ) * defaults.utilityTax.range4.percentage / 100 + defaults.utilityTax.range4.fixedAmount;
      }
      if ( income > defaults.utilityTax.range5.min ) {
        tax = ( income - defaults.utilityTax.range4.max ) * defaults.utilityTax.range5.percentage / 100 + defaults.utilityTax.range5.fixedAmount;
      }
      return tax;
    };

    var calculateIsssTax = function(income) {

      var tax;

      if ( income > defaults.isss.maxIncome ) {
        tax = defaults.isss.maxAmount;
      } else {
        tax = income * defaults.isss.percentage / 100;
      }
      return tax;
    };

    $scope.calculate = function() {
      $scope.afpAmount = $scope.salary * defaults.afp / 100;
      $scope.utilityTaxAmount = calculateUtilityTax( $scope.salary - $scope.afpAmount );
      $scope.isssTaxAmount = calculateIsssTax( $scope.salary );
      $scope.result = $scope.salary - $scope.afpAmount - $scope.utilityTaxAmount - $scope.isssTaxAmount;
    };
  });
