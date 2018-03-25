$(function() {



   if ($('body').is('.home'))
    {
        function progress_ajax()
        {
            console.log("progress_ajax")

            $.ajax({
                url: '/progress',
                dataType: 'json',
                type: 'GET',
                data:
                {
                    format: 'json'
                },
                error: function(event,status,err)
                {
                    console.log("ajax error")
                },
                success: function(data) {

                    console.log(data)

                    if (data.total != 0 && ((data.total == data.progress) || (data.aborted == "True")))
                    {
                        hide_progress()
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
            progress_ajax()
        }

        function hide_progress()
        {
            $( "#progress_dialog" ).dialog('close');

        }


        function update_progress(data)
        {
            console.log("update_progress")

            current = parseInt(data.progress)
            total = parseInt(data.total)
            aborted = data.aborted
            percent = Math.trunc( current * 100 / total )
            console.log(percent)
            $( "#progress_bar" ).css('width',String(percent) + "%")
            $( "#progress_bar" ).attr('aria-valuenow',String(percent))
            $( "#progress_bar" ).html(String(percent) + "%")
        }

        $("#progresscancel").click(function()
                                   {
                                       $.ajax({
                                           url: '/progresscancel',
                                           dataType: 'html',
                                           type: 'GET',
                                           success: function(data) {
                                               $('#progress_message').html("Cancelling..")
                                           },
                                       })});



        init_progress()

    }


});
