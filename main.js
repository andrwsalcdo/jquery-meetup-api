//Meetup api key
const apiKey = config.MY_KEY; 
//base url 
const muGroupUrl = 'https://api.meetup.com/Sarasota-JavaScript-Meetup'; 
//url for getGroup()
const groupUrl = muGroupUrl + "?&sign=true&photo-host=public&key=" + apiKey; 
//url for getMembers()
const membersUrl = muGroupUrl + "/members?&sign=true&photo-host=public&only=name,photo&key=" + apiKey; 



$(function() {
    getGroup(); 
    getMembers(); 
});

function getGroup() {
    $.ajax({
        type: "GET", 
        url: groupUrl, 
        jsonp: 'callback', 
        dataType: 'jsonp', 
    }).done((res) => {
        let desc = res.data.description; 
        $('.group-info').html(desc); 
    })
}


function getMembers() {
     
    const imgError = 'http://via.placeholder.com/150x200?text=No+Image'; 
    
    $.ajax({ 
        type:"GET", 
        url: membersUrl, 
        jsonp: 'callback', 
        dataType: 'jsonp',
        success: (res) => {
            console.log(res.data);
            let output = ''; 
            $.each(res.data, (index, person) => {   
                output += `    
                    <div class="col-sm-4 members text-center">
                            <h5>${ person.name }</h5>
                            <img src=${ (Object.keys(person).length > 1) ? person.photo.photo_link : imgError } >  
                    </div>     
                `; 
            })  
            $('#members').html(output);      
        }         
    });          
             
}
              




