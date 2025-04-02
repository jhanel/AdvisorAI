import 'package:flutter/material.dart';
import 'package:scheduler_v2/screens/LoginScreen.dart';
import 'package:scheduler_v2/utils/getAPI.dart';
import 'dart:convert';

// class globalCalenderData {

//   static Map<String, dynamic>? calenderExport;
//   static bool _hasUserID = false;
// }

class CalenderScreen extends StatefulWidget {
  @override
  _CalenderScreen createState() => _CalenderScreen();
}

class _CalenderScreen extends State<CalenderScreen> {
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

  var message = 'Outcome Message', newMessage = '';
  changeText() {

    //newMessageText = '$loginEmail$loginPassword';
    setState(() {
      message = newMessage;
    });
  }
  //var CalenderData = '';

  // getUserSchedule? tempSchedule;
  // tempSchedule.getSchedule;

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
              ElevatedButton(
                child: Text('Logout',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: ()
                {
                  Navigator.pushNamed(context, '/login');
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.lightGreen,
                ),
              ),
            ]
          ),

          Row(
            children: <Widget>[
              ElevatedButton(
                child: Text('Generate',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: () async
                {
                  //Navigator.pushNamed(context, '/login');
                  //var userID = '';
                  Map<String, dynamic> jsonObject;
                  String payload =  '{"userId": "'+ GlobalData.userID.trim() +'"}';

                  try{
                    String url = 'http://studentadvisorai.xyz:5002/api/studySchedule/generate-schedule';
                    String ret = await studentAdvisorData.getJson(url, payload);

                    //print(ret);

                    jsonObject = json.decode(ret);

                    //globalCalenderData.calenderExport = jsonObject["schedule"];
                    //print(globalCalenderData.calenderExport); //for trying later
                    //Navigator.pushNamed(context, '/todoList');
                    //message = jsonObject['message'];

                    // getSeesionCourses.getCourses();
                    // getSeesionCourses.getExams();
                    //getUserSchedule.getSchedule();
                    //print(getUserSchedule.getDailyEvents('Thursday'));
                    //getUserSchedule.getDailyEvents('Tuesday');
                    newMessage = 'The schedule was made successfully';
                    changeText();
                    //print(jsonObject);
                  }catch(e){
                    
                    //message = jsonObject[0];
                    print(e.toString());
                  }
                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.lightGreen,
                ),
              ),
            ]
          ),

          // Row(
          //   children: <Widget>[
          //     ElevatedButton(
          //       child: Text('Show Schedule',style: TextStyle(fontSize: 14 ,color:Colors.black)),
          //       onPressed: ()
          //       {
          //         //print(GlobalData.userID);
          //         Navigator.push(
          //           context, 
          //           MaterialPageRoute(builder: (context) => ToDoListScreen()),
          //         ).then((_) => setState(() {}));
          //       },
          //     ),
          //   ]
          // ),

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