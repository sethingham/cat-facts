$(document).ready(function () {
  //hidden on init
  $('#showFacts').hide();

  // jQuery Validation Plugin library
  // from https://github.com/jquery-validation/jquery-validation

  $("form[name='getFacts']").validate({
    // Specify validation rules
    rules: {
      numberOfFacts: {
        required: true,
        digits: true,
        min: 1,
      },
    },
    // Specify validation error messages
    messages: {
      numberOfFacts: 'Please enter a positive, whole number.',
    },
    errorElement: 'div',
    errorPlacement: function (error, element) {
      // Add the `invalid-feedback` class to the error element
      error.addClass('invalid-feedback');

      if (element.prop('type') === 'checkbox') {
        error.insertAfter(element.next('label'));
      } else {
        error.insertAfter(element);
      }
    },
    highlight: function (element, errorClass, validClass) {
      $(element).addClass('is-invalid').removeClass('is-valid');
    },
    unhighlight: function (element, errorClass, validClass) {
      $(element).addClass('is-valid').removeClass('is-invalid');
    },
    submitHandler: function (form) {
      getFacts();
    },
  });
});

function getFacts() {
  var theNumber = $('#numberOfFacts').val();

  var api = 'https://catfact.ninja/facts?limit=' + theNumber;

  var factsHTML = '';

  $.ajax({
    url: api,
    success: function (catData) {
      //loop through each fact
      $.each(catData.data, function (i, value) {
        factsHTML += '<p class="aFact">';
        factsHTML += '<strong>Cat Fact #' + (i + 1) + '</strong> - ';
        factsHTML += value['fact'];
        factsHTML += '</p>';
      });
      factsHTML += $('#showFacts').html(factsHTML + resetButton);
      //switch out divs
      $('#getFacts').hide();
      $('#showFacts').show();
    },
  });
}

//reset button clicked
$('body').on('click', '#reset', function () {
  $('#numberOfFacts').val('');
  $('#showFacts').hide();
  $('#getFacts').show();
  $('#numberOfFacts').removeClass('is-valid');
  $('#numberOfFacts').focus();
});

var resetButton =
  '<button class="btn btn-lg btn-primary btn-block" type="submit" id="reset">Reset</button>';
