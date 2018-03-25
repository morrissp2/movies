
function doClusterLevelChecks(checkboxElem) {
      var myElement = document.getElementById("activeUpgrade");
      var myElement1 = document.getElementById("clusterHealth");
      var myElement2 = document.getElementById("clusterName");
      var myElement3 = document.getElementById("clusterSize");
      var myElement4 = document.getElementById("clusterTime");
      var myElement5 = document.getElementById("contactInfo");
      var myElement6 = document.getElementById("storagePools");
      var myElement7 = document.getElementById("installedPatches");
      var myElement8 = document.getElementById("jobStatus");
      var myElement9 = document.getElementById("notification");
      var myElement10 = document.getElementById("onefsVersion");
      var myElement11 = document.getElementById("openEvents");
      var myElement12 = document.getElementById("openSMMaster");
      var myElement13 = document.getElementById("upgradeService");
      var myElement14 = document.getElementById("eta");
      if (checkboxElem.checked) {
        myElement.checked = true;
        myElement1.checked = true;
        /* myElement2.checked = true; */
        myElement3.checked = true;
        myElement4.checked = true;
        myElement5.checked = true;
        myElement6.checked = true;
        myElement7.checked = true;
        myElement8.checked = true;
        myElement9.checked = true;
        myElement10.checked = true;
        myElement11.checked = true;
        myElement12.checked = true;
        myElement13.checked = true;
        myElement14.checked = true;
      } else {
        myElement.checked = false;
        myElement1.checked = false;
        /* myElement2.checked = false; */
        myElement3.checked = false;
        myElement4.checked = false;
        myElement5.checked = false;
        myElement6.checked = false;
        myElement7.checked = false;
        myElement8.checked = false;
        myElement9.checked = false;
        myElement10.checked = false;
        myElement11.checked = false;
        myElement12.checked = false;
        myElement13.checked = false;
        myElement14.checked = false;
      }
    }

function doClusterConfigurationChecks(checkboxElem) {
      var myElement = document.getElementById("esrsStatus");
      var myElement1 = document.getElementById("gna");
      var myElement2 = document.getElementById("gatewayPriority");
      var myElement3 = document.getElementById("hdfs");
      var myElement4 = document.getElementById("licenses");
      var myElement5 = document.getElementById("nfsStatus");
      var myElement6 = document.getElementById("fileSharing");
      var myElement7 = document.getElementById("spnList");
      var myElement8 = document.getElementById("snapshotLog");
      var myElement9 = document.getElementById("smartConnectIQ");
      var myElement10 = document.getElementById("snapshotInfo");
      var myElement11 = document.getElementById("supportIQ");
      var myElement12 = document.getElementById("syncPolicies");
      if (checkboxElem.checked) {
        myElement.checked = true;
        myElement1.checked = true;
        myElement2.checked = true;
        myElement3.checked = true;
        myElement4.checked = true;
        myElement5.checked = true;
        myElement6.checked = true;
        myElement7.checked = true;
        myElement8.checked = true;
        myElement9.checked = true;
        myElement10.checked = true;
        myElement11.checked = true;
        myElement12.checked = true;
      } else {
        myElement.checked = false;
        myElement1.checked = false;
        myElement2.checked = false;
        myElement3.checked = false;
        myElement4.checked = false;
        myElement5.checked = false;
        myElement6.checked = false;
        myElement7.checked = false;
        myElement8.checked = false;
        myElement9.checked = false;
        myElement10.checked = false;
        myElement11.checked = false;
        myElement12.checked = false;
      }
    }
function doNodeLevelChecks(checkboxElem) {
      var myElement = document.getElementById("bootDrives");
      var myElement2 = document.getElementById("nvramBattery");
      var myElement3 = document.getElementById("nodeCount");
      var myElement4 = document.getElementById("nodeFirmware");
      var myElement5 = document.getElementById("nodeHealth");
      var myElement6 = document.getElementById("partitionSizes");
      var myElement7 = document.getElementById("nodeSizes");
      var myElement8 = document.getElementById("nodeUptime");
      if (checkboxElem.checked) {
        myElement.checked = true;
        myElement2.checked = true;
        myElement3.checked = true;
        myElement4.checked = true;
        myElement5.checked = true;
        myElement6.checked = true;
        myElement7.checked = true;
        myElement8.checked = true;
      } else {
        myElement.checked = false;
        myElement2.checked = false;
        myElement3.checked = false;
        myElement4.checked = false;
        myElement5.checked = false;
        myElement6.checked = false;
        myElement7.checked = false;
        myElement8.checked = false;
      }
    }

function doNodeStatusChecks(checkboxElem) {
      var myElement = document.getElementById("ctoReport");
      var myElement1 = document.getElementById("dmiLog");
      var myElement2 = document.getElementById("hardwareStatus");
      var myElement3 = document.getElementById("kernOpenFiles");
      var myElement4 = document.getElementById("lwiodLog");
      var myElement5 = document.getElementById("messagesLog");
      var myElement6 = document.getElementById("nicStatus");
      var myElement7 = document.getElementById("routingTables");
      var myElement8 = document.getElementById("varCrash");
      var myElement9 = document.getElementById("netstatConnections");
      if (checkboxElem.checked) {
        myElement.checked = true;
        myElement1.checked = true;
        myElement2.checked = true;
        myElement3.checked = true;
        myElement4.checked = true;
        myElement5.checked = true;
        myElement6.checked = true;
        myElement7.checked = true;
        myElement8.checked = true;
        myElement9.checked = true;
      } else {
        myElement.checked = false;
        myElement1.checked = false;
        myElement2.checked = false;
        myElement3.checked = false;
        myElement4.checked = false;
        myElement5.checked = false;
        myElement6.checked = false;
        myElement7.checked = false;
        myElement8.checked = false;
        myElement9.checked = false;
      }
    }

function doDiskLevelChecks(checkboxElem) {
      var myElement = document.getElementById("diskBayHealth");
      var myElement1 = document.getElementById("diskFirmware");
      var myElement2 = document.getElementById("diskLoad");
      var myElement3 = document.getElementById("idiErrors");
      if (checkboxElem.checked) {
        myElement.checked = true;
        myElement1.checked = true;
        myElement2.checked = true;
        myElement3.checked = true;
      } else {
        myElement.checked = false;
        myElement1.checked = false;
        myElement2.checked = false;
        myElement3.checked = false;
      }
    }

function doCheckAll(checkboxElem) {
    var input = document.getElementsByTagName("input");
    for(i=0;i<input.length;i++){
        if (input[i].type == 'checkbox')
        {
            if (checkboxElem.checked)
                {
                    input[i].checked = true
                }
            else
                {
                    input[i].checked = false;
                }
        }
    }
}

function openSearch()
    {
        var tree = document.getElementById("xxx");
        if(tree.style.display == 'block')
            tree.style.display = 'none';
        else
            tree.style.display = 'block';
    }


function closeWindow() {
    window.open('','_parent','');
    window.close();
    }

function AreAnyCheckboxesChecked () {
  var inputs = document.getElementsByTagName('input');
  var okay=false;
  for (var i = 0; i < inputs.length; i++) {
    if(inputs[i].type == 'checkbox')
        if (inputs[i].checked) {
            okay=true;
            break;
    }
  }
    if (!okay) {
          alert ("Please select an option from the Custom Checks page")
          event.preventDefault();
    }else {     toggle_visibility(progress_bar)

    }
}

   function toggle_sort() {
       var e = document.getElementById("progress_bar");
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
   }
   function toggle_visibility(caller) {
       /*
       var dialog = document.getElementById('progress');
       dialog.showModal();
       */
       var edName = document.getElementById("path");

       if (edName.checkValidity() != false)
        {
       var e = document.getElementById(caller.id);
       if(e.style.display == 'block')
          e.style.display = 'none';
       else
          e.style.display = 'block';
        }

       var dialog = document.getElementById(caller.id);
       dialog.showModal();

   }

function filter_results(filter_criteria) {
    var cluster_items = document.getElementsByClassName("fa-life-ring fa-lg")
    var node_items = document.getElementsByClassName("fa-cog fa-lg")
    var disk_items = document.getElementsByClassName("fa-hdd-o fa-lg")

    var check_id = filter_criteria.id
    var dropdown_control = document.getElementById('dropdown_text')
    var sort_status = document.getElementById("sortByStatus")
    var sort_category = document.getElementById("sortByCategory")
    jQuery($(sort_category).addClass("btn-default"))
    jQuery($(sort_category).removeClass("btn-primary"))
    jQuery($(sort_status).addClass("btn-primary"))

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
        item = inputs[i].parentElement.parentElement.parentElement
        if (enable)
          item.style.display = 'block';
        else
          item.style.display = 'none';
    }
}

function sort_results(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      document.getElementById("resultsPane").innerHTML = xhttp.responseText;
      toggle_sort()
    }
  };
  var event_object = this.event.currentTarget
  var sort_category = document.getElementById("sortByCategory")
  var sort_status = document.getElementById("sortByStatus")
  if (event_object.id == 'sortByCategory')
  {
      jQuery($(sort_category).addClass("btn-primary"))
      jQuery($(sort_status).addClass("btn-default"))
      jQuery($(sort_status).removeClass("btn-primary"))
      toggle_sort()
      xhttp.open("GET", "/accordianDetails/"+id+"?order=category", true);
      xhttp.send();
  }
  else
  {
      jQuery($(sort_category).addClass("btn-default"))
      jQuery($(sort_category).removeClass("btn-primary"))
      jQuery($(sort_status).addClass("btn-primary"))
      toggle_sort()
      xhttp.open("GET", "/accordianDetails/"+id+"?order=status", true);
      xhttp.send();
  }

    var dropdown_control = document.getElementById('dropdown_text')
    dropdown_control.innerHTML = 'None'

}




$(function() {


    function setCookie(key, value) {
            var expires = new Date();
            expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));
            //document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
            document.cookie = key + '=' + value + ';expires=0';
    }

    function getCookie(key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : "";
    }

    function pathCookie(arg)
    {
        return arg == null ? getCookie("persist_url") : setCookie("persist_url", arg);
    }

    function srCookie(arg)
    {
        return arg == null ? getCookie("persist_sr") : setCookie("persist_sr", arg);
    }

    function pathDOM(arg)
    {
        return arg == null ? $("#path").val() : $("#path").val(arg);
    }

    function srDOM(arg)
    {
        return arg == null ? $("#srNumber").val() : $("#srNumber").val(arg);
    }

    if (pathDOM() == "") { pathDOM(pathCookie())}
    if (srDOM()   == "") { srDOM(srCookie())}

    $( ".btn-primary" ).click(function()
                              {
                                  pathCookie(pathDOM())
                                  srCookie(srDOM())
                              });


});
