import 'package:flutter/material.dart';
import 'package:scheduler_v2/screens/CalenderScreen.dart';
import 'package:scheduler_v2/screens/UserInfoScreen.dart';
//import 'package:schedular_app/screens/currentInfoScreen.dart';
import 'package:scheduler_v2/screens/inputClassesScreen.dart';
import 'package:scheduler_v2/screens/ToDoListScreen.dart';


class DashboardScreen extends StatefulWidget {
  @override
  _DashboardScreenState createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.blue,
      body: MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {

  int myIndex = 0;

  List<Widget> widgetList = [

    CalenderScreen(), // Text('Logout', style: TextStyle(fontSize: 40)),
    UserInfoScreen(),
    InputClassesScreen(),
    ToDoListScreen(),
    //CurrentInfoScrren(),
  ];

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) { 

    return SafeArea(

      child: Scaffold(

        body: IndexedStack(

          index: myIndex,
          children: widgetList,
        ),
        //body: _screens[currentScreenIndex],
        bottomNavigationBar: BottomNavigationBar(
          //Notes: navigation bar needs at least 2 elemnts

          //showSelectedLabels: false,
          showUnselectedLabels: false,
          backgroundColor: Colors.indigo,
          type: BottomNavigationBarType.shifting,
          onTap: (index){

            setState( () {
              myIndex = index;
            });
          },
          currentIndex: myIndex,
          items: const [

            BottomNavigationBarItem(

              icon: Icon(Icons.home), 
              label: "Home",
              backgroundColor: Colors.greenAccent,
            ),
            BottomNavigationBarItem(

              icon: Icon(Icons.access_time_outlined), 
              label: "Weekly Study Time",
              backgroundColor: Colors.orangeAccent,
            ),
            BottomNavigationBarItem(

              icon: Icon(Icons.class_outlined), 
              label: "Classes",
              backgroundColor: Colors.orangeAccent,
            ),
            BottomNavigationBarItem(

              icon: Icon(Icons.schedule_send), 
              label: "Schedule",
              backgroundColor: Colors.orangeAccent,
            ),
            // BottomNavigationBarItem(

            //   icon: Icon(Icons.info_outline_rounded), 
            //   label: "User Info.",
            //   backgroundColor: Colors.orangeAccent,
            // ),
          ],
        ),
      ),
    );
  }
}