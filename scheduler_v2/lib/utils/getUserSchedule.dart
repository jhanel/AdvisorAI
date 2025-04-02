import 'package:scheduler_v2/screens/LoginScreen.dart';
import 'package:scheduler_v2/utils/getAPI.dart';
import 'dart:convert';

//schedule doesn't inlcude the exams
class getUserSchedule{

  //input 
  static String userID = GlobalData.userID;

  //output
  //list of courses names, start time, and end time
  //static List<String> scheduledDays = List<String>.filled(7, '', growable: false);

  //static List<String> courseNames =  List<String>.filled(5, '', growable: true);

  static Map<String, dynamic>? daysTimesCourses = null;

  //initalizes daysTimesCourses
  static void getSchedule() async{
    //List<String> days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    //Map<String, dynamic> daysTimesCourses;

    //var courseID = '';
    //Map<String, dynamic> tempJsonObject;
    var jsonObject;
    var tempJsonObject;
    //var busyDays;

    try{
      //print(GlobalData.userID.trim());
      String url = 'http://studentadvisorai.xyz:5002/api/studySchedule/get-AIschedule/' + GlobalData.userID.trim();
      var ret = await studentAdvisorData.getJsonGets(url);
      //print(ret);
      jsonObject = json.decode(ret);
      //print(jsonObject);
      
      tempJsonObject = jsonObject["generatedSchedule"];
      //print(tempJsonObject);

    }catch(e){

      print(e.toString());
    }

    daysTimesCourses = tempJsonObject;
    //print(daysTimesCourses);
  }

  //takes: The name of the day
  //returns: An array of the study times and respective courses.
  static List<dynamic> getDailyEvents(String tempDay) {

    //print(GlobalData.userID);
    getSchedule(); //calls the get schedule
    //List<String> days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    
    //var courseID = '';
    //Map<String, dynamic> tempJsonObject;
    List<dynamic> jsonObject;
    
    jsonObject = daysTimesCourses?[tempDay];
    
    //return jsonObject;
    //print(jsonObject);

    return jsonObject;
  }

  static void onChangeUserID(){

    userID = GlobalData.userID;
  }
}