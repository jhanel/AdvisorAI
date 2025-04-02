import 'package:flutter/material.dart';
import 'package:scheduler_v2/screens/LoginScreen.dart';
import 'package:scheduler_v2/utils/getAPI.dart';
import 'dart:convert';
//import 'package:http/http.dart' as http;
//import 'package:collection/collection.dart';

class classesGlobalData{

  static String courseID = '';
}

class InputClassesScreen extends StatefulWidget {
  @override
  _InputClassesScreen createState() => _InputClassesScreen();
}

class _InputClassesScreen extends State<InputClassesScreen> {
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
  String addCourseName = '';

  String dropdownvalue = 'Easy';
  //Easy Medium hard extremely hard
  var items = [
    'Easy',
    'Medium',
    'Hard',
    'Extremely Hard',
  ];

  changeText() {
    //newMessageText = '$loginEmail$loginPassword';
    setState(() {
      message = newMessageText;
    });
  }

  //deleting a course
  String delMessage = "This is a message", newdelMessageText = '';
  String delCourseName = '';
  changeDelText() {
    //newMessageText = '$loginEmail$loginPassword';
    setState(() {
      delMessage = newdelMessageText;
    });
  }

  //adding an exam
  String examAddMessage = "This is a message", newExamAddMessageText = '';
  String addExamName = '', addExamDate = '', addExamTime = '';
  changeExamAddText() {
    //newMessageText = '$loginEmail$loginPassword';
    setState(() {
      examAddMessage = newExamAddMessageText;
    });
  }

  //adding an exam
  String delExamMessage  = "This is a message", newDelExamMessage = '';
  String delExamName = '', delExamDate = '', delExamTime = '';
  changeExamDelText() {
    //newMessageText = '$loginEmail$loginPassword';
    setState(() {
      delExamMessage = newDelExamMessage;
    });
  }

  @override
  Widget build(BuildContext context) { 
    //int _selectedItem = 0;

     return SingleChildScrollView(
      child:
      Column(
        mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
        crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal
        children: <Widget>[

          //Title: Adding a class 
          Row(
            children: <Widget>[
              Container(
                child: Text(
                  'Adding Courses:',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.brown,
                  ),
                ),
              ),
            ],
          ),

          //User inputs for name of courses and different
          Row(
            children: <Widget>[
              Container(
                width: 175,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Course Name',
                    hintText: 'ex POOSD'
                  ),
                  onChanged: (text){
                    addCourseName = text;
                  },
                ),
              ),

              Container(
                width: 175,
                child:
                  DropdownButton(
                    
                    value: dropdownvalue,
                    icon: const Icon(Icons.keyboard_arrow_down),
                    items: items.map((String items) {

                      return DropdownMenuItem(

                        value: items,
                        child: Text(items),
                      );
                    }).toList(),
                    onChanged: (String? newValue) { 

                      setState(() {

                        dropdownvalue = newValue!;
                      });
                    },
                  ),
              ),

            ],
          ),

          Row(
            children: <Widget>[
              ElevatedButton(
                child: Text('Add Course',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: () async
                {

                  newMessageText = '';
                  String userID = GlobalData.userID;
                  String courseID = '';

                  String payload = '{"userID":"' + userID.trim() 
                    +'", "coursetitle": "' + addCourseName.trim() 
                    + '", "difficulty": "' + dropdownvalue.trim() + '"}';
                  
                  var jsonObject;

                  try{

                    String url = 'http://studentadvisorai.xyz:5002/api/addcourse';
                    String ret = await studentAdvisorData.getJson(url, payload);

                    jsonObject = json.decode(ret);
                    //print(jsonObject);
                  
                    courseID = jsonObject["courseID"];
                  }catch(e){

                    newMessageText = e.toString();
                    changeText();
                    return;
                  }

                  if( courseID == "" )
                  {
                    newMessageText = "Cannot add the course";
                    changeText();
                    //print(jsonObject);
                  }
                  else
                  {
                    classesGlobalData.courseID = courseID;

                    newMessageText = "Course Submission Successful";
                    changeText();
                    print(jsonObject);
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
              Text('$message',style: TextStyle(fontSize: 14 ,color:Colors.black)),
            ],
          ),

          //Title: Deleting a class 
          Row(
            children: <Widget>[
              Container(
                child: Text(
                  'Deleting Courses:',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.brown,
                  ),
                ),
              ),
            ],
          ),

          //User inputs for name of courses and diffuculty
          Row(
            children: <Widget>[
              Container(
                width: 175,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Course Name',
                    hintText: 'ex POOSD'
                  ),
                  onChanged: (text){
                    delCourseName = text;
                  },
                ),
              ),
            ],
          ),

          Row(
            children: <Widget>[
              ElevatedButton(
                child: Text('Delete course',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: () async
                {
                  //Navigator.pushNamed(context, '/register');
                  //get the course ID
                  String payload = '{"userID": "'+ GlobalData.userID.trim()
                    +'", "coursetitle": "'+ delCourseName.trim() +'"}';
                  var jsonObject;
                  //var jsonMessage;

                  print(payload);
                  try{
                    String url = 'http://studentadvisorai.xyz:5002/api/deletecourse';
                    var ret = await studentAdvisorData.getJsonDelete(url, payload);

                    jsonObject = json.decode(ret);
                    
                    print(jsonObject);

                    newdelMessageText = jsonObject["message"];
                    
                  }catch(e){

                    //print('here');
                    print(e.toString());
                  }

                  changeDelText();

                },
                style: ElevatedButton.styleFrom(
                  backgroundColor: Colors.lightGreen,
                ),
              ),
            ],
          ),

          Row(
            children: <Widget>[
              Text('$delMessage',style: TextStyle(fontSize: 14 ,color:Colors.black)),
            ],
          ),

          //Title: Adding exams
          Row(
            children: <Widget>[
              Container(
                child: Text(
                  'Add an Exam:',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.brown,
                  ),
                ),
              ),
            ],
          ),

          //User inputs for name of courses and Exam date
          Row(
            children: <Widget>[
              Container(
                width: 175,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Course Name',
                    hintText: 'ex POOSD'
                  ),
                  onChanged: (text){
                    addExamName = text;
                  },
                ),
              ),
              
              Container(
                width: 175,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Exam Date',
                    hintText: 'ex: yyyy-mm-dd'
                  ),
                  onChanged: (text){
                    addExamDate = text;
                  },
                ),
              ),
            ],
          ),

          Row(
            children: <Widget>[
              Container(
                width: 175,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Exam Time',
                    hintText: 'ex:hh:mm'
                  ),
                  onChanged: (text){
                    addExamTime = text;
                  },
                ),
              ),  
            ],          
          ),



          Row(
            children: <Widget>[
              ElevatedButton(
                child: Text('Add Exams',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: () async
                {

                  //get the courseID
                  var courseID = '';
                  Map<String, dynamic> tempJsonObjectCourseID;
                  var jsonObjectCourseID;

                  try{
                    
                    String url = 'http://studentadvisorai.xyz:5002/api/getcourseid/' + GlobalData.userID;
                    var ret = await studentAdvisorData.getJsonGets(url);
                    //print(ret);
                    jsonObjectCourseID = json.decode(ret);
                    //print(jsonObjectCourseID);
                    
                    for(int i = 0; i < jsonObjectCourseID.length; i++){

                      tempJsonObjectCourseID = jsonObjectCourseID[i];
                      
                      if(tempJsonObjectCourseID["coursetitle"] == addExamName.trim()){
                        //print(tempJsonObjectCourseID["_id"]);
                        courseID = tempJsonObjectCourseID["_id"];
                      }
                      //print(tempJsonObjectCourseID["_id"]);
                    }
                    //print(courseID);
                  }catch(e){

                    print(e.toString());
                  }

                  newExamAddMessageText = '';
                  var examID = '';
                  var jsonObject;  

                  String payload = '{"userID": "' + GlobalData.userID.trim() + 
                    '", "courseID": "' + courseID.trim() +
                    '", "examname": "'+ addExamName.trim() +
                    '", "examdate": "' + addExamDate.trim() + 'T' + addExamTime.trim() + 'Z"}';
                  
                  //print(payload);

                  try{
                    String url = 'http://studentadvisorai.xyz:5002/api/addexam';
                    String ret = await studentAdvisorData.getJson(url, payload);
                    //print(ret);
                    jsonObject = json.decode(ret);
                    print(jsonObject);
                    
                    print(jsonObject["examID"]);
                    examID = jsonObject["examID"];
                  }catch(e){
                    print(e.toString());
                  }

                  if(examID != ''){
                    
                    newExamAddMessageText = 'Cannot make exam.';
                    changeExamAddText();
                  }else{

                    newExamAddMessageText = 'Exam made successfully.';
                    changeExamAddText();
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
              Text('$examAddMessage',style: TextStyle(fontSize: 14 ,color:Colors.black)),
            ],
          ),

          //Title: Deleting exams
          Row(
            children: <Widget>[
              Container(
                child: Text(
                  'Delete an Exam:',
                  style: TextStyle(
                    fontSize: 24,
                    fontWeight: FontWeight.bold,
                    color: Colors.brown,
                  ),
                ),
              ),
            ],
          ),

          //User inputs for name of courses and Exam date
          Row(
            children: <Widget>[
              Container(
                width: 175,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Course Name',
                    hintText: 'ex POOSD'
                  ),
                  onChanged: (text){
                    delExamName = text;
                  },
                ),
              ),
              
              Container(
                width: 175,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Exam Date',
                    hintText: 'ex: YYYY-mm-dd'
                  ),
                  onChanged: (text){
                    delExamDate = text;
                    //delExamTime;
                  },
                ),
              ),
            ],
          ),

          Row(
            children: <Widget>[
              
              Container(
                width: 175,
                child:
                TextField (
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.white,
                    border: OutlineInputBorder(),
                    labelText: 'Exma Time',
                    hintText: 'ex: HH-mm-ss'
                  ),
                  onChanged: (text){
                    delExamTime = text;
                  },
                ),
              ),
            ],
          ),


          Row(
            children: <Widget>[
              ElevatedButton(
                child: Text('Delete Exam',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                onPressed: () async
                {
          
                  //get the exmaID
                  //var examID = '';
                  var courseID = '';
                  Map<String, dynamic> tempJsonObjectExamID;
                  var jsonObjectExamID;
                  var fullExamTime = delExamDate + 'T' + delExamTime + '.000Z';

                  try{
                    
                    String url = 'http://studentadvisorai.xyz:5002/api/getexamid/' + GlobalData.userID;
                    var ret = await studentAdvisorData.getJsonGets(url);
                    //print(ret);
                    jsonObjectExamID = json.decode(ret);
                    //print(jsonObjectExamID);
                    
                    for(int i = 0; i < jsonObjectExamID.length; i++){

                      tempJsonObjectExamID = jsonObjectExamID[i];
                      //print(tempJsonObjectExamID);
                      
                      if(tempJsonObjectExamID["examname"] == delExamName.trim()
                        && tempJsonObjectExamID["examdate"] == fullExamTime){
                        
                        //examID = tempJsonObjectExamID["_id"];
                        courseID = tempJsonObjectExamID["course"];
                        //examdateDB = tempJsonObjectExamID["examdate"];

                        //print(examID + ' ' + courseIDDB + ' ' + examdateDB);
                      }
                    }
                    
                  }catch(e){

                    print(e.toString());
                  }


                  var jsonObject;
                  String payload = '{"userID": "' +GlobalData.userID
                    + '", "courseID": "' +courseID.trim()
                    + '", "examname": "' +delExamName.trim()+ '"}';

                  print(payload);  
                  try{
                    
                    String url = 'http://studentadvisorai.xyz:5002/api/deleteexam';
                    var ret = await studentAdvisorData.getJsonDelete(url, payload);

                    jsonObject = json.decode(ret);
                    
                    print(jsonObject);

                    newdelMessageText = jsonObject["message"];
                  }catch(e){
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
              Text('$delExamMessage',style: TextStyle(fontSize: 14 ,color:Colors.black)),
            ],
          ),


        ],

      ),
    );
  }
}