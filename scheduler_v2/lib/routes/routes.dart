import 'package:flutter/material.dart';
import 'package:scheduler_v2/screens/LoginScreen.dart';
import 'package:scheduler_v2/screens/RegisterScreen.dart';
import 'package:scheduler_v2/screens/DashboardScreen.dart';
import 'package:scheduler_v2/screens/ForgotPasswordScreen.dart';
import 'package:scheduler_v2/screens/ToDoListScreen.dart';
//import 'package:frontend/screens/CardsScreen.dart';

class Routes {
  static const String LOGINSCREEN = '/login';
  static const String REGISTERSCREEN = '/register';
  static const String DASHBOARDSCREEN = '/dashboard';
  static const String FORGOTPASSWORDSCREEN = '/forgotPassword';
  static const String TODOLISTSCREEN = '/todoList';
  // static const String CARDSSCREEN = '/cards';

  // routes of pages in the app
  static Map<String, Widget Function(BuildContext)> get getroutes => {
    '/': (context) => LoginScreen(),
    LOGINSCREEN: (context) => LoginScreen(),
    REGISTERSCREEN: (context) => RegisterScreen(),
    DASHBOARDSCREEN: (context) => DashboardScreen(),
    FORGOTPASSWORDSCREEN: (context) => ForgotPassword(),
    TODOLISTSCREEN: (context) => ToDoListScreen(),
    // CARDSSCREEN: (context) => CardsScreen(),
  };

  
}