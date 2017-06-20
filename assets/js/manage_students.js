(function(){

  //function to delete record by settin id on form and then submitting the form
  //sets value of student id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=student_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getStudent(record_id){
    return $.get("http://localhost:1337/student/" + record_id, function(data){
      console.log("got student");
    })
  }

  $(function(){

    $('#studentTable').DataTable({
      colReorder: true,
      "scrollX": true,
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      columnDefs: [
        { width: '20%', target: 7 }
      ]
    });

    var validator = $("#manageStudentForm").validate({
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
       start_date: {
         required: true,
         minlength: 1
       },
       gpa: {
         required: true,
         minlength: 1
       },
       sat: {
         required: true,
         minlength: 3
       },
       major_id: {
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
         minlength: jQuery.validator.format("What is the first name?")
       },
       start_date: {
         required: "Enter start date in format YYYY-MM-DD",
         minlength: jQuery.validator.format("Data format is YYYY-MM-DD")
       },
       gpa: {
         required: "GPA is required",
         minlength: jQuery.validator.format("Enter the GPA needed for this major")
       },
       sat: {
         required: "SAT score required",
         minlength: jQuery.validator.format("Enter the SAT score of 3-4 digits")
       },
       major_id: {
         required: "Major ID required",
         minlength: jQuery.validator.format("Enter a valid Major ID")
       }
     },
   });


    //initialize variables for items in the DOM we will work with
    let manageStudentForm = $("#manageStudentForm");
    let addStudentButton = $("#addStudentButton");

    //add student button functionality
    addStudentButton.click(function(){
      manageStudentForm.attr("action", "/create_student");
      manageStudentForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            //function to delete record
            manageStudentForm.submit()
          }
        }
      });
    })

  	$("#studentTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("studentid")
      manageStudentForm.find("input[name=student_id]").val(recordId);
      manageStudentForm.attr("action", "/update_student");
      let student = getStudent(recordId);

      //populate form when api call is done (after we get student to edit)
      student.done(function(data){
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

      manageStudentForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageStudentForm.submit()
          }
        }
      });
    })


    $("#studentTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("studentid")
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Student": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })

  })

})();
