<html>
 <head>
  <title>Dashboard</title>
  <meta name="viewport" content="width=210, initial-scale=1">
 </head>
 <body style="width:210px;height:450px">
  <link href="https://tsbt-srpvsp.github.io/tsbt-admin/TinyDash/tinydash.css" rel="stylesheet">
  <script src="https://tsbt-srpvsp.github.io/tsbt-admin/TinyDash/tinydash.js"></script>
  <script src="https://tsbt-srpvsp.github.io/tsbt-admin/tsbt.js"></script>  
  <script>
  // Called when we get a line of data - updates the light color
  function onLine(line) {
    try {
      var j = JSON.parse(line);
      console.log("Received JSON: ",j);
      document.body.appendChild(par.appendChild(text))
      elements.light.setValue(j.light*100);
    } catch(e) {
      console.log("Received: ",line);
    }
  }
  var connection;
  function connectDevice() {
    tsbt.connect(function(c) {
      if (!c) {
        alert("Couldn't connect!");
        return;
      }
      connection = c;
      // remove modal window
      elements.modal.remove();
      // Handle the data we get back, and call 'onLine'
      // whenever we get a line
      var buf = "";
      connection.on("data", function(d) {
        buf += d;
        var i = buf.indexOf("\n");
        while (i>=0) {
          onLine(buf.substr(0,i));
          buf = buf.substr(i+1);
          i = buf.indexOf("\n");
        }
      });
    }) 
  }
  // Set up the controls we see on the screen    
  var elements = {
    heading : TD.label({x:10,y:10,width:190,height:50,label:"My Dashboard"}),
    light : TD.gauge({x:10,y:70,width:190,height:220,label:"Light",value:0,min:0,max:100}),
    modal: TD.modal({x:10,y:10,width:190,height:430,label:"Click to connect",onchange:connectDevice})
  }
  for (var i in elements)
    document.body.appendChild(elements[i]);
  </script>
   <script>
    var par = document.createElement("p"); //creating the paragraph element 
    var text = document.createTextNode("Text Added to the body"); //creating the text node
    document.body.appendChild(par.appendChild(text)); //appending the text to paragraph and appending the paragraph to the body.
  </script>
 </body>
</html>
