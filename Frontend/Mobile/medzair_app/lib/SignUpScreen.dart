import 'package:flutter/material.dart';

class SignUpScreen extends StatefulWidget {
  final VoidCallback onCancel;

  SignUpScreen({required this.onCancel});

  @override
  _SignUpScreenState createState() => _SignUpScreenState();
}

class _SignUpScreenState extends State<SignUpScreen> {

  
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();
  TextEditingController confirmPasswordController = TextEditingController();
  TextEditingController rppsController = TextEditingController();
  TextEditingController birthdayController = TextEditingController();
  String? selectedSpecialty;

  List<String> specialties = [
    'anesthésiologie',
    'cardiologie',
    'dermatologie',
    ' endocrinologie', 
     'gastro-entérologie',
     'génétique médicale',
      'gériatrie',
       'hématologie', 
      'immunologie clinique et allergie',
      'néphrologie',
       'neurologie', 
      'pédiatrie',  
      'pneumologie', 
     'rhumatologie',
    // Add more specialties as needed
  ];

  void signUp() {
    try {
      // Perform sign-up logic
      // ...

      // Show success message
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Sign Up Success'),
            content: Text('Your account has been created successfully!'),
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
    } catch (error) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: Text('Sign Up Error'),
            content: Text('Failed to sign up. Please try again.'),
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

  void onCancel() {
    widget.onCancel(); // Call the onCancel callback provided by the parent
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false, // Prevent resizing when keyboard opens
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              Image.asset(
                'images/signup.gif', // Provide the correct path to the image file
                height: 100,
                width: 100,
              ),
              SizedBox(height: 20),
              Text(
                'Sign Up',
                style: TextStyle(
                  fontSize: 40,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 20),
              TextField(
                decoration: InputDecoration(
                  hintText: 'Email',
                  border: OutlineInputBorder(),
                ),
                controller: emailController,
              ),
              SizedBox(height: 10),
              TextField(
                decoration: InputDecoration(
                  hintText: 'Mot de pass',
                  border: OutlineInputBorder(),
                ),
                obscureText: true,
                controller: passwordController,
              ),
              SizedBox(height: 10),
              TextField(
                decoration: InputDecoration(
                  hintText: 'Confirmation de mot de pass',
                  border: OutlineInputBorder(),
                ),
                obscureText: true,
                controller: confirmPasswordController,
              ),
              SizedBox(height: 10),
              TextField(
                decoration: InputDecoration(
                  hintText: 'RPPS',
                  border: OutlineInputBorder(),
                ),
                controller: rppsController,
              ),
              SizedBox(height: 10),
              TextField(
                decoration: InputDecoration(
                  hintText: 'Date de naissance',
                  border: OutlineInputBorder(),
                ),
                controller: birthdayController,
                onTap: () async {
                  // Show date picker and update birthday field
                  final DateTime? pickedDate = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(1900),
                    lastDate: DateTime.now(),
                  );

                  if (pickedDate != null) {
                    setState(() {
                      final formattedDate =
                          "${pickedDate.year}-${pickedDate.month}-${pickedDate.day}";
                      birthdayController.text = formattedDate;
                    });
                  }
                },
              ),
              SizedBox(height: 10),
              DropdownButtonFormField<String>(
                decoration: InputDecoration(
                  hintText: 'Specialter',
                  border: OutlineInputBorder(),
                ),
                value: selectedSpecialty,
                items: specialties.map((String specialty) {
                  return DropdownMenuItem<String>(
                    value: specialty,
                    child: Text(specialty),
                  );
                }).toList(),
                onChanged: (String? value) {
                  setState(() {
                    selectedSpecialty = value;
                  });
                },
              ),
              SizedBox(height: 20),
              ElevatedButton(
                onPressed: signUp,
                style: ElevatedButton.styleFrom(
                  primary: Color(0xFF3BACB6),
                ),
                child: Text('Sign Up',
                style: TextStyle(
                        color: Colors.white, // Change the font color here
                      ),),
              ),
              SizedBox(height: 10),
              TextButton(
                onPressed: onCancel,
                child: Text(
                  'Annuler',
                  style: TextStyle(
                    color: Theme.of(context).primaryColor,
                    fontWeight: FontWeight.bold,
                    fontSize: 16,
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
