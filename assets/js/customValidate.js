$(document).ready(function(){
	$('#form-signin').validate({
		rules: {
			name: {
				required:true
			},
			email: {
				required:true,
				email:true
			},
			password: {
				minlength:6,
				required:true
			},
			password_again: {
				minlength:6,
				// equalTo: "#password" NO QUIERE FUNCIONAR
			}
		},
		success: function(element){
			element
			.text('OK!').addClass('valid')
		}
	});
});