import 'package:firebase_core/firebase_core.dart';
import 'package:flutter/material.dart';
import 'package:medzair_app/SplashScreen.dart';
import './LoginScreen.dart';
import 'Dal/DataBaseAccess.dart';
import 'Models/Medecin.dart';

Future main() async{
   WidgetsFlutterBinding.ensureInitialized();
   await Firebase.initializeApp();
   runApp(const MyApp());
  DataBaseAccess databaseAccess = DataBaseAccess();

  //Create a list of Medecin objects
  List<Medecin> medecins = [
    Medecin(
      id: '1',
      name: 'John',
      lastname: 'Doe',
      idContact: 'ABC123',
      tele: '123456789',
      email: 'john.doe@example.com',
      rpps: '1234567890',
    ),
    Medecin(
      id: '2',
      name: 'Jane',
      lastname: 'Smith',
      idContact: 'DEF456',
      tele: '987654321',
      email: 'jane.smith@example.com',
      rpps: '0987654321',
    ),
    Medecin(
      id: '3',
      name: 'David',
      lastname: 'Johnson',
      idContact: 'GHI789',
      tele: '456789123',
      email: 'david.johnson@example.com',
      rpps: '4567890123',
    ),
  ];

  //Loop through the list and add each Medecin
  for (Medecin medecin in medecins) {
    await databaseAccess.addMedcin(medecin);
  }
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSwatch(primarySwatch: Colors.grey),
        useMaterial3: true,
      ),
      home: SplashScreen(),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  void navigateToLogin() {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => LoginScreen(userType: '',)),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: ElevatedButton(
          onPressed: navigateToLogin,
          child: const Text('Go to Login'),
        ),
      ),
    );
  }
}


  

