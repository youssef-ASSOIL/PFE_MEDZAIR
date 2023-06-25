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
      body: ListView(
         padding: const EdgeInsets.only(top: 30.0, left: 16.0, right: 16.0),
        children: [
          ListTile(
            title: Text('Dr.Joe'),
            subtitle: Text('+33........'),
            trailing: const Icon(Icons.edit),
            onTap: () {
              // Handle editing profile name
            },
          ),
          const Divider(),
          ListTile(
            title: const Text('Informations professionnelles'),
            onTap: () {
              // Handle tapping on professional information
            },
          ),
          const Divider(),
          ListTile(
            title: const Text('Etablissements'),
            onTap: () {
              // Handle tapping on establishments
            },
          ),
          const Divider(),
          ListTile(
            title: const Text('Métiers'),
            onTap: () {
              // Handle tapping on professions
            },
          ),
          const Divider(),
          ListTile(
            title: const Text('Documents'),
            onTap: () {
              // Handle tapping on documents
            },
          ),
          const Divider(),
          ListTile(
            title: const Text('Paramètres'),
            onTap: () {
              // Handle tapping on settings
            },
          ),
          const SizedBox(height: 20),
          ListTile(
            title: const Text('Compte'),
            leading: const Icon(Icons.account_circle),
            onTap: () {
              // Handle tapping on account
            },
          ),
          ListTile(
            title: const Text('Notifications'),
            leading: const Icon(Icons.notifications),
            onTap: () {
              // Handle tapping on notifications
            },
          ),
          ListTile(
            title: const Text("Besoin d'aide ?"),
            leading: const Icon(Icons.help),
            onTap: () {
              // Handle tapping on help
            },
          ),
          ListTile(
            title: const Text('Aide & Support'),
            leading: const Icon(Icons.help_outline),
            onTap: () {
              // Handle tapping on help and support
            },
          ),
          ListTile(
            title: const Text('Communauté'),
            leading: const Icon(Icons.people),
            onTap: () {
              // Handle tapping on community
            },
          ),
          ListTile(
            title: Text('Déconnexion'),
            leading: Icon(Icons.exit_to_app),
            onTap: () {
              // Handle tapping on logout
            },
          ),
        ],
      ),
    );
  }
}
