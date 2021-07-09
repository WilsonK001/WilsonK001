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
    let myUrl = ''
    if (pagename === 'testing')
        myUrl = 'https://data.cityofchicago.org/resource/thdn-3grx.json' 
    else
        myUrl = 'https://data.cityofchicago.org/resource/6q3z-9maq.json' 
    
    $.ajax({
        url: myUrl

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

                // table's header
                const $table = $('<table>')
                const $thead = $('<thead>')
                $table.append($thead)
                const $row_title = $('<tr>')
                $thead.append($row_title)
                const $col1 = $('<th>')
                $col1.text('Facility Name')
                $row_title.append($col1)
                const $col2 = $('<th>')
                $col2.text('Address')
                $row_title.append($col2)
                const $col3 = $('<th>')
                $col3.text('Phone Number')
                $row_title.append($col3)
                const $col4 = $('<th>')
                $col4.text('Action')
                $row_title.append($col4)

                // table's body
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

                        $modal.css('display', 'block')
                    })
                    $c4.append($btn)
                    $row.append($c4)

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
// <script>
// // Get the modal
// var modal = document.getElementById("myModal");


// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // // When the user clicks the button, open the modal 
// // btn.onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
// </script>

  