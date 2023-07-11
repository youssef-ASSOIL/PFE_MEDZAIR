import 'package:flutter/material.dart';

class ProfilPage extends StatefulWidget {
  const ProfilPage({Key? key}) : super(key: key);

  @override
  State<ProfilPage> createState() => _ProfilPageState();
}

class _ProfilPageState extends State<ProfilPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Profile'),
        centerTitle: true,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(height: 16.0),
            CircleAvatar(
              radius: 80.0,
              backgroundColor: Colors.grey,
              backgroundImage: AssetImage('path/to/your/image.jpg'),
            ),
            const SizedBox(height: 16.0),
            Text(
              'Email: ',
              style: TextStyle(fontSize: 18.0),
            ),
            const SizedBox(height: 8.0),
            Text(
              'RRRP Code: ',
              style: TextStyle(fontSize: 18.0),
            ),
            const SizedBox(height: 24.0),
            ListTile(
              leading: Icon(Icons.description),
              title: const Text('Documents'),
              onTap: () {
                // Handle Documents tap
              },
            ),
            const Divider(),
            ListTile(
              leading: Icon(Icons.account_box),
              title: const Text('Compte'),
              onTap: () {
                // Handle Compte tap
              },
            ),
            const Divider(),
            ListTile(
              leading: Icon(Icons.notifications),
              title: const Text('Notifications'),
              onTap: () {
                // Handle Notifications tap
              },
            ),
            const Divider(),
            ListTile(
              leading: Icon(Icons.help),
              title: const Text('Aide & Support'),
              onTap: () {
                // Handle Aide & Support tap
              },
            ),
            const Divider(),
            ListTile(
              leading: Icon(Icons.group),
              title: const Text('Communauté'),
              onTap: () {
                // Handle Communauté tap
              },
            ),
            const Divider(),
            ListTile(
              leading: Icon(Icons.logout),
              title: const Text('Déconnexion'),
              onTap: () {
                // Handle Déconnexion tap
              },
            ),
            const Divider(),
          ],
        ),
      ),
    );
  }
}
