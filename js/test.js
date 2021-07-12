$(() => {
    //Grab the elements
    const $output = $('#output')
    const $modal = $('#myModal')
    const $close = $('#close')
    const $content = $('#content')
    const $page = $('#page')
    const $input = $('#input')
    const $search = $('#search')
    



    $('form').on('submit', (event) => {
        event.preventDefault()

    const userInput = $input.val()
    const pagename = $page.val()
    //Performed Ajax to get informations from the API
    $.ajax({
        url: 'https://data.cityofchicago.org/resource/thdn-3grx.json' 

    }).then(
        (data) => {
            // perform filtering            
            let filteredsites = data.filter(element => element.address.includes(userInput))
            console.log(filteredsites)
            console.log(filteredsites.length)

            // are there any matches
            if (filteredsites.length == 0) {
                $output.text('We cannot find a facility near you.')
            }
            else {
                // display output

                // This code displays the table's header
                
                const $table = $('<table>')
                const $thead = $('<thead>')
                $table.append($thead)
                const $row_title = $('<tr>')
                $thead.append($row_title)
                const $col1 = $('<th>')
                $col1.text('Facility Name')
                $col1.attr('width', '20%')
                $row_title.append($col1)
                const $col2 = $('<th>')
                $col2.text('Address')
                $col2.attr('width', '20%')
                $row_title.append($col2)
                const $col3 = $('<th>')
                $col3.text('Phone Number')
                $row_title.append($col3)
                $col3.attr('width', '15%')
                const $col4 = $('<th>')
                $col4.text('Web Site')
                $row_title.append($col4)
                const $col5 = $('<th>')
                $col5.text('Action')
                $row_title.append($col5)

                // This displays the table's body
                const $tbody = $('<tbody>')
                for(let i = 0; i < filteredsites.length; i++) {
                    const $row = $('<tr>')
                    const $c1 = $('<td>')
                    $c1.text(filteredsites[i].facility)
                    $row.append($c1)
                    const $c2 = $('<td>')
                    $row.append($c2)
                    $c2.text(filteredsites[i].address)
                    const $c3 = $('<td>')
                    $c3.text(filteredsites[i].phone)
                    $row.append($c3)
                    const $c4 = $('<td>')
                    if (filteredsites[i].web_site != null) {
                        console.log(filteredsites[i].web_site.url)
                        $c4.text(filteredsites[i].web_site.url)
                    }
                    $row.append($c4)
                    const $c5 = $('<td>')
                    const $btn = $('<button>')
                    $btn.text("View Details")
                    $btn.on('click', event => {
                        $content.empty()
                        //adding data for the modal
                        const $fac = $('<p>')
                        $fac.text("Facility Name: " + filteredsites[i].facility)
                        $content.append($fac)

                        const $add = $('<p>')
                        $add.text("Address: " + filteredsites[i].address)
                        $content.append($add)

                        const $web = $('<p>')
                        if (filteredsites[i].web_site != null)
                            $web.text("Web Site: " + filteredsites[i].web_site.url)
                        $content.append($web)

                        $modal.css('display', 'block')
                    })
                    $c5.append($btn)
                    $row.append($c5)

                    $tbody.append($row)

                }
                $table.append($tbody)

                $output.empty()
                $output.append($table)
            }

        },
        (data) => {
            console.log('bad request')
        }
    )
    })

    $close.on('click', event => {
        $modal.css('display', 'none')

    })
    
})
