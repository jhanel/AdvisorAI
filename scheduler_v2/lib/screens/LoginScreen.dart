import 'package:flutter/material.dart';
import 'package:scheduler_v2/utils/getAPI.dart';
import 'dart:convert';
//import 'package:schedular_app/utils/getUserSchedule.dart';

class GlobalData{

  static String userID = '';
  static String firstname = '';
  static String lastname = '';
  static String email = '';
  static String password = '';
  //static bool _showSchedule = false;
}

class LoginScreen extends StatefulWidget {
  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
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
  String loginEmail = '', loginPassword = '';
  
  changeText() {

    //newMessageText = '$loginEmail$loginPassword';
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
                    labelText: 'Email',
                    hintText: 'Enter Your Email'
                  ),
                  onChanged: (text){
                    loginEmail = text;
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
                    hintText: 'Enter Your Password',
                  ),
                  onChanged: (text){
                    loginPassword = text;
                  },
                ),
              ),
            ]
          ),
          
          Row(
            children: <Widget>[
              ElevatedButton(
                child: Text('Login',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: () async
                {
                  //changeText();
                  newMessageText = "";
                  String payload = '{"email":"' + loginEmail.trim() + '","password":"' + loginPassword.trim() + '"}';
                  var userID = "";
                  var jsonObject;
                  //Map<String, dynamic> jsonObject;
                  try{

                    String url = 'http://studentadvisorai.xyz:5002/api/schedule/login';
                    //String url = 'http://10.127.192.226:5002/api/schedule/login';
                    String ret = await studentAdvisorData.getJson(url, payload);
                    //print(ret);
                    //jsonObject = json.decoder(ret);
                    jsonObject = json.decode(ret);
                    print(jsonObject);

                    print(jsonObject["userID"]);
                    userID = jsonObject["userID"]; //this line the problem (api endpoint not returning a user ID)
                    //userID = int.parse(jsonObject["userID"], radix: 16); //changes the userID to decimal

                    //print("got to this point");
                  }catch (e){

                    //newMessageText = e.message;
                    newMessageText = e.toString();
                    changeText();
                    return;
                  }
                  
                  //changeText();
                  if( userID == "" )
                  {
                    newMessageText = "Incorrect Login/Password";
                    changeText();
                  }
                  else
                  {
                    GlobalData.userID = userID;
                    GlobalData.firstname = jsonObject["firstname"];
                    GlobalData.lastname = jsonObject["lastname"];
                    GlobalData.email = loginEmail;
                    GlobalData.password = loginPassword;
                    //GlobalData._showSchedule = true;
                    Navigator.pushNamed(context, '/dashboard');
                  }
                  
                  // //placeholder for now (change back to userID when fixed)
                  // if(jsonObject == null){
                  //   newMessageText = "Incorrect Login/Password";
                  //   changeText();
                  // }else{

                  //   GlobalData.userID = userID;
                  //   GlobalData.email = loginEmail;
                  //   GlobalData.password = loginPassword;
                  //   Navigator.pushNamed(context, '/dashboard');
                  // }
                  
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
                child: Text('No account? Register!',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: ()
                {
                  Navigator.pushNamed(context, '/register');
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
                child: Text('Forgot Password?',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: ()
                {
                  Navigator.pushNamed(context, '/forgotPassword');
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