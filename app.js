window.roundTo = function(num, places) {
  if (num) {
    return Math.round(num * (10 * places)) / (10 * places);
  }
};

window.paymentCalc = function(interestRate, loanAmount, loanTerm, totalPropertyTax) {
    return (interestRate * loanAmount / (1 - Math.pow(1 + interestRate, -1 * loanTerm))) + (totalPropertyTax / 12.0);
};

function MortgageCalc($scope) {

  window.scope = $scope;

  $scope._loanAmount = function() {
    return parseInt($scope.loanAmount);
  };

  $scope._interestRate = function() {
    return parseInt($scope.interestRate) / (100 * 12.0);
  };

  $scope._loanTerm = function() {
    return ((parseInt($scope.loanTerm) * 12) || "TBD");
  };

  $scope._homeValue = function() {
    return (parseInt($scope.homeValue));
  };

  $scope._propertyTax = function() {
    return (parseInt($scope.propertyTax) / 100.0);
  };

  $scope._totalPropertyTax = function() {
    return (($scope._homeValue() * $scope._propertyTax()) || 0);
  };

  $scope.monthlyPayment = function() {
    var result = paymentCalc($scope._interestRate(), $scope._loanAmount(), $scope._loanTerm(), $scope._totalPropertyTax());
    return (roundTo(result, 2) || "TBD");
  };

  $scope.totalPayment = function() {
    return (roundTo($scope.monthlyPayment() * $scope._loanTerm(), 2) || "TBD");
  };

  $scope.totalInterestPaid = function() {
    return (roundTo($scope.totalPayment() - $scope._homeValue(), 2) || "TBD");
  };

  $scope.lowerEnd = function() {
    return around($scope._loanAmount())[0];
  };

  $scope.higherEnd = function() {
    var arr = around($scope._loanAmount());
    return arr[arr.length - 1];
  }  
};
