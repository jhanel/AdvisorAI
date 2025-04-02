//import 'package:flutter/material.dart';
import 'package:scheduler_v2/screens/LoginScreen.dart';
import 'package:scheduler_v2/utils/getAPI.dart';
import 'dart:convert';

class getSeesionCourses{

  //input
  //static String userID = GlobalData.userID;

  //outputs
  //list of courses names and courses
  static List<String> courseNames =  List<String>.filled(5, '', growable: true);
  static List<String> courseDiffulties =  List<String>.filled(5, '', growable: true);
  //List of exams and time.
  static List<String> examNames = List<String>.filled(16, '', growable: true);
  static List<String> examDates = List<String>.filled(16, '', growable: true);

  static void getCourses() async {

    //var courseID = '';
    Map<String, dynamic> tempJsonObjectCourseID;
    var jsonObjectCourseID;

    try{
      
      String url = 'http://studentadvisorai.xyz:5002/api/getcourseid/' + (GlobalData.userID).trim();
      var ret = await studentAdvisorData.getJsonGets(url);
      //print(ret);
      jsonObjectCourseID = json.decode(ret);
      //print(jsonObjectCourseID);
      
      for(int i = 0; i < jsonObjectCourseID.length; i++){

        tempJsonObjectCourseID = jsonObjectCourseID[i];
        
        courseNames[i] = tempJsonObjectCourseID["coursetitle"];
        courseDiffulties[i] = tempJsonObjectCourseID["difficulty"];
        print(courseNames[i] + ' ' + courseDiffulties[i]);
      }
    }catch(e){

      print(e.toString());
    }
  }

  static void getExams() async {

    //get the exam names and dates
    Map<String, dynamic> tempJsonObjectExamID;
    var jsonObjectExamID;
    //var fullExamTime = delExamDate + 'T' + delExamTime + '.000Z';

    try{
      
      String url = 'http://studentadvisorai.xyz:5002/api/getexamid/' + (GlobalData.userID).trim();
      var ret = await studentAdvisorData.getJsonGets(url);
      //print(ret);
      jsonObjectExamID = json.decode(ret);
      //print(jsonObjectExamID);
      
      for(int i = 0; i < jsonObjectExamID.length; i++){

        tempJsonObjectExamID = jsonObjectExamID[i];
        print(tempJsonObjectExamID);
        
        // examNames.add(tempJsonObjectExamID["examname"]);
        // examDates.add(tempJsonObjectExamID["examdate"]);
        // examNames[i] = tempJsonObjectExamID["examname"];
        // examDates[i] = tempJsonObjectExamID["examdate"];
        //print(examNames[i] + ' ' + examDates[i]);
        //print(examNames[i]);
        
      }
      
    }catch(e){

      print(e.toString());
    }
  }
}