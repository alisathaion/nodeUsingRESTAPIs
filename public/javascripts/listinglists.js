$(function ready() {

    $.getJSON("/api/listings", function (data) {
        data.forEach(function (item) {
            $('#listingList').append('<tr><td>' + item.propertyName + '</td><td>' 
                                                + item.propertyType + '</td><td>'
                                                + item.address + '</td><td>'
                                                + item.city + '</td><td>'
                                                + item.price + '</td><td>'
                                                + item.rentalAllowed + '</td><td>'
                                                + item.description +'</td></tr>')
        });
    });

    
    $('#search').bind("enterKey",function(e){
        //do stuff here
    });

    $('#search').keyup(function(e){
         if(e.keyCode == 13)
         {
            
            //get value from search textbox
            var search = JSON.stringify({
                searchByNameAndPhone: $('#search').val()
            });
        
            //if post correct
            $.ajax({
                url: '/listinglist',
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: search,
                success: function (json, status, request) {
                    $('#statusMsg').removeClass();
                    $('#statusMsg').addClass('alert alert-success');
                    $('#statusMsg').html('Added the order');
                },
                error: function (request, status) {
                    $('#statusMsg').removeClass();
                    $('#statusMsg').addClass('alert alert-danger');
                    $('#statusMsg').html('Error adding the order');
                    console.log('Request failed : ', status);
                }
            });

            //get data by searching name
            $.getJSON("/api/listings", function (data) {
                $('#listingList tr').remove();
                $('#listingList').append('<tr><th>Property Name</th><th>Property Type</th><th>Address</th><th>City</th><th>Price</th><th>Rental Allowed</th><th>Description</th></tr>');
                data.forEach(function (item) {
                    $('#listingList').append('<tr><td>' + item.propertyName +'</td><td>'
                                                      + item.propertyType +'</td><td>'
                                                      + item.address +'</td><td>'
                                                      + item.city +'</td><td>'
                                                      + item.price +'</td><td>'
                                                      + item.rentalAllowed +'</td><td>'
                                                      + item.description +'</td></tr>');
                });
                
            });
            
         }
    });


});
