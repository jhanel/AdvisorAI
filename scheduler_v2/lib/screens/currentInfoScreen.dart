import 'package:flutter/material.dart';
// import 'package:schedular_app/screens/LoginScreen.dart';
// import 'package:schedular_app/utils/getAPI.dart';
// import 'dart:convert';

class CurrentInfoScrren extends StatefulWidget {
  @override
  _CurrentInfoScrren createState() => _CurrentInfoScrren();
}

class _CurrentInfoScrren extends State<CurrentInfoScrren> {
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


  @override
  Widget build(BuildContext context) { 

    return SingleChildScrollView(
      //width: 500,
      child:
        Column(
          
          mainAxisAlignment: MainAxisAlignment.center, //Center Column contents vertically,
          crossAxisAlignment: CrossAxisAlignment.center, //Center Column contents horizontal
          children: <Widget>[

            Row(
              children: [
                Container(
                  child: Text(
                    'Here is your current availability:',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                      color: Colors.brown,
                    ),
                  ),
                ),
              ]
            ),

            //table for availabilty
            //it shows day, start time , and end time
            //if no start time an dend time, say no time avalaible
            // Table (
            //   children: [
            //     TableRow(
            //       // Text("Education",),
            //       // Text("Institution name",),
            //       // Text("University",),
            //     ),
            //   ]
            // ),

          ],
        ),

    );
  }
}