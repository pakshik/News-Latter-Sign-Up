const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
const PORT = 3000 || process.env.PORT; 

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));



app.post('/' , (req ,res)=>{

    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;

    console.log(firstname)
    console.log(lastname)
    console.log(email)




    const data ={
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname
                }
            }
        ]
    };


    const jsonData = JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/9dd06f4381";


    const options={
        method:"POST",
        auth:"pakshik:a050b18566860c8db0e8e81f7d4ad5db-us1"
    }
    const request = https.request(url , options , (response)=>{
        console.log(response.statusCode);
         if(response.statusCode == 200 ){
           res.sendFile(__dirname +'/success.html');
         }else{
           res.sendFile(__dirname + '/failure.html');
         }


         response.on('data' , (data)=>{
             console.log(JSON.parse(data))
         })
    })

    // request.write(jsonData);
    request.end();




})

app.post('/failure' ,(req ,res)=>{
    res.redirect("/");
} )
app.get('/', (req ,res) => {
    res.sendFile(__dirname+"/signup.html")
})
app.listen(PORT , ()=>{
    console.log("Port Started on server http://Localhost:3000 ");
});












/// api key : a050b18566860c8db0e8e81f7d4ad5db-us1


//// unique id : 9dd06f4381