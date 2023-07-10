import 'package:flutter/material.dart';
import 'package:medzair_app/medecin/medecin_homepage.dart';
import './SignUpScreen.dart';

class LoginScreen extends StatefulWidget {
  final String userType;

  LoginScreen({required this.userType});

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  bool showSignUp = false;

  void signIn() {
    try {
      if (widget.userType == 'Client') {
        // Perform client-specific login logic
        // ...
        // Navigate to ClientHomeScreen
        // Navigator.pushNamed(context, 'ClientHome');
      } else if (widget.userType == 'Employee') {
        // Perform employee-specific login logic
        // ...
        // Navigate to EmployeeHomeScreen
        // Navigator.pushNamed(context, 'EmployeeHome');
      } else if (widget.userType == 'Manager') {
        // Perform manager-specific login logic
        // ...
        // Navigate to ManagerHomeScreen
        // Navigator.pushNamed(context, 'ManagerHome');
      }
    } catch (error) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Sign In Error'),
            content: Text('Failed to sign in. Please check your credentials.'),
            actions: <Widget>[
              TextButton(
                child: Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
    }
  }

  void navigateToSignUp() {
    setState(() {
      showSignUp = true;
    });
  }

  void navigateToLogin() {
    setState(() {
      showSignUp = false;
    });
  }

  @override
  Widget build(BuildContext context) {
    if (showSignUp) {
      return SignUpScreen(
        onCancel: navigateToLogin,
      );
    }

    return Scaffold(
      body: Center(
        child: ListView(
          padding: EdgeInsets.symmetric(horizontal: 16.0, vertical: 120),
          children: <Widget>[
            Image.asset(
              'images/medecin.png',
              height: 200,
              width: 200,
              fit: BoxFit.contain,
              alignment: Alignment.center,
            ),
            SizedBox(height: 20),
            Text(
              'Login',
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.bold,
                fontFamily: 'Roboto Condensed',
              ),
              textAlign: TextAlign.center,
            ),
            SizedBox(height: 20),
            TextField(
              decoration: InputDecoration(
                hintText: 'Email ou RPPS',
                border: OutlineInputBorder(),
              ),
              controller: emailController,
            ),
            SizedBox(height: 10),
            TextField(
              decoration: InputDecoration(
                hintText: 'Password',
                border: OutlineInputBorder(),
              ),
              obscureText: true,
              controller: passwordController,
            ),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) =>
                        const HomeMedecin(), // Replace with the appropriate route for the MissionsPage
                  ),
                );
              },
              child: Text('Sign In'),
            ),
            SizedBox(height: 20),
            TextButton(
              onPressed: navigateToSignUp,
              child: Text('Sign up'),
            ),
          ],
        ),
      ),
    );
  }
}
