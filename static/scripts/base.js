
$(function() {

    // =========================================================================================================================
    // prototypes
    // =========================================================================================================================


    Date.prototype.yyyymmddss = function() {
        var yyyy = this.getFullYear().toString();
        var mm = (this.getMonth()+1).toString();
        var dd  = this.getDate().toString();
        var sec = this.getSeconds().toString();
        return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]) + (sec[1]?sec:"0"+sec[0]);
    };




    // =========================================================================================================================
    // home page
    // =========================================================================================================================

    if ($('body').is('.home'))
    {
        /// ------------------
        /// progress bar
        /// ------------------

        function progress_ajax()
        {
            $.ajax({
                url: '/progress',
                dataType: 'json',
                type: 'GET',
                data:
                {
                    format: 'json'
                },
                error: function(event, status, error)
                {
                    return
                },
                success: function(data) {

                    data.total = parseInt(data.total)
                    data.progress = parseInt(data.progress)

                    if (data.progress >= data.total)
                    {
                        return;
                    }

                    if (data.aborted == "True")
                    {
                        try {
                            window.stop();
                        } catch (exception) {
                            document.execCommand('Stop');
                        }
                        setTimeout(function(){location.reload()},1000);
                        return;
                    }
                    else
                    {
                        update_progress(data);
                        setTimeout(function(){progress_ajax()},2000);
                    }
                },
            });
        }



        function init_progress()
        {
            progress_cancel = false
            $('#progress_message').html("Please stand by..")
            $( "#progress_dialog" ).dialog({modal:true});
            $("#progressbar").progressbar();
            $("#progressbar").progressbar("option", "value", false);
            $( "#progress_dialog" ).dialog('close')
        }

        function show_progress()
        {
            $('#progress_message').html("Please stand by..")
            $( "#progress_dialog" ).dialog('open');
           setTimeout(function(){progress_ajax()},2000);
        }

        function hide_progress()
        {
            $( "#progress_dialog" ).dialog('close');

        }


        function update_progress(data)
        {
            current = parseInt(data.progress)
            total = parseInt(data.total)
            aborted = data.aborted
            percent = Math.round( current * 100 / total )
            $( "#progress_bar" ).css('width',String(percent) + "%")
            $( "#progress_bar" ).attr('aria-valuenow',String(percent))
            if (percent >= 10 )
            {
                $( "#progress_bar" ).html(String(percent) + "%")
            }
        }

        $("#progresscancel").click(function()
                                   {
                                       setCookie("current_tab", $(".tab-current > a").attr("id"))
                                       $('#progress_message').html("Cancelling..")

                                       $.ajax({
                                           url: '/progresscancel',
                                           dataType: 'html',
                                           type: 'GET',
                                           success: function(data) {
                                               try
                                               {
                                                   window.stop();
                                               } catch (exception)
                                               {
                                                   document.execCommand('Stop');
                                               }
                                               location.reload();
                                           },
                                           error: function(data) {
                                               try
                                               {
                                                   window.stop();
                                               } catch (exception)
                                               {
                                                   document.execCommand('Stop');
                                               }
                                               location.reload();
                                           },

                                       })});

        init_progress()


        // --------------------
        // help buttons on tabs
        // --------------------

        $('#preupgrade-help').click(  function () { window.open('https://help.psapps.emc.com/x/A40r', '_blank'); });
        $('#postupgrade-help').click( function () { window.open('https://help.psapps.emc.com/x/A40r', '_blank'); });
        $('#health-help').click(      function () { window.open('https://help.psapps.emc.com/x/A40r', '_blank'); });
        $('#firmware-help').click(    function () { window.open('https://help.psapps.emc.com/x/A40r', '_blank'); });
        $('#custom-help').click(      function () { window.open('https://help.psapps.emc.com/x/A40r', '_blank'); });


        function reset_help_color(elem)
        {

            $(".help-tab").css("color","#AAAAAA");
            elem.children("a > span.help-tab").css("color", "#FFFFFF");
            elem.parent().parent().children().removeClass('tab-current');
            elem.parent().addClass('tab-current')
        }


        $('#preupgrade-check-tab').click(  function () { reset_help_color($(this))});
        $('#postupgrade-check-tab').click( function () { reset_help_color($(this))});
        $('#health-check-tab').click(      function () { reset_help_color($(this))});
        $('#firmware-check-tab').click(    function () { reset_help_color($(this))});
        $('#custom-check-tab').click(      function () { reset_help_color($(this))});



        // --------
        // sso auth
        // --------

        auth_box =
            {

                standby: function()
                {
                    $('#auth_label').attr("class","auth_label")
                    $('#auth_label').text("Stand by.. Authenticating..")
                    $('#auth_username').attr("class", "auth_input")
                    $('#auth_password').attr("class", "auth_input")
                },


                bad_auth: function()
                {
                    $('#auth_label').attr("class","auth_error");
                    $('#auth_label').text("The Isilon Log Processor does not recognize your user name or password");
                    $('#auth_username').attr("class", "auth_input_error")
                    $('#auth_password').attr("class", "auth_input_error")
                },

                bad_username: function()
                {
                    $('#auth_label').attr("class","auth_error")
                    $('#auth_label').text("Please enter your username")
                    $('#auth_username').attr("class", "auth_input_error")
                    $('#auth_password').attr("class", "auth_input")
                },

                bad_password: function()
                {
                    $('#auth_label').attr("class","auth_error")
                    $('#auth_label').text("Please enter your password")
                    $('#auth_username').attr("class", "auth_input")
                    $('#auth_password').attr("class", "auth_input_error")
                },

                default_labels: function()
                {
                    $('#auth_label').attr("class","auth_label")
                    $('#auth_label').text("Please enter your Network ID")
                    $('#auth_username').attr("class", "auth_input")
                    $('#auth_password').attr("class", "auth_input")
                },


                events: function()
                {
                    $('#login').click(function()
                                        {
                                            username = $('#auth_username').val();
                                            password = $('#auth_password').val();
                                            path     = $('#path').val();


                                            if (/^\s*$/.test(username))
                                            {
                                                auth_box.bad_username()
                                                return
                                            }

                                            if (/^\s*$/.test(password))
                                            {
                                                auth_box.bad_password()
                                                return
                                            }

                                            auth_box.standby()

                                            success = function(data)
                                            {
                                                if (data.status == "notok")
                                                {
                                                    auth_box.bad_auth();
                                                }
                                                else
                                                {
                                                    $('#authenticate_modal').hide()
                                                    $('.modal-backdrop').hide();
                                                    show_progress()
                                                    $('#submit_check').trigger('click');
                                                }
                                            };

                                            failure = function()
                                            {
                                                auth_box.bad_auth()
                                            };


                                            data ={ username : username,
                                                    password : password };

                                            ajax(data,'/authenticate/cred',success, failure )


                                        });

                    $('#authenticate_modal').on("keypress", function(event){
                        if (event.keyCode == 13) {
                            $('#login').trigger('click');
                        }
                    });

                },

                show: function()
                {
                    auth_box.default_labels()

                    $('#auth_username').val("");
                    $('#auth_password').val("");
                    $('#authenticate_modal').modal()
                },

            };

        auth_box.events();

        // --------------
        // authentication
        // --------------

        function authentication(cb)
        {
            path = $('#path').val()

            path = path.replace(/\/+$/g, "");
            path = path.trim()
            $('#path').val(path);

            url  = "/authenticate/path"

            success = function(data) {
                                       if (data.prompt == "true")
                                       {
                                           auth_box.show()
                                       }
                                       else
                                       {
                                           cb(data)
                                       }
                                      };


            failure = function() {
                // authentication failure
            }

            data = { path : path }

            ajax(data,url,success, failure )
        }




        // ----
        // ajax
        // ----

        function ajax(data, url, fn_success, fn_failure)
        {

            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                success:fn_success,
                error:fn_failure,
            });

        };


        // ----------
        // checkboxes
        // ----------


        // toggle custom checks with group checkbox
        function check_the_boxes(main_check_box, check_box_array)
        {

            $(main_check_box).change(function()
            {
                if ($(main_check_box).is(":checked"))
                {
                    for (i=0; i < check_box_array.length; i++)
                    {
                        check_box = check_box_array[i];
                        $(check_box).map(function()
                                         {
                                             $(this).prop("checked",true)
                                         });
                    }
                }
                else
                {
                    for (i=0; i < check_box_array.length; i++)
                    {
                        check_box = check_box_array[i];
                        $(check_box).map(function()
                                         {
                                             $(this).prop("checked",false)
                                         });
                    }
                    $("#check_all_checkbox").prop("checked",false)
                }
            });
        }


        check_the_boxes("#cluster_level_checkbox"  , [".cluster_check"    ])
        check_the_boxes("#cluster_config_checkbox" , [".config_check"     ])
        check_the_boxes("#node_level_checkbox"     , [".node_level_check" ])
        check_the_boxes("#node_status_checkbox"    , [".node_status_check"])
        check_the_boxes("#disk_level_checkbox"     , [".disk_level_check" ])


        check_the_boxes("#check_all_checkbox", [ ".cluster_check",
                                                 ".config_check",
                                                 ".node_level_check",
                                                 ".node_status_check",
                                                 ".disk_level_check",
                                                 "#cluster_level_checkbox",
                                                 "#cluster_config_checkbox",
                                                 "#node_level_checkbox",
                                                 "#node_status_checkbox",
                                                 "#disk_level_checkbox",
                                               ]);


        // turn off select all checkbox
        function single_checkbox_change(selector)
        {
            for (i=0; i < selector.length; i++)
            {
                $(selector[i]).change(function()
                                      {
                                          $("#check_all_checkbox").prop("checked",false)
                                      });
            }
        }
        single_checkbox_change([ ".cluster_check",
                                 ".config_check",
                                 ".node_level_check",
                                 ".node_status_check",
                                 ".disk_level_check"]);


        // ----
        // tabs
        // ----

        $(".nav-tabs a").click(function(){
            $(this).tab('show')
        });



        // --------------------------
        // browse file system button
        // --------------------------

        // prepopulate and autoexpand file selector with contents of cookie: IALogLocation

        $("#browse_button").click( function() {
                                               filepicker_modal.init(function()  // open
                                                                     {
                                                                         // no action
                                                                     },
                                                                     function() // select
                                                                     {
                                                                         setCookie("IALogLocation", $("#save_path").html())
                                                                         $("#path").val($("#save_path").html());
                                                                     },
                                                                     function() // cancel
                                                                     {
                                                                         // no action
                                                                     },
                                                                     "Browse For Logset",
                                                                     "file",
                                                                     undefined,
                                                                     getCookie("IALogLocation")).show();
                                                });


        function toggle_display(elem)
        {

            if($(elem).prop("style").display == 'block')
            {
                $(elem).prop("style").display = 'none';
            }
            else
            {
                $(elem).prop("style").display = 'block';
            }
        }

        $('#openModal').dialog({modal: true, autoOpen: false  }).show();


        // --------------
        // checks buttons
        // --------------

        $("#pre-upgrade").click(function(e)
                                {
                                    e.preventDefault();
                                    $('#submit_check').attr("value", "Run Pre-Upgrade Check");
                                    cb = function() {
                                                      show_progress_and_submit();
                                                    };

                                    authentication(cb);
                                });

        $("#post-upgrade").click(function(e)
                                 {
                                     e.preventDefault();
                                     $('#submit_check').attr("value", "Run Post-Upgrade Check");
                                     cb = function() {
                                                       show_progress_and_submit();
                                                     }
                                     authentication(cb);
                                 });


        $("#health-check").click(function(e)
                                 {
                                     e.preventDefault();
                                     $('#submit_check').attr("value", "Run Health Check");
                                     cb = function() {
                                                       show_progress_and_submit();
                                                     }
                                     authentication(cb);
                                 });

        $("#firmware-check").click(function(e)
                                   {
                                       e.preventDefault();
                                       $('#submit_check').attr("value", "Run Firmware Check");
                                       cb = function() {
                                                         show_progress_and_submit();
                                                       }
                                       authentication(cb);
                                   });


        // check to see if boxes are checked during custom check
        $("#custom-check").click( function (event) {
                                                      event.preventDefault();
                                                      $('#submit_check').attr("value", "Run Custom Check");
                                                      cb = function() {
                                                                        okay = false
                                                                        $("input").map(function() { if ($(this).is(":checkbox") && $(this).is(":checked"))
                                                                                                    {
                                                                                                        okay = true
                                                                                                    }});
                                                                        if (!okay)
                                                                        {
                                                                            alert ("Please select an option from the Custom Checks page")
                                                                        }
                                                                        else
                                                                        {
                                                                            show_progress_and_submit("progress_bar")
                                                                        }
                                                                      };
                                                        authentication(cb);

                                                      });




        function show_progress_and_submit()
        {
            if ($("#path")[0].checkValidity() != false)
            {
                show_progress()
            }
            $('#submit_check').trigger('click');
       }



        // --------------------------------------
        // bugfix IA 22 - keypress not submitting
        // --------------------------------------

        $(document).on("keypress", ":input:not(textarea):not([type=button])", function(event){
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });


        // ----------------------------
        // sets persistent log location
        // ----------------------------

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

        current_tab = getCookie("current_tab")
        if (typeof(current_tab) != undefined && current_tab != "preupgrade-check-tab" && current_tab != null )
        {
            $("#"+current_tab).trigger("click");
            setCookie("current_tab","")
        }

        $( ".btn-primary" ).click(function()
                                  {
                                      pathCookie(pathDOM())
                                      srCookie(srDOM())
                                  });


        // --------------------------------------
        // nag screen  IA-108
        // --------------------------------------

        function show_nag(message)
        {
            // message is the contents of the nag dialog box

            $("#nag_message").html(message)

            // show the dialog box
            $("#nag_dialog").dialog('open');

            // this is the cancel button event callback
            $("#nagcancel").click(function()
                                  {
                                      hide_nag()
                                      $.ajax({
                                          url: '/nag_ack',
                                          dataType: 'json',
                                          type: 'GET',
                                          data:
                                          {
                                              format: 'json'
                                          },
                                          error: function(event, status, error)
                                          {
                                              return
                                          },
                                          success: function(data)
                                          {
                                              // no action
                                          },
                                      });

                                  });
        }


        // hide the nag screen
        function hide_nag()
        {
            $( "#nag_dialog" ).dialog('close');

        }


        // initialize the nag dialog modal and hide it
        function nag_init()
        {
            $( "#nag_dialog" ).dialog({modal:true});
            hide_nag()
        }


        // ----------------------------------------
        // nag screen check runs on every page load
        // ----------------------------------------

        // initialize

        nag_init()

        // ajax request to determine whether to display nag screen
        $.ajax({
            url: '/nag',
            dataType: 'json',
            type: 'GET',
            data:
            {
                format: 'json'
            },
            error: function(event, status, error)
            {
                return
            },
            success: function(data)
            {
                // if ajax data.nag_type returns "nag" then display nag screen
                if (data.nag_type == "nag")
                {
                    show_nag('This version of Isilon Advisor is valid for 90 days from the release and will be expiring soon. You are encouraged to download the latest version at <a href="https://help.psapps.emc.com/x/VIwr">https://help.psapps.emc.com/x/VIwr</a>.')
                    return
                }
                // if ajax data.nag_type returns "expired" then display nag screen
                if (data.nag_type == "expired")
                {
                    show_nag('This version of Isilon Advisor is valid for 90 days from the release and has expired. You must download the latest version at <a href="https://help.psapps.emc.com/x/VIwr">https://help.psapps.emc.com/x/VIwr</a>.')
                    $("#nagcancel").remove()
                    return
                }
            },
        });





    }


    // ==================================================================================
    //  previous runs page sorting
    // ==================================================================================

    if ($('body').is('.previous_runs'))
    {
        function toggle_visibility(caller)
        {
            var edName = $("#path");

            if (edName.checkValidity() != false)
            {
                var e = $("#" + caller.id);
                if(e.style.display == 'block')
                    e.style.display = 'none';
                else
                    e.style.display = 'block';
            }

            var dialog = $("#" + caller.id);

        }


        function filter_results(filter_criteria)
        {
            var cluster_items = $(".fa-life-ring.fa-lg")
            var node_items = $(".fa-cog.fa-lg")
            var disk_items = $(".fa-hdd-o.fa-lg")

            var check_id = filter_criteria.id

            var dropdown_control = $('#dropdown_text')
            var sort_status = $("#sortByStatus")
            var sort_category = $("#sortByCategory")

            $(sort_category).addClass("btn-default")
            $(sort_category).removeClass("btn-primary")
            $(sort_status).addClass("btn-primary")

            if (check_id == 'filterByCluster')
            {
                dropdown_control.html('Cluster')
                filter_items(cluster_items, true);
                filter_items(node_items, false);
                filter_items(disk_items, false);
            }
            if (check_id == 'filterByNode')
            {
                dropdown_control.html('Node')
                filter_items(node_items, true);
                filter_items(cluster_items, false);
                filter_items(disk_items, false);
            }

            if (check_id == 'filterByDisk')
            {
                dropdown_control.html('Disk')
                filter_items(disk_items, true);
                filter_items(cluster_items, false);
                filter_items(node_items, false);
            }

            if (check_id == 'filterByAll')
            {
                dropdown_control.html('None')
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



        function sort_results(id)
        {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    $("#resultsPane").html(xhttp.responseText);
                }
            };

            var event_object = this.event.currentTarget
            var sort_category = $("#sortByCategory")
            var sort_status = $("#sortByStatus")


            if (event_object.id == 'sortByCategory')
            {
                $(sort_category).addClass("btn-primary")
                $(sort_status).addClass("btn-default")
                $(sort_status).removeClass("btn-primary")
                xhttp.open("GET", "/accordianDetails/"+id+"?order=category", true);
                xhttp.send();
            }
            else
            {
                $(sort_category).addClass("btn-default")
                $(sort_category).removeClass("btn-primary")
                $(sort_status).addClass("btn-primary")
                xhttp.open("GET", "/accordianDetails/"+id+"?order=status", true);
                xhttp.send();
            }

            var dropdown_control = $('#dropdown_text')
            dropdown_control.html('None')

        }

        $.bootstrapSortable(false);

    }




    // =========================================================================================
    //  clusterResults
    // =========================================================================================

    if ($('body').is('.clusterResults'))
    {


        $('.collapse').on('shown.bs.collapse', function(){ $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
                                                         }).on('hidden.bs.collapse', function(){ $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");});



        $('#closeall').click(function()
                             {
                                 $('.panel-collapse.in')
		                     .collapse('hide');
                                 $('#closeall').removeClass('btn-default').addClass('btn-primary');
                                 $('#openall').removeClass('btn-primary').addClass('btn-default');
	                     });

        $('#openall').click(function()
                            {
                                $('.panel-collapse:not(".in")')
			            .collapse('show');
                                $('#openall').removeClass('btn-default').addClass('btn-primary');
                                $('#closeall').removeClass('btn-primary').addClass('btn-default');
		            });


        $("#sortByStatus").click(    function(e){ e.preventDefault(); sort_results("sortByStatus")});
        $('#sortByCategory').click(  function(e){ e.preventDefault(); sort_results("sortByCategory")});

        $('#filterByAll').click(     function(){ filter_results('filterByAll')});
        $('#filterByCluster').click( function(){ filter_results('filterByCluster')});
        $('#filterByDisk').click(    function(){ filter_results('filterByDisk')});
        $('#filterByNode').click(    function(){ filter_results('filterByNode')});



        loc = window.location.href
        id = loc.match(/\/([^\/]*)$/)
        if (id.length > 1 && ! $.isNumeric(id[1]))
        {
            // id error
        }
        else
        {
            id = id[1]
        }


        // message box that displays where there is an error in report generation //
        report_error_modal =
        {
            initialized : false,
            init : function()
            {
                // only initialize once!
                if (this.initialized)
                {
                   return this;
                }
                this.initialized = true

                $('#report_error_modal').dialog({modal:true, width:'auto'});
                $('#report_error_modal').dialog('close');
                $('#report_error_ok').click(function()
                                            {
                                                report_error_modal.hide();
                                            })
                return this
            },
            show: function(path)
            {
                $('#report_fail_path').html(path)
                $('#report_error_modal').dialog('open');
            },
            hide: function()
            {
                $('#report_error_modal').dialog('close');
            }
        }
        report_error_modal.init()



        // message box that displays where there is an error in report generation //
        report_success_modal =
        {
            initialized : false,
            init : function()
            {
                // only initialize once!
                if (this.initialized)
                {
                   return this;
                }
                this.initialized = true

                $('#report_success_modal').dialog({modal:true, width:'auto'});
                $('#report_success_modal').dialog('close');
                $('#report_success_ok').click(function()
                                            {
                                                report_success_modal.hide();
                                            })
                return this
            },
            show: function(path)
            {
                $('#report_success_path').html(path)
                $('#report_success_modal').dialog('open');
            },
            hide: function()
            {
                $('#report_success_modal').dialog('close');
            }
        }
        report_success_modal.init()



        // message box that gives the user the choice of report type //
        report_dialog_modal =
        {
            initialized : false,
            init : function()
                   {
                       // only initialize once !
                       if (this.initialized)
                       {
                           return this;
                       }
                       this.initialized = true
                       $( "#report_dialog_modal" ).dialog({modal:true});
                       $( "#report_dialog_modal" ).dialog('close');

                       $( "#report_cancel_button").click( function()
                                                          {
                                                              report_dialog_modal.hide()
                                                          });


                       $( '#report_generate_button').click( function()
                                                            {
                                                                report_type = $('input[name=report_type]:checked').val();
                                                                report_format = $('input[name=report_format]:checked').val();

                                                                // remember the report type and report format for future display
                                                                setCookie("IAReportType", report_type)
                                                                setCookie("IAReportFormat", report_format)

                                                                report_dialog_modal.hide();

                                                                report_type == "word" ? extension = ".doc" : extension = ".ppt"

                                                                // generate the report filename based on date and filetype
                                                                var date = new Date();
                                                                filepicker_file = "isilon_advisor_report_" + date.yyyymmddss() + extension

                                                                filepicker_modal.init(function()  // open
                                                                                      {
                                                                                          // no action
                                                                                      },
                                                                                      function() // select
                                                                                      {
                                                                                          save_path = $("#save_path").html()
                                                                                          save_path= save_path.substring(0,save_path.lastIndexOf("/")+1);
                                                                                          setCookie("IAReportLocation", save_path);


                                                                                          $.ajax({
                                                                                              url: '/generateReport',
                                                                                              dataType: 'json',
                                                                                              type: 'POST',
                                                                                              data:
                                                                                              {
                                                                                                  id   : id,
                                                                                                  path : $("#save_path").html(),
                                                                                                  report_type: report_type,
                                                                                                  report_format: report_format
                                                                                              },
                                                                                              error: function(event, status, error)
                                                                                              {
                                                                                                  report_error_modal.show($("#save_path").html())
                                                                                                  return
                                                                                              },
                                                                                              success: function(data) {
                                                                                                  if (data.error == 'true')
                                                                                                  {
                                                                                                      report_error_modal.show($("#save_path").html())
                                                                                                      return
                                                                                                  }
                                                                                                  else
                                                                                                  {
                                                                                                      report_success_modal.show($("#save_path").html())
                                                                                                  }
                                                                                              },
                                                                                          });


                                                                                      },
                                                                                      function() // cancel
                                                                                      {
                                                                                          // no action
                                                                                      },
                                                                                      "Pick Report Location",
                                                                                      "dir",
                                                                                      filepicker_file,
                                                                                      getCookie("IAReportLocation")  ).show()
                                                            });
                       return this;
                   },
            show : function()
                   {

                       $("#report_type_" + getCookie("IAReportType")).prop("checked",true)
                       $("#report_format_" + getCookie("IAReportFormat")).prop("checked",true)
                       $( "#report_dialog_modal" ).dialog('open');
                   },
            hide:  function()
                   {
                       $( "#report_dialog_modal" ).dialog('close');
                   }
        }
        report_dialog_modal.init()


        $("#generateReport").click(   function()
                                      {
                                          //$( '#report_generate_button').trigger("click")
                                          report_dialog_modal.init().show()
                                      });




        $('#selectfilter').change( function () {
            selected = $('#selectfilter').val()
            if (selected == 'None')
            {
                filter_results('filterByAll')
                return
            }

            if (selected == 'Cluster')
            {
                filter_results('filterByCluster')
                return
            }

            if (selected == 'Node')
            {
                filter_results('filterByNode')
                return
            }

            if (selected == 'Disk')
            {
                filter_results('filterByDisk')
                return
            }

        });



        $("#exportResults").click(function()
                                  {
                                      filepicker_modal.init(function() // open
                                                          {
                                                              // no action
                                                          },
                                                          function() // select
                                                          {
                                                                setCookie("IAExportLocation", $("#save_path").html())
                                                                data = {
                                                                    clusterId: $("#exportResults")[0].name,
                                                                    reports_folder : $("#save_path").html()
                                                                    }
                                                                $.ajax({
                                                                    type: 'POST',
                                                                    url: "/exportResults",
                                                                    data: data,
                                                                    error: function(event, status, error)
                                                                    {
                                                                        report_error_modal.show($("#save_path").html())
                                                                        return
                                                                    },
                                                                    success: function(data) {
                                                                        if (data.error == 'true')
                                                                        {
                                                                            report_error_modal.show($("#save_path").html())
                                                                            return
                                                                        }
                                                                        else
                                                                        {
                                                                            report_success_modal.show($("#save_path").html())
                                                                        }
                                                                    },
                                                                });
                                                          },
                                                          function() // cancel
                                                          {
                                                              // nope
                                                          },
                                                          "Select An Export Folder",
                                                          "dir",
                                                          undefined,
                                                          getCookie("IAExportLocation")).show()
                                  });


        function sort_results(elem)
        {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    $("#resultsPane").html(xhttp.responseText);
                    $('.selectpicker').selectpicker('val', 'None');
                    return
                }
                // trap error here
            };


            if (elem == 'sortByCategory')
            {
                id = $("#sortByCategory").attr("name")
                $("#sortByCategory").removeClass("btn-default").addClass("btn-primary")
                $("#sortByStatus").removeClass("btn-primary").addClass("btn-default")
                xhttp.open("GET", "/accordianDetails/"+id+"?order=category", true);
                xhttp.send();
            }
            else
            {
                id = $("#sortByStatus").attr("name")
                $("#sortByCategory").removeClass("btn-primary").addClass("btn-default")
                $("#sortByStatus").removeClass("btn-default").addClass("btn-primary")
                xhttp.open("GET", "/accordianDetails/"+id+"?order=status", true);
                xhttp.send();
            }



        }

        function filter_results(filter_criteria)
        {

            var cluster_items = $(".fa-life-ring.fa-lg")
            var node_items = $(".fa-cog.fa-lg")
            var disk_items = $(".fa-hdd-o.fa-lg")

            var check_id = filter_criteria

            $('#sortByCategory').addClass("btn-default")
            $('#sortByCategory').removeClass("btn-primary")
            $('#sortByStatus').addClass("btn-primary")

            if (check_id == 'filterByCluster')
            {
                filter_items(cluster_items, true);
                filter_items(node_items, false);
                filter_items(disk_items, false);
            }
            if (check_id == 'filterByNode') {
                filter_items(node_items, true);
                filter_items(cluster_items, false);
                filter_items(disk_items, false);
            }
            if (check_id == 'filterByDisk') {
                filter_items(disk_items, true);
                filter_items(cluster_items, false);
                filter_items(node_items, false);
            }
            if (check_id == 'filterByAll') {
                filter_items(disk_items, true);
                filter_items(cluster_items, true);
                filter_items(node_items, true);
            }
        }

        function filter_items(inputs, enable) {
            inputs.each(function(index)
                        {
                            if (enable)
                            {
                                $(this).parent().parent().parent().parent().css("display","block")
                            }
                            else
                            {
                                $(this).parent().parent().parent().parent().css("display","none")
                            }
                        }
                       );

        }

    }


    // =========================================================================================
    //  settings
    // =========================================================================================

    if ($('body').is('.settings'))
    {
        $("#browse_button").click(function ()
                                  {
                                      ajaxrequest("/settings",
                                                  "POST",
                                                  {},
                                                  "json",
                                                  function(data) // success
                                                  {
                                                      filepicker_modal.init(function() // open
                                                                          {
                                                                              // no action
                                                                          },
                                                                          function() // select
                                                                          {
                                                                              $("#reportsLocation").val($("#save_path").html());
                                                                              ajaxrequest("/settings",
                                                                                          "POST",
                                                                                          { reportsLocation : $("#save_path").html()},
                                                                                          "json",
                                                                                          function() {},
                                                                                          function() {}
                                                                                         )
                                                                          },
                                                                          function() // cancel
                                                                          {
                                                                              // nope
                                                                          },
                                                                          "Pick Reports Folder Location",
                                                                          "dir",
                                                                          "",
                                                                          data.reportsLocation).show()
                                                  },
                                                  function() {} // fail
                                                 );
                                                  });


    }


  // =========================================================================================
  //  all pages
  // =========================================================================================

    function setCookie(key, value) {
        var expires = new Date();
        expires.setTime(expires.getTime() + (365 * 24 * 60 * 60 * 1000));
        document.cookie = key + '=' + value + ';expires=' + expires.toUTCString();
        // document.cookie = key + '=' + value + ';expires=0';
        // document.cookie = key + '=' + value + "; path=/"
    }

    function getCookie(key) {
        var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
        return keyValue ? keyValue[2] : "";
    }

    function closeWindow()
    {
        window.open('','_parent','');
        window.close();
    }

    $('#analysis-help').click(function () { window.open('https://help.psapps.emc.com/x/A40r', '_blank'); });

    // ---------
    // tool tips
    // ---------
    $('[data-toggle="tooltip"]').tooltip({container: 'body'});


    function ajaxrequest(url, request_type, data, data_type, success_function, error_function)
    {
            $.ajax({
                url: url,
                dataType: data_type,
                type: request_type,
                data: data,
                error: error_function,
                success: function(data) {
                    success_function(data)
                },
            });
    }



    // wrapper for the filepicker modal //
    filepicker_modal =
    {
        lastfiletype : undefined,
        init : function (open_function, select_function, cancel_function, title, display_depth, filename, openTo)
        {
            // open_function   - callback when dialog opened
            // select_function - callback for select button
            // cancel_function - callback for cancel button
            // title           - dialog box title
            // display_depth   - "dir" or undefined -  display directory level
            // filename        - when display depth is dir append this filename to the directory for
            //                 - display in the file selector

            if (openTo != undefined && /^http/.test(openTo))
            {
                openTo = undefined
            }

            // find the file extension based on the filename
            filetype = ""
            if (typeof(filename) != "undefined")
            {
                filename.match(/^.*\.ppt$/) ? filetype = "ppt": 0;
                filename.match(/^.*\.doc$/) ? filetype = "doc": 0;
            }

            // if the filetype is the same as the last filetime
            if (filetype == this.lastfiletype )
            {
                // ? unneeded .. ?
                //return this
            }

            // remember the filetype
            typeof(filename) == "undefined" ? filename = "" : this.lastfiletype = filetype

            $('#openModal').dialog({modal: true, autoOpen: false, title: title  });
            $("#openModal").dialog("option", "width", 600)
            open_function(title)

            // reset the select button event handlers
            $("#filepicker_select").unbind()
            $("#filepicker_select").click( function ()
                                           {
                                               filepicker_modal.hide()
                                               select_function()
                                           });

            // reset the select button event handlers
            $("#filepicker_cancel").unbind()
            $("#filepicker_cancel").click (function ()
                                           {
                                               filepicker_modal.hide()
                                               cancel_function()
                                           });


            // connector_url is used to return the directory paths to display in the file picker
            connector_url = "/connector/directory/file";
            if (display_depth == "dir")
            {
                connector_url = "/connector/directory/dir"
            }

            // reset the input box in the modal that displays the selected file
            $("#save_path").html("&nbsp;")

            unwind = {
                fullpath   : "",
                prev_click : "",
                clicker    : function(path)
                             {
                                 if ( path != undefined && path != "")
                                 {
                                     unwind.fullpath = path.split("/");
                                     return unwind.click
                                 }
                                 else
                                 {
                                     return function () {}
                                 }
                             },
                click      : function()
                             {
                                 $('a[rel]').each( function (i,el) { $(this).addClass("nohover")})

                                 if (unwind.fullpath.length == 0)
                                 {
                                     // done
                                     setTimeout(function()
                                                {
                                                    $('a[class="nohover filepickhover"]').removeClass("filepickhover");
                                                    $('a[class="nohover"]').removeClass("nohover") }
                                                , 500 );
                                     return;
                                 }

                                 if (unwind.fullpath[0] == "")
                                 {
                                     unwind.fullpath[0] = "/"
                                 }

                                 setTimeout(function()
                                            {
                                                clickme = unwind.fullpath.shift()
                                                if (unwind.prev_click == "")
                                                {
                                                    unwind.prev_click = clickme
                                                }
                                                else
                                                {
                                                    clickme = unwind.prev_click + "/" + clickme
                                                }
                                                unwind.prev_click = clickme
                                                $('a[class="nohover filepickhover"]').removeClass("filepickhover")

                                                try
                                                {
                                                    scrollTo = $('a[rel="' + clickme + '/"]')
                                                    container = $('#fileTree')
                                                    container.scrollTop(
                                                        scrollTo.offset().top - container.offset().top + container.scrollTop())


                                                    $('a[rel="' + clickme + '/"]').addClass("filepickhover")
                                                    $('a[rel="' + clickme + '/"]').click()
                                                }
                                                catch(err)
                                                {
                                                    $('a[class="nohover filepickhover"]').removeClass("filepickhover");
                                                    $('a[class="nohover"]').removeClass("nohover")
                                                }
                                                },10);
                             }
            }

            $('#fileTree').fileTree({ root: '', expandSpeed: -1, script: connector_url, expandCB: unwind.clicker(openTo)}, function(file)
                                                                        {
                                                                            if (file)
                                                                            {
                                                                                // bugfix? compress repeating forward slashes
                                                                                file = file.replace(/\/\/+/g, '/')
                                                                                if (file.length > 1)
                                                                                {
                                                                                    file = file.replace(/\/$/, '')
                                                                                }
                                                                                $("#save_path").html(file)
                                                                            }
                                                                            else
                                                                            {
                                                                                // should never see this
                                                                                $("#save_path").html("ERROR")
                                                                            }
                                                                        },
                                                                        function(dire)
                                                                        {
                                                                            if (dire)
                                                                            {
                                                                                // bugfix? compress repeating forward slashes
                                                                                dire = dire + "/" + filename
                                                                                dire = dire.replace(/\/\/+/g, '/')
                                                                                if (dire.length > 1)
                                                                                {
                                                                                    dire = dire.replace(/\/$/, '')
                                                                                }
                                                                                $("#save_path").html(dire)
                                                                            }
                                                                            else
                                                                            {
                                                                                // should never see this
                                                                                $("#save_path").html("ERROR")
                                                                            }

                                                                        })
            return this
        },
        show : function()
               {
                   $('#openModal').dialog("open");
               },
        hide:  function()
               {
                   $('#openModal').dialog("close");
               }
    }



    // =========================================================================================
    //  upgrade advisor
    // =========================================================================================

    if ($('body').is('.onefs_upgrade_tool'))
    {

//        $('.collapse').on('shown.bs.collapse', function(){ $(this).parent().parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
//                                                         }).on('hidden.bs.collapse', function(){ $(this).parent().parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");});


        $('#start_version').change( function () {
            selected = $('#start_version').val()
            url  = "/upgradeAdvisor/endVersions"

            success = function(data) {
                $('#end_version').html('');
                $('#end_version').append(data)
            };

            failure = function() {
                // authentication failure
            }

            data = { start_version : selected }

            ajax(data,url,success, failure )


        })

        $('#end_version').change( function () {
            start_version = $('#start_version').val()
            end_version = $('#end_version').val()
            url  = "/upgradeAdvisor/results"

            success = function(data) {
                $('#results').html(data);
                $('.collapse').on('shown.bs.collapse', function(){ $(this).parent().find(".glyphicon-plus").removeClass("glyphicon-plus").addClass("glyphicon-minus");
                                                         }).on('hidden.bs.collapse', function(){ $(this).parent().find(".glyphicon-minus").removeClass("glyphicon-minus").addClass("glyphicon-plus");});
                //$('#update_path_results').append(data)
                $('#upgrade_path_results').css("display", "block")
            };

            failure = function() {
                // authentication failure
            }

            data = { 'start_version' : start_version, 'end_version' : end_version }

            ajax(data,url,success, failure )


        })

        function ajax(data, url, fn_success, fn_failure)
        {

            $.ajax({
                type: 'POST',
                url: url,
                data: data,
                success:fn_success,
                error:fn_failure,
            });

        };

    }




});
