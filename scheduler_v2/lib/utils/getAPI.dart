import 'package:http/http.dart' as http;
import 'dart:convert';

class studentAdvisorData {

  static Future<String> getJson(String url, String outgoing) async{

    String ret = "";
    try
    {
      //chnaged the professor's version from url to Uri.parse(url)
      http.Response response = await http.post(Uri.parse(url),
      //body: jsonEncode(outgoing), //new potential fix (try later)
      body: utf8.encode(outgoing),
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
        encoding: Encoding.getByName("utf-8")
      );
      ret = response.body;
    } catch (e) {
      print(e.toString());
    }
    return ret;
  }

  static Future<String> getJsonGets(String url) async{

    String ret = "";
    try
    {
      //chnaged the professor's version from url to Uri.parse(url)
      http.Response response = await http.get(Uri.parse(url),
      //body: jsonEncode(outgoing), //new potential fix (try later)
      //body: utf8.encode(outgoing),
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
        //encoding: Encoding.getByName("utf-8")
      );
      ret = response.body;
    } catch (e) {
      print(e.toString());
    }
    return ret;
  }

  static Future<String> getJsonDelete(String url, String outgoing) async{

    String ret = "";
    try
    {
      //chnaged the professor's version from url to Uri.parse(url)
      http.Response response = await http.delete(Uri.parse(url),
      //body: jsonEncode(outgoing), //new potential fix (try later)
      body: utf8.encode(outgoing),
      headers:
      {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
        encoding: Encoding.getByName("utf-8")
      );
      ret = response.body;
    } catch (e) {
      print(e.toString());
    }
    return ret;
  }
}

