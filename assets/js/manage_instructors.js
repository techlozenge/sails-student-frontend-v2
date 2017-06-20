(function(){

  //function to delete record by setting id on form and then submitting the form
  //sets value of instructor id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=instructor_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getInstructor(record_id){
    return $.get("http://localhost:1337/instructor/" + record_id, function(data){
      //console.log("got instructor");
    })
  }

  $(function(){

    $('#instructorTable').DataTable({
      colReorder: true,
      "scrollX": true,
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    });

    var validator = $("#manageInstructorForm").validate({
     errorClass: "text-danger",
     rules: {
       first_name: {
         required: true,
         minlength: 2
       },
       last_name: {
         required: true,
         minlength: 2
       },
       major_id: {
         required: true,
         minlength: 1
       },
       years_of_experience: {
         required: true,
         minlength: 1
       },
       tenured: {
         required: true,
         minlength: 1
       }
     },
     messages: {
       first_name: {
         required: "First name is required",
         minlength: jQuery.validator.format("What is the first name?")
       },
       last_name: {
         required: "Last name is required",
         minlength: jQuery.validator.format("What is the last name?")
       },
       major_id: {
         required: "A major id is required",
         minlength: jQuery.validator.format("What is the Major ID?")
       },
       years_of_experience: {
         required: "How many years of experience does this instructor have?",
         minlength: jQuery.validator.format("What Years of Experience?")
       },
       tenured: {
         required: "Enter the tenure: 1 for Yes and 0 for No",
         minlength: jQuery.validator.format("What is the instructor tenure status - 1 for Yes and 0 for No?")
       }
     },
   });


    //initialize variables for items in the DOM we will work with
    let manageInstructorForm = $("#manageInstructorForm");
    let addInstructorButton = $("#addInstructorButton");

    //add instructor button functionality
    addInstructorButton.click(function(){
      $("input").val('');
      validator.resetForm();

      manageInstructorForm.attr("action", "/create_instructor");
      manageInstructorForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            manageInstructorForm.submit()
          }
        }
      });
    })

  	$("#instructorTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("instructorid");

      console.log("instructorTable edit button clicked for ID " + recordId);

      manageInstructorForm.find("input[name=instructor_id]").val(recordId);
      manageInstructorForm.attr("action", "/update_instructor");
      let instructor = getInstructor(recordId);

      console.log("ID " + instructor);

      //populate form when api call is done (after we get instructor to edit)
      instructor.done(function(data){
        $.each(data, function(name, val){
            var $el = $('[name="'+name+'"]'),
                type = $el.attr('type');

            switch(type){
                case 'checkbox':
                    $el.attr('checked', 'checked');
                    break;
                case 'radio':
                    $el.filter('[value="'+val+'"]').attr('checked', 'checked');
                    break;
                default:
                    $el.val(val);
            }
        });
      })

      manageInstructorForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageInstructorForm.submit()
          }
        }
      });
    })


    $("#instructorTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("instructorid")
      console.log("instructorTable delete button clicked for ID " + recordId);
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Instructor": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })


  })
})();
