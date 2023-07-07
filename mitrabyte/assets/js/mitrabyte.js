 $(document).ready(function() {

/*functions for both failure andsuccess of form messages */
function failure(f_msg){
		
		$("div[name='error_div']").css("display","none");
		$("div[name='success_div']").css("display","none");
		$("div[name='error_div']").slideDown(500);
		$("span[name='msg_target']").html(f_msg);
		$(".loading_ajax").hide();
		
	}
//writting a function that displays my success messages   
	function success(s_msg){
		//alert(t);return;
		$("div[name='error_div']").css("display","none");
		$("div[name='success_div']").css("display","none");
		$("div[name='success_div']").slideDown(500);
		$("span[name='msg_target']").html(s_msg);
		$(".loading_ajax").hide();
		
	}





// Bind to the submit event of our form
$("#nastar_contact_form").submit(function(event){

	//
	//Variable to hold request
	var request;
	var error_code = 'E00';
    // Prevent default posting of form - put here to work in case of errors
    event.preventDefault();
		$(".loading_ajax").slideDown(500);//exit();
    // Abort any pending request
    if (request) {
        request.abort();
    }
    // setup some local variables
    var $form = $(this);

    // Let's select and cache all the fields
    var $inputs = $form.find("input, select, button, textarea");

    // Serialize the data in the form
    var serializedData = $form.serialize();

    // Let's disable the inputs for the duration of the Ajax request.
    // Note: we disable elements AFTER the form data has been serialized.
    // Disabled form elements will not be serialized.
    //$inputs.prop("disabled", true);

    // Fire off the request to /form.php
    request = $.ajax({
        url: "php_ajax_nastar_contact_form.php",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        // Log a message to the console
       
        	if(response.indexOf(error_code) > -1){
															
															
														
			

				
				
				if(response =='E003'){
					response ='An error occured while processing your message; Please try again later.';
				}
				
				if(response =='E002'){
					response ='  Gosh ! we are unable to save your message, Please message as mail to info@mistrabyte.com.ng !';
				}
				
				
				if(response=='E001'){
					response =' Oh! It seem you have ommited a required field on the form';
				}
									
				//alert(response);										//$("button[data-dismiss='modal']").click();
				failure(response);//return;
				//$('.btn').button('reset');	
			}else{
							//$('.all_departmental_topics').html(data);
							success(response);
							
							$(".loading_ajax").fadeOut();
							
							$("input[name='full_name']").val('');
							$("input[name='email']").val('');
							$("input[name='phone']").val('');
							$("textarea[name='msg']").val('');
			}




    });

    // Callback handler that will be called on failure
    request.fail(function (jqXHR, textStatus, errorThrown){
        // Log the error to the console
       
        alert("We are Sorry the following error occurred: "+ 
        	textStatus, errorThrown);
        failure("We are Sorry the following error occurred: "+ 
        	textStatus, errorThrown);

    });

    // Callback handler that will be called regardless
    // if the request failed or succeeded
    request.always(function () {
        // Reenable the inputs
        $inputs.prop("disabled", false);


    });

});






})