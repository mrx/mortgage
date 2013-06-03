var clearContext = function(ctx) {
  // Store the current transformation matrix
  ctx.save();

  // Use the identity matrix while clearing the canvas
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // Restore the transform
  ctx.restore();
};

window.around = function(num) {
  var arr = [];
  var padding = 150000;
  var step = 10000;

  var lower = num - padding;
  var upper = num + padding;

  var i = lower;

  while (i <= upper) {
    arr.push(i);
    i += step;
  }

  return arr;
}

elem = document.getElementById("monthlyPaymentGraph");
ctx = elem.getContext("2d");

setTimeout(function() {
    var data = {};
    data["labelsFunction"] = function() {
      var elem = document.getElementById("monthlyPaymentGraph");
      var value = parseInt(elem.attributes["data-value"].value) || 0;
      console.log("current loan amount: " + value);
      var dataset = around(value);
      return dataset.map(function(loanAmount) {
          return roundTo(paymentCalc(scope._interestRate(), loanAmount, scope._loanTerm(), scope._totalPropertyTax()), 2);
        });
    };
    data["datasetFunction"] = function() {
      var elem = document.getElementById("monthlyPaymentGraph");
      var value = parseInt(elem.attributes["data-value"].value) || 0;
      var dataset = around(value);     
      return {
        fillColor : "rgba(220,220,220,0.5)",
        strokeColor : "rgba(220,220,220,1)",
        pointColor : "rgba(220,220,220,1)",
        pointStrokeColor : "#fff",
        data : dataset
      };
    };

    console.log(data);

    var chart = new Chart(ctx).Line(data, {scaleOverlay: true});

  }, 1000);
