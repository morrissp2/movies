
$(function() {

    $('.collapse').on('shown.bs.collapse', function(){
    $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
    }).on('hidden.bs.collapse', function(){
    $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");
    });

	$('#progress_bar').dialog({show: "slide", modal: true, autoOpen: false, dialogClass: "dlg-no-close dlg-no-title", overlay: {
			opacity: 0.5,
			background: "black"
		}});

    $('.ui-dialog-titlebar-close').hide();
    $('.ui-dialog-titlebar').hide();

	$('.closeall').click(function(){
		$('.panel-collapse.in')
			.collapse('hide');
		});
	$('.openall').click(function(){
		$('.panel-collapse:not(".in")')
			.collapse('show');
		});

    //$("#progress_bar").dialog("open");

	$("#sortByStatus").click(function(){
	    sort_results($("sortByStatus"))
    });

	$('#sortByCategory').click(function(){
	    sort_results($("#sortByCategory"))
    });

	$('#filterByAll').click(function(){
	    filter_results('filterByAll')
    });
	$('#filterByCluster').click(function(){
	    filter_results('filterByCluster')
    });
	$('#filterByNode').click(function(){
	    filter_results('filterByNode')
    });
	$('#filterByDisk').click(function(){
	    filter_results('filterByDisk')
    });

    function sort_results(id) {
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
          document.getElementById("resultsPane").innerHTML = xhttp.responseText;
        }
        else { $("#progress_bar").dialog('close');
}
      };
      var event_object = this.event.currentTarget
      var sort_category = document.getElementById("sortByCategory")
      var sort_status = document.getElementById("sortByStatus")
      if (event_object.id == 'sortByCategory')
      {
          id = sort_category.name
          $("#progress_bar").dialog('open');
          $(sort_category).addClass("btn-primary")
          $(sort_status).addClass("btn-default")
          $(sort_status).removeClass("btn-primary")
          xhttp.open("GET", "/accordianDetails/"+id+"?order=category", true);
          xhttp.send();
          $("#progress_bar").dialog('close');
      }
      else
      {
          $("#progress_bar").dialog('open');
          id = sort_category.name
          $(sort_category).addClass("btn-default")
          $(sort_category).removeClass("btn-primary")
          $(sort_status).addClass("btn-primary")
          xhttp.open("GET", "/accordianDetails/"+id+"?order=status", true);
          xhttp.send();
          $("#progress_bar").dialog('close');
      }

        var dropdown_control = document.getElementById('dropdown_text')
        dropdown_control.innerHTML = 'None'

    }

    function filter_results(filter_criteria) {
        var cluster_items = document.getElementsByClassName("fa-life-ring fa-lg")
        var node_items = document.getElementsByClassName("fa-cog fa-lg")
        var disk_items = document.getElementsByClassName("fa-hdd-o fa-lg")

        var check_id = filter_criteria
        var dropdown_control = document.getElementById('dropdown_text')
        var sort_status = document.getElementById("sortByStatus")
        var sort_category = document.getElementById("sortByCategory")
        $(sort_category).addClass("btn-default")
        $(sort_category).removeClass("btn-primary")
        $(sort_status).addClass("btn-primary")

        if (check_id == 'filterByCluster')
            {
            dropdown_control.innerHTML = 'Cluster'
            filter_items(cluster_items, true);
            filter_items(node_items, false);
            filter_items(disk_items, false);
            }
        if (check_id == 'filterByNode') {
            dropdown_control.innerHTML = 'Node'
            filter_items(node_items, true);
            filter_items(cluster_items, false);
            filter_items(disk_items, false);
            }
        if (check_id == 'filterByDisk') {
            dropdown_control.innerHTML = 'Disk'
            filter_items(disk_items, true);
            filter_items(cluster_items, false);
            filter_items(node_items, false);
        }
        if (check_id == 'filterByAll') {
            dropdown_control.innerHTML = 'None'
            filter_items(disk_items, true);
            filter_items(cluster_items, true);
            filter_items(node_items, true);
        }
    }

    function filter_items(inputs, enable) {
        for(i=0;i<inputs.length;i++){
            item = inputs[i].parentElement.parentElement.parentElement.parentElement
            if (enable)
              item.style.display = 'block';
            else
              item.style.display = 'none';
        }
    }

});
