import 'package:flutter/material.dart';
import 'package:scheduler_v2/utils/getAPI.dart';
import 'dart:convert';

class GlobalData{

  static String userID = '';
  static String firstname = '';
  static String lastname = '';
  static String email = '';
  static String password = '';
}

class RegisterScreen extends StatefulWidget {
  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.amber[100],
      body: MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {
  @override
  void initState() {
    super.initState();
  }

  String message = "This is a message", newMessageText = '';
  String registerFirstName = '', registerLastName = '', 
    registerEmail = '', registerPassword = '';
  
  changeText() {

    //newMessageText = '$registerFirstName$registerLastName$registerEmail$registerPassword';
    setState(() {
      message = newMessageText;
    });
  }
  
  @override
  Widget build(BuildContext context) {

      return Container(
      width: 500,
      child:
      Column(
        mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
        crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal
        children: <Widget>[
          Row(
            children: <Widget>[
              Container(
                width: 200,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'First Name',
                    hintText: 'Enter Your First Name'
                  ),
                  onChanged: (text){
                    registerFirstName = text;
                  },
                ),
              ),
            ]
          ),

          Row(
            children: <Widget>[
              Container(
                width: 200,
                child:
                TextField (
                  //obscureText: true,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Last Name',
                    hintText: 'Enter Your Last Name'
                  ),
                  onChanged: (text){
                    registerLastName = text;
                  },
                ),
              ),
            ]
          ),
          
          Row(
            children: <Widget>[
              Container(
                width: 200,
                child:
                TextField (
                  //obscureText: true,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Email',
                    hintText: 'Enter Your Email'
                  ),
                  onChanged: (text){
                    registerEmail = text;
                  },
                ),
              ),
            ]
          ),

          Row(
            children: <Widget>[
              Container(
                width: 200,
                child:
                TextField (
                  obscureText: true,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Password',
                    hintText: 'Enter Your Password'
                  ),
                  onChanged: (text){
                    registerPassword = text;
                  },
                ),
              ),
            ]
          ),

          Row(
            children: <Widget>[
              ElevatedButton(
                child: Text('Register',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: () async
                {
                  //changeText();
                  newMessageText = "";
                  String payload = '{"firstname":"' + registerFirstName.trim() + '","lastname":"' + registerLastName.trim() 
                  + '","email":"' + registerEmail.trim() + '","password":"' + registerPassword.trim() +'"}';
                  var userID = "";
                  var jsonObject;
                  //Map<String, dynamic> jsonObject;
                  try{

                    String url = 'http://studentadvisorai.xyz:5002/api/schedule/register';
                    //String url = 'http://10.127.192.226:5002/api/schedule/register';
                    String ret = await studentAdvisorData.getJson(url, payload);
                    //print(loginEmail.trim() + " " + );
                    //print(ret);
                    //jsonObject = json.decoder(ret);
                    jsonObject = json.decode(ret);
                    
                    //print(jsonObject["userID"]);
                    //userID = int.parse(jsonObject["userID"], radix: 16); //this line the problem
                    userID = (jsonObject["userID"]);
                    //print("got to this point");
                  }catch (e){

                    //newMessageText = e.message;
                    newMessageText = "Error calling register";
                    changeText();
                    return;
                  }
                  
                  if( userID == "" )
                  {
                    newMessageText = "Incorrect Login/Password";
                    changeText();
                  }
                  else
                  {
                    
                    GlobalData.userID = userID;
                    GlobalData.firstname = registerFirstName;
                    GlobalData.lastname = registerLastName;
                    GlobalData.email = registerEmail;
                    GlobalData.password = registerPassword;
                    newMessageText = "User Successfully Registered";
                    changeText();
                    Navigator.pushNamed(context, '/login');
                  }
                  

                  // var emailStat = ''; 
                  // jsonObject = '';
                  // payload = '{"emailToken":"' + (GlobalData.email).trim() + '"}';
                  // try{
                  //   String url = 'http://studentadvisorai.xyz:5002/api/schedule/verifyemail';
                  //   //String url = 'http://10.127.192.226:5002/api/schedule/register';
                  //   String ret = await studentAdvisorData.getJson(url, payload);
                  //   print(ret);

                  //   jsonObject = json.decode(ret);
                  //   //print(jsonObject);

                  //   //emailStat = (jsonObject["status"]);
                  //   //print(emailStat);
                  // }catch(e){

                  //   newMessageText = "Error sending verification email";
                  //   changeText();
                  //   return;
                  // }

                  // if( emailStat == "Failed" || emailStat == "")
                  // {
                  //   newMessageText = "Couldn't send verification email";
                  //   changeText();
                  // }
                  // else
                  // {
                  //   newMessageText = "Couldn't send verification email";
                  //   changeText() ;
                  //   Navigator.pushNamed(context, '/login');
                  // }

                  // //Navigator.pushNamed(context, '/login');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.lightGreen,
                ),
              ),

            ],
          ),
          
          Row(
            children: <Widget>[
              ElevatedButton(
                child: Text('Already a User? Login!',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: ()
                {
                  Navigator.pushNamed(context, '/login');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.lightGreen,
                ),
              ),
            ],
          ),

          Row(
            children: <Widget>[
              Text('$message',style: TextStyle(fontSize: 14 ,color:Colors.black)),
            ],
          ),
        ],
      ),

    );
  }
}
