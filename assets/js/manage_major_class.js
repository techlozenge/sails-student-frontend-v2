(function(){

  //function to delete record by setting id on form and then submitting the form
  //sets value of major_class id in hidden delete form and submits form
  //not completely ideal but wanted to take advantage of flash messages in sails
  function deleteRecord(record_id){
    $("#deleteform input[name=major_class_id]").val(record_id);
    $("#deleteform").submit();
  }

  function getMajor_Class(record_id){
    return $.get("http://localhost:1337/major_class/" + record_id, function(data){
      //console.log("got major_class");
    })
  }

  $(function(){

    $('#major_ClassTable').DataTable({
      colReorder: true,
      "scrollX": true,
      dom: 'Bfrtip',
      buttons: [
          'copy', 'csv', 'excel', 'pdf', 'print'
      ]
    });

    //initialize variables for items in the DOM we will work with
    let manageMajor_ClassForm = $("#manageMajor_ClassForm");
    let addMajor_ClassButton = $("#addMajor_ClassButton");

    // add major_class functionality
    addMajor_ClassButton.click(function(){
      manageMajor_ClassForm.attr("action", "/create_major_class");
      manageMajor_ClassForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Submit": function() {
            manageMajor_ClassForm.submit()
          }
        }
      });
    })

    // update major_class functionality
  	$("#major_ClassTable").on("click", "#editButton", function(e){
      let recordId = $(this).data("majorclassid");

      console.log("major_ClassTable edit button clicked for ID " + recordId);

      manageMajor_ClassForm.find("input[name=major_class_id]").val(recordId);
      manageMajor_ClassForm.attr("action", "/update_major_class");
      let major_class = getMajor_Class(recordId);

      //populate form when api call is done (after we get major_class to edit)
      major_class.done(function(data){
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

      manageMajor_ClassForm.dialog({
        title: "Add Record",
        width: 700,
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          Submit: function() {
            //function to delete record
            manageMajor_ClassForm.submit()
          }
        }
      });
    })

    // delete major_class functionality
    $("#major_ClassTable").on("click", "#deleteButton", function(e){
      let recordId = $(this).data("majorclassid")
      console.log("major_ClassTable delete button clicked for ID " + recordId);
      $("#deleteConfirm").dialog({
        title: "Confirm Delete",
        modal: true,
        buttons: {
          Cancel: function() {
            $( this ).dialog( "close" );
          },
          "Delete Major_Class": function() {
            //function to delete record
            deleteRecord(recordId);
          }
        }
      });
    })


  })
})();
