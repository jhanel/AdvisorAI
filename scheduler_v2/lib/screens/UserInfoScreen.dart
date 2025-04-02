import 'package:flutter/material.dart';
import 'package:scheduler_v2/screens/LoginScreen.dart';
import 'package:scheduler_v2/utils/getAPI.dart';
import 'dart:convert';


class scheduleGlobalData extends GlobalData{

  static List<String> daysList = List<String>.filled(7, '', growable: false);
  static List<String> startTimeList = List<String>.filled(7, '', growable: false);
  static List<String> endTimeList = List<String>.filled(7, '', growable: false);
  static String tempUserID = GlobalData.userID;
  static String availabilityID = '';
}

class UserInfoScreen extends StatefulWidget {
  @override
  _UserInfoScreen createState() => _UserInfoScreen();
}

class _UserInfoScreen extends State<UserInfoScreen> {
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

  //Widget input1 = getAvailability();
  String message = "This is a message", newMessageText = '';
  List<String> scheduleDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  List<String> scheduleStartTime =  List<String>.filled(7, '', growable: false); //holds 7 elemetns for 7 days of the week.
  List<String> scheduleEndTime =  List<String>.filled(7, '', growable: false);

  changeText() {
    //newMessageText = '$loginEmail$loginPassword';
    setState(() {
      message = newMessageText;
    });
  }
  @override
  Widget build(BuildContext context) { 
    //int _selectedItem = 0;

     return SingleChildScrollView(
      //width: 800,
      child:
      Column(
        mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
        crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal
        children: <Widget>[

          //Title for the entering the availability.
          Row(
            children: [
              Container(
                child: Text(
                  'Enter Availablity:',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.brown,
                  ),
                ),
              ),
            ]
          ),

         //Availabilty for Sunday
          Row(
            children: <Widget>[
              //Day
              Container(
                width: 100,
                child: Text(
                  'Sunday:',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
              
              //Start time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Start Time',
                    hintText: 'ex 15:00'
                  ),
                  onChanged: (text){
                    scheduleStartTime[0] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),

              //End time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'End Time',
                    hintText: 'ex 17:00'
                  ),
                  onChanged: (text){
                    scheduleEndTime[0] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),
            ]
          ),

          //Availabilty for Monday
          Row(
            children: <Widget>[
              //Day
              Container(
                width: 100,
                child: Text(
                  'Monday:',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
              
              //Start time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Start Time',
                    hintText: 'ex 15:00'
                  ),
                  onChanged: (text){
                    scheduleStartTime[1] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),

              //End time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'End Time',
                    hintText: 'ex 17:00'
                  ),
                  onChanged: (text){
                    scheduleEndTime[1] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),
            ]
          ),
          
          //Availabilty for Tuesaday
          Row(
            children: <Widget>[
              //Day
              Container(
                width: 100,
                child: Text(
                  'Tuesday:',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
              
              //Start time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Start Time',
                    hintText: 'ex 15:00'
                  ),
                  onChanged: (text){
                    scheduleStartTime[2] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),

              //End time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'End Time',
                    hintText: 'ex 17:00'
                  ),
                  onChanged: (text){
                    scheduleEndTime[2] = text;
                    //print(scheduleDays[0]);
                  },                 
                ),
              ),
            ]
          ),

          //Availabilty for Wednesday
          Row(
            children: <Widget>[
              //Day
              Container(
                width: 100,
                child: Text(
                  'Wednesday:',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
              
              //Start time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Start Time',
                    hintText: 'ex 15:00'
                  ),
                  onChanged: (text){
                    scheduleStartTime[3] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),

              //End time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'End Time',
                    hintText: 'ex 17:00'
                  ),
                  onChanged: (text){
                    scheduleEndTime[3] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),
            ]
          ),

          //Availabilty for Thursday
          Row(
            children: <Widget>[
              //Day
              Container(
                width: 100,
                child: Text(
                  'Thursday:',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
              
              //Start time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Start Time',
                    hintText: 'ex 15:00'
                  ),
                  onChanged: (text){
                    scheduleStartTime[4] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),

              //End time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'End Time',
                    hintText: 'ex 17:00'
                  ),
                  onChanged: (text){
                    scheduleEndTime[4] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),
            ]
          ),

          //Availabilty for Friday
          Row(
            children: <Widget>[
              //Day
              Container(
                width: 100,
                child: Text(
                  'Friday:',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
              
              //Start time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Start Time',
                    hintText: 'ex 15:00'
                  ),
                  onChanged: (text){
                    scheduleStartTime[5] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),

              //End time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'End Time',
                    hintText: 'ex 17:00'
                  ),
                  onChanged: (text){
                    scheduleEndTime[5] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),
            ]
          ),

         //Availabilty for Saturday
          Row(
            children: <Widget>[
              //Day
              Container(
                width: 100,
                child: Text(
                  'Saturday:',
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.bold,
                    color: Colors.black,
                  ),
                ),
              ),
              
              //Start time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Start Time',
                    hintText: 'ex 15:00'
                  ),
                  onChanged: (text){
                    scheduleStartTime[6] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),

              //End time
              Container(
                width: 125,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'End Time',
                    hintText: 'ex 17:00'
                  ),
                  onChanged: (text){
                    scheduleEndTime[6] = text;
                    //print(scheduleDays[0]);
                  },
                ),
              ),
            ]
          ),
  
          Row(
            children: <Widget>[
              ElevatedButton(
                child: Text('Save',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: () async
                {
                  newMessageText = '';
                  //print(scheduleGlobalData.tempUserID);

                  //for formatting the payload
                  String payload = '{"userId":"' + scheduleGlobalData.tempUserID.trim() + '", "availability": {';
                  for(int i = 0; i < 7; i++){
                    payload += '"' + scheduleDays[i].trim() + '":';
                    if (scheduleStartTime[i] != '' && scheduleEndTime[i] != ''){
                      //payload += '"' + scheduleDays[i].trim() + '":';
                      payload += '[{ "start_time": "' + scheduleStartTime[i].trim() + '",';
                      payload += '"end_time": "' + scheduleEndTime[i].trim() + '" }]';

                    }else{
                      payload += '[]';
                    }
                    
                    //used to add comman to payload if there are succeeding available days
                    if(i < 6){
                      payload += ',';
                    }
                  }
                  payload += ' } }';
                  //print(payload);

                  var availabilityID = '';
                  var jsonObject;
                  Map<String, dynamic> tempJsonObject;
                  try{
                    String url = 'http://studentadvisorai.xyz:5002/api/availability/update-availability';
                    //String url = 'http://10.127.192.226:5002/api/schedule/login';
                    String ret = await studentAdvisorData.getJson(url, payload);

                    jsonObject = json.decode(ret);
                    print(jsonObject);
                    
                    tempJsonObject = jsonObject['availability'];
                    //print(jsonObject['availability']);

                    //print(jsonObject['availability'].keys.toString());
                    availabilityID = tempJsonObject['_id']; //this line the problem (api endpoint not returning a user ID)
                    //print(availabilityID);
                  }catch(e){

                    //newMessageText = e.toString();
                    print(e.toString());
                    changeText();
                    return;
                  }

                  if(availabilityID == ''){

                    newMessageText = "Cannot make availability";
                    changeText();
                  }else{

                    scheduleGlobalData.availabilityID = availabilityID;
                    for(int i = 0; i < 7; i++){

                      if(scheduleStartTime[i] != '' && scheduleEndTime[i] != ''){
                        
                        scheduleGlobalData.daysList[i] = scheduleDays[i];
                        scheduleGlobalData.startTimeList[i] = scheduleStartTime[i];
                        scheduleGlobalData.endTimeList[i] = scheduleEndTime[i];

                        // print(scheduleGlobalData.daysList[i]);
                        // print(scheduleGlobalData.startTimeList[i]);
                        // print(scheduleGlobalData.endTimeList[i]);
                      }
                    }
                    newMessageText = "Availability submission successful";
                    changeText();
                  }

                  // changeText(); //chnages message under the dave button
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