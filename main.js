//Meetup api key
const apiKey = config.MY_KEY; 
//base url 
const muGroupUrl = 'https://api.meetup.com/Sarasota-JavaScript-Meetup'; 
//url for getAllAttendess()
const membersUrl = muGroupUrl + "/members?&sign=true&photo-host=public&page=9&key=" + apiKey; 
//url for getGroup()
const groupUrl = muGroupUrl + "?&sign=true&photo-host=public&key=" + apiKey; 


$(function() {
    getAllAttendees(); 
    getGroup(); 
});

function getGroup() {
    $.ajax({
        type: "GET", 
        url: groupUrl, 
        jsonp: 'callback', 
        dataType: 'jsonp', 
    }).done((res) => {
        console.log(res.data);
        let desc = res.data.description; 
        $('.group-info').html(desc); 
    })
}

function getAllAttendees() {
    $.ajax({ 
        type:"GET", 
        url: membersUrl, 
        jsonp: 'callback', 
        dataType: 'jsonp',
    }).done((res) => {
            console.log(membersUrl);    
            let people = res.data;
            console.log(people); 
            let output = ''; 
            $.each(people, (index, person) => {
                output += `
                      <div class="col-sm-3 col-md-4 members text-center">
                        <div>
                            <img src="${person.photo.photo_link}" >
                            <h5>${person.name}</h5>
                        </div>
                      </div>
                `;
            })
              //push all output to DOM in one go. 
            $('#members').html(output);
    });
}
