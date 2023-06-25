import 'dart:convert';

import 'package:http/http.dart' as http;

class DataBaseAccess{
  


Future<void> fetchData() async {
  final response = await http.get(Uri.parse('http://your-express-server-url.com/your-endpoint'));
  
  if (response.statusCode == 200) {
    // Request successful, parse the response
    final data = jsonDecode(response.body);
    // Do something with the data
  } else {
    // Request failed
    print('Request failed with status: ${response.statusCode}');
  }
}




}