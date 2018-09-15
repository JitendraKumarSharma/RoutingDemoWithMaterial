var myExtObject = (function () {
    return {
        resetImage: function (url, image) {
            //$("#profile-img-tag").attr("src", url + "/assets/images/employeeimages/" + image);
            $("#profile-img-tag").attr("src", url + "/" + image);
        }
        //   ,func2: function() {
        //     alert('function 2 called');
        //   }
    }
})(myExtObject || {})

$(document).ready(function () {
});

selectFile = function () {
    $("#photo").click();
};

readURL = function (input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.profile-img-tag').attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
};

// remove_class = function () {
//     var pass = $("#password").val();
//     var conPass = $("#confirm_password").val();
//     var email = $("#user_email").val();
//     var isInvalidClass = $("#user_email").parent().parent().parent().parent().hasClass("mat-form-field-invalid");
//     if (pass == conPass) {
//         $("#confirm_password").parent().parent().parent().parent().removeClass("mat-form-field-invalid");
//         if (!isInvalidClass && email != "") {
//             $("#btnRegister").removeAttr("disabled");
//         }
//         else {
//             $("#btnRegister").attr("disabled", "disabled");
//         }
//     }
//     else {
//         $("#confirm_password").parent().parent().parent().parent().addClass("mat-form-field-invalid");
//         $("#btnRegister").attr("disabled", "disabled");
//     }
// };