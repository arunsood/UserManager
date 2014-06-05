var endpoint = "http://daretodiscover.net/user/";

//Compile users template

var usersSource = $("#user-list-template").html();
var usersTemplate = Handlebars.compile(usersSource);

//Compile add user template

var addSource = $("#new-user-template").html();
var addTemplate = Handlebars.compile(addSource);

//Compile edit user template

var editSource = $("#edit-user-template").html();
var editTemplate = Handlebars.compile(editSource);

//Get all users

$(document).ready(function() {
	getUsers();
});

function getUsers() {
	$.ajax({
		url:endpoint,
		type:"GET",
		success:function(data) {
			var html = usersTemplate({
				userList:data
			});

			$("#container").html(html);
		},
		error:function() {
			alert("Something went wrong...");
		}
	});
}

//Render add user template

$(document).on("click", "#add-user-button", function() {
	var html = addTemplate();

	$("#container").html(html);
});

//Get specific user information and compile template

$(document).on("click", ".edit-user-buttons", function() {
	var userId = $(this).attr("id");

	$.ajax({
		url:endpoint + userId,
		type:"GET",
		success:function(data) {
			var html = editTemplate({
				editUser:data
			});

			$("#container").html(html);
		},
		error:function() {
			alert("Something went wrong...");
		}
	});
});

//Send new user data to server

$(document).on("click", "#new-user-submit-button", function() {
	$.ajax({
		url:endpoint,
		type:"POST",
		data:{
			firstname:$("#new-first-name").val(),
			lastname:$("#new-last-name").val(),
			age:$("#new-age").val(),
			username:$("#new-username").val()
		},
		success:function() {
			getUsers();
		},
		error:function() {
			alert("Something went wrong...");
		}
	});
});

//Update a user

$(document).on("click", "#edit-user-submit-button", function() {
	$.ajax({
		url:endpoint + $("#edit-id").val(),
		type:"PUT",
		data:{
			firstname:$("#edit-first-name").val(),
			lastname:$("#edit-last-name").val(),
			age:$("#edit-age").val(),
			username:$("#edit-username").val()
		},
		success:function() {
			getUsers();
		},
		error:function() {
			alert("Something went wrong...");
		}
	});
});

//Delete a user

$(document).on("click", "#delete-user-submit-button", function() {
	$.ajax({
		url:endpoint + $("#edit-id").val(),
		type:"DELETE",
		success:function() {
			getUsers();
		},
		error:function() {
			alert("Something went wrong...");
		}
	});
});

//Go back

$(document).on("click", ".back-button", getUsers);