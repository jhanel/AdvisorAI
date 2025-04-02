import 'package:flutter/material.dart';
//import 'package:schedular_app/screens/RegisterScreen.dart';
import 'package:scheduler_v2/utils/getUserSchedule.dart';
import 'package:scheduler_v2/screens/LoginScreen.dart';
//import 'package:schedular_app/screens/CalenderScreen.dart';

class ToDoListScreen extends StatefulWidget {
  @override
  _ToDoListScreen createState() => _ToDoListScreen();
}

class _ToDoListScreen extends State<ToDoListScreen> {
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

  List<String> days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  Widget tableCell(String text, {bool isHeader = false}) {
    return Padding(
      padding: const EdgeInsets.all(8.0),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 16,
          fontWeight: isHeader ? FontWeight.bold : FontWeight.normal,
        ),
        textAlign: TextAlign.center,
      ),
    );
  }


  // Future<List<TableRow>> getTableRows (List<String> n) async{

  //   List<TableRow> res = [];

  //   res.add(
  //     TableRow(children: [
  //       tableCell('Day', isHeader: true),
  //       tableCell('Course', isHeader: true),
  //       tableCell('Start', isHeader: true),
  //       tableCell('End', isHeader: true),
  //     ]),
  //   );

    
  //   var tempObj;
  //   var tempObj2;
  //   for(int i = 0; i < 7; i++){

  //     tempObj = getUserSchedule.getDailyEvents(n[i]);
  //     for(int j = 0; j < tempObj.length; j++){

  //       tempObj2 = tempObj[j];
  //       res.add(
  //         TableRow(children: [
  //           tableCell(n[i]),
  //           tableCell(tempObj2["course"]),
  //           tableCell(tempObj2["start_time"]),
  //           tableCell(tempObj2["end_time"]),
  //         ]),
  //       );
  //     }
  //   }

  //   return res;
  // }

  //List<TableRow> tempSchedule = [];

  List<TableRow> getTableRows (List<String> n) {

    List<TableRow> res = [];

    res.add(
      TableRow(children: [
        tableCell('Day', isHeader: true),
        tableCell('Course', isHeader: true),
        tableCell('Start', isHeader: true),
        tableCell('End', isHeader: true),
      ]),
    );

    
    var tempObj;
    var tempObj2;
    for(int i = 0; i < 7; i++){

      tempObj = getUserSchedule.getDailyEvents(n[i]);
      for(int j = 0; j < tempObj.length; j++){

        tempObj2 = tempObj[j];
        res.add(
          TableRow(children: [
            tableCell(n[i]),
            tableCell(tempObj2["course"]),
            tableCell(tempObj2["start_time"]),
            tableCell(tempObj2["end_time"]),
          ]),
        );
      }
    }

    return res;
  }

  List<TableRow> tempSchedule = [];
  bool _showTable = false;

  @override
  Widget build(BuildContext context) { 

    return SafeArea(
      child: SingleChildScrollView (
        child: Column(
          children: <Widget>[

            Row(
              children: <Widget>[
                ElevatedButton(
                  child: Text('View Schedule',style: TextStyle(fontSize: 14 ,color:Colors.black)),
                  onPressed: ()
                  {
                    setState((){
                      
                      if(GlobalData.userID != ''){
                        _showTable = !_showTable;
                        print(GlobalData.userID);
                        tempSchedule = getTableRows(days);
                      }
                    });
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.lightGreen,
                  ),
                ),

                Text(
                  '<- Triple Tap to See Schedule ',
                  style: TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                    color: Colors.brown,
                  ),
                ),

              ]
            ),

            if(_showTable && tempSchedule.length != 0)
              Table(
                children: getTableRows(days),
              ),
            

          ],
        ),
      ),
    );

  }
}