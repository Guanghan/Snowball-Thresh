

function getContent(stockID)
{
	var xmlhttp = new XMLHttpRequest() , method = 'GET' , url = 'http://xueqiu.com/S/' + stockID;
	xmlhttp.open( method , url , true );
	xmlhttp.onreadystatechange = function () {
	    if ( 4 != xmlhttp.readyState ) { // DONE: The operation is complete
	        return;
	    }
	    if ( 200 != xmlhttp.status ) {  // Request is Successful
	        return;
	    }
	    //console.log( xmlhttp.responseText );
        //console.log("Oops, again!");

        // Info #1
	    var html = xmlhttp.responseText;
	    var data_current = html.substring(html.search('data-current') + 13, html.search('data-current') + 19);
	    console.log(data_current);

	    // Info #3
	    var quote_percentage = html.substring(html.search('quote-percentage') + 31 + 1, html.search('quote-percentage') + 36);
	    console.log(quote_percentage);

        // Info #2
	    var temp= html.substring(html.search('data-current') + 20, html.search('data-current') + 48);
	    if(temp.search('stockDown') != -1)  {
	    	var data_current_b = temp.substring(temp.search('stock')+ 11, temp.search('stock') + 18);
	    	console.log(data_current_b);

            var data_current_num = parseFloat(quote_percentage);// + "<br>";
            console.log(data_current_num);

	    	if(data_current_num >= 0.5) 
	    	{

		    // Rich Notifications for drop
	        chrome.notifications.create(
			 'id1',{   
			     type: 'basic',
			     iconUrl: 'icon.png',
			     title: 'Snowball Price',
			     message: 'Oops, Your stock price has dropped out limit!',			    
			     buttons: [{ title: 'Stock Price: ' + data_current_b,
			                 iconUrl: 'current.png'},
			               { title: 'Quote_percentage: ' + quote_percentage,
			                 iconUrl: 'drop.png'}],
			     priority: 0},
			 function() { /* Error checking goes here */}
			 );

	         }
	    }
	    else if(temp.search('stockUp') != -1) 
	    {
	        var data_current_b = temp.substring(temp.search('stock')+ 9, temp.search('stock') + 16);
	    	console.log(data_current_b);

	    	var data_current_num = parseFloat(quote_percentage);// + "<br>";
            console.log(data_current_num);

	    	if(data_current_num >= 0.5) 
	    	{

	    	// Rich Notifications for raise
	        chrome.notifications.create(
			 'id2',{   
			     type: 'basic',
			     iconUrl: 'icon.png',
			     title: 'Snowball Price',
			     message: 'Hi, Your stock price has met your interest!',
			     buttons: [{ title: 'Stock Price: ' + data_current_b,
			                 iconUrl: 'current.png'},
			               { title: 'Quote_percentage: ' + quote_percentage,
			                 iconUrl: 'raise.png'}],
			     priority: 0},
			 function() { /* Error checking goes here */}
			 );

	        }
	    }

	};
	xmlhttp.send();

}

setInterval(function(){
	getContent('01070');
}, 5000);
