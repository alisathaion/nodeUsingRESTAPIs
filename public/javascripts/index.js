//post data from index 
$(function ready() {
    $("#submitForm").submit(function (event) {
        event.preventDefault();

        //check if checkbox uncheck"
        var rental = ""
        if($('#allowed:checked').val() == undefined){
            rental = "";
        }
        else{
            rental = $('#allowed:checked').val();
        }
        var listingList = JSON.stringify({
            propertyName: $('#propertyName').val(),
            propertyType: $('#propertyType').val(),
            address: $('#address').val(),
            city: $('#city').val(),
            price: $('#price').val(),
            rentalAllowed: rental,
            description: $('#description').val()
        });
        
        $.ajax({
            url: '/api/listings',
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            data: listingList,
            success: function (json, status, request) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-success');
                $('#statusMsg').html('Added the property list');
            },
            error: function (request, status) {
                $('#statusMsg').removeClass();
                $('#statusMsg').addClass('alert alert-danger');
                $('#statusMsg').html('Error adding the property list');
                console.log('Request failed : ', status);
            }
        });


    });

    $("#reset").click(function(){
        $('#statusMsg').removeClass();
        $('#statusMsg').html('');
    });

});