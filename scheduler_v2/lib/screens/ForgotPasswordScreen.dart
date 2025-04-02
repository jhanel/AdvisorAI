import 'package:flutter/material.dart';
import 'package:scheduler_v2/utils/getAPI.dart';
import 'dart:convert';

class ForgotPassword extends StatefulWidget {
  @override
  _ForgotPassword createState() => _ForgotPassword();
}

class _ForgotPassword extends State<ForgotPassword> {
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
  
  //stores the message for either conformation or failure
  String message = '';
  //stores the email the user inputted.
  String loginEmail = '';

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
              ElevatedButton(
                child: Text('Send Password Reset Email',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: () async
                {
                  //Navigator.pushNamed(context, '/forgotPassword');
                  var jsonObject = '';
                  String payload = '{"email": "'+ loginEmail.trim() +'"}';

                  try{
                    String url = 'http://studentadvisorai.xyz:5002/api/schedule/passwordreset';
                    //String url = 'http://10.127.192.226:5002/api/schedule/login';
                    String ret = await studentAdvisorData.getJson(url, payload);

                    jsonObject = json.decode(ret);
                    message = jsonObject[0];
                    
                  }catch(e){
                    
                    message = jsonObject[0];
                    print(e.toString());
                  }
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
                child: Text('Return to Login',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: () async
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