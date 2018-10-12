	var allPeople;

	$.ajax({
		url:'js/data.json',
		dataType: 'json',
		method: 'get', 
		success: function(data){
			allPeople = data;
			showAllPeople();  
			displayDirectFriends();
			displayFriendsOfFreinds();
			displaySugestedFriends();


		},
		error: function(data){
			console.log('error', data);
		}
	});

	function showAllPeople() {
		for(var i = 0; i < allPeople.length; i++) {
			var PeopleId = allPeople[i].id;
			var PeopleName = allPeople[i].firstName;
			var PeopleSurname = allPeople[i].surname;
			if(allPeople[i].age === null){
				allPeople[i].age = '??';
			}
			$('.people').append('<li id="' 
				+ PeopleId + '"><a href="javascript:void(0)">' 
				+ PeopleName + ' ' 
				+ PeopleSurname + ', ' + 
				allPeople[i].age 
				+ '</a></li>');
		}

}

//PRIKAZUJE PRIJATELJE
		function displayDirectFriends(){
			$('.people li').click(function(){

				var friendsArr = [];
				var friendsById = [];
				friendsArr = (allPeople[this.id-1].friends);
				for(i = 0; i < friendsArr.length; i++){
					for(j = 0; j < allPeople.length; j++){
						if(friendsArr[i] === allPeople[j].id){
							friendsById.push(allPeople[j]);
						}

				// 	$('.mutualFriends').append('<li id="' 
				// + friendsById[i].id + '"><a href="javascript:void(0)">' 
				// + friendsById[i].firstName + ' ' 
				// + friendsById[i].surname + ', ' + 
				// friendsById[i].age 
				// + '</a></li>');				
					}
									}		
				console.log("OVO SU PRIJATELJI");	
				 console.log(friendsById);

			})

            
		}

//PRIKAZUJE PRIJATELJE PRIJATELJA
function displayFriendsOfFreinds(){
     	$('.people li').click(function(){
     	var noviId = Number(this.id)
		var friendsArr = [];
		var friendsByFriends = [];
		friendsArr = (allPeople[this.id-1].friends);
		for(i=0;i<friendsArr.length;i++){
			for(j=0;j<allPeople.length;j++){
				if (friendsArr[i]===allPeople[j].id) {
					friendsByFriends.push(allPeople[j].friends)
				}
			}
		}
		var noviNiz = [].concat(...friendsByFriends);
		
     

		var updatedFriendsByFriends = noviNiz.filter((friend)=>friend !==noviId);
		// console.log(updatedFriendsByFriends);
	    var uniqueFriendsByFriends = [...new Set(updatedFriendsByFriends)];
	    // console.log(uniqueFriendsByFriends);

       var noviNiz1 = [];
       for(var i = 0; i<allPeople.length;i++){
       	for(j=0;j<uniqueFriendsByFriends.length;j++){
       		if(allPeople[i].id === uniqueFriendsByFriends[j]){
       			noviNiz1.push(allPeople[i]);
       		}
       	}
       }
         console.log("OVO SU PRIJATELJI PRIJATELJA");       
	     console.log(noviNiz1);   
	     //Prijatelji prijatelja 
	})
}
 function displaySugestedFriends(){
 	$('.people li').click(function(){
 		var friendsArr = [];
 		var friendsById = [];
 		friendsArr = allPeople[this.id-1].friends;
 		for(i=0;i<friendsArr.length;i++){
 			for(j=0;j<allPeople.length;j++){
 				if(friendsArr[i]===allPeople[j].id){
 					friendsById.push(allPeople[j].friends)
 				}
 			}
 		}
          var noviNiz = [].concat(...friendsById);
          var noviNiz1 = [];

       
 	  
 	  for(var i =0; i<allPeople.length;i++){
 	  	var friends = allPeople[i].friends;
 	  	if(friends.includes(noviNiz)){
 	  		noviNiz1.push(allPeople[i]);

 	  	}

 	  }
 	  console.log('PREDLOZENI PRIJATELJI');
 	console.log(noviNiz1);
 	})

 }












