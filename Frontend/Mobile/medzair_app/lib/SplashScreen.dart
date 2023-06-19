import 'dart:async';
import 'package:flutter/material.dart';
import 'package:medzair_app/AdminLoginScreen.dart';
import 'package:medzair_app/SignUpScreen.dart';

import 'LoginScreen.dart';



class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  late Timer _timer;
  @override
  void initState() {
    super.initState();
    _startTimer();
  }

  

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  void _startTimer() {
    _timer = Timer(Duration(seconds: 3), () {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(builder: (context) => HomeScreen()),
      );
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.asset(
              './images/logo.e27ee17f.png',
              width: 150,
              height: 150,
            ),
            SizedBox(height: 20),
            CircularProgressIndicator(),
          ],
        ),
      ),
    );
  }
}
class HomeScreen extends StatelessWidget {
  void navigateToSignUpScreen(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => SignUpScreen(onCancel: () {})),
    );
  }

  void navigateToLoginScreen(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => LoginScreen(userType: '')),
    );
  }

  void navigateToAdminLoginScreen(BuildContext context) {
    Navigator.push(
      context,
      MaterialPageRoute(builder: (context) => AdminSignInScreen()),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0xFF2F8F9D),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                './images/logo.e27ee17f.png',
                width: 150,
                height: 150,
              ),
              Padding(padding: EdgeInsets.only(bottom: 20)),
              Text(
                "MedZair est une application qui facilite les demandes de rendez-vous médicaux et la recherche de médecins spécialisés dans les hôpitaux. Avec Medzair, vous pouvez prendre des rendez-vous rapidement et facilement, sans tracas. \n\n Notre objectif est de simplifier le processus de prise de rendez-vous médicaux, d'améliorer l'accès aux soins de santé et de permettre aux patients de trouver les meilleurs médecins et hôpitaux en fonction de leurs besoins spécifiques.",
                textAlign: TextAlign.center,
              ),
              SizedBox(height: 50),
              ElevatedButton(
                onPressed: () => navigateToSignUpScreen(context),
                child: Text('Sign Up'),
                style: ButtonStyle(
                  fixedSize: MaterialStateProperty.all<Size>(
                    Size(400, 40), // Adjust the width and height as needed
                  ),
                ),
              ),
              SizedBox(height: 15),
              ElevatedButton(
                onPressed: () => navigateToLoginScreen(context),
                child: Text('Login'),
                style: ButtonStyle(
                  fixedSize: MaterialStateProperty.all<Size>(
                    Size(400, 40), // Adjust the width and height as needed
                  ),
                ),
              ),
             SizedBox(height: 15),
              GestureDetector(
                onTap: () => navigateToAdminLoginScreen(context),
                child: Text(
                  'Se connecter en tant qu\'administrateur',
                  style: TextStyle(
                    color: Colors.black,
                    decoration: TextDecoration.underline,
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
