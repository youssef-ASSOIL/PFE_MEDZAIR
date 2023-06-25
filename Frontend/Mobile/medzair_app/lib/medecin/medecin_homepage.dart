import 'package:flutter/material.dart';
import 'package:medzair_app/medecin/disponibilite.dart';
import 'package:medzair_app/medecin/missions.dart';
import 'package:medzair_app/medecin/offres.dart';
import 'package:medzair_app/medecin/profile.dart';

class HomeMedecin extends StatefulWidget {
  const HomeMedecin({Key? key});

  @override
  State<HomeMedecin> createState() => _HomeMedecinState();
}

class _HomeMedecinState extends State<HomeMedecin> {
  int _selectedIndex = 0;

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  final List<Widget> _pages = const [
    OffresPage(), // Replace with your Offres page implementation
    DisponibilitesPage(), // Replace with your Disponibilités page implementation
    MissionsPage(), // Replace with your Missions page implementation
    ProfilPage(), // Replace with your Profil page implementation
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      bottomNavigationBar: BottomNavigationBar(
        items: const <BottomNavigationBarItem>[
          BottomNavigationBarItem(
            icon: Icon(Icons.person_search_sharp),
            label: 'Offres',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.calendar_today),
            label: 'Disponibilités',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.work),
            label: 'Planning',
          ),
          BottomNavigationBarItem(
            icon: Icon(Icons.person),
            label: 'Compte',
          ),
        ],
        currentIndex: _selectedIndex,
        selectedItemColor: Color.fromARGB(255, 79, 180, 190),
        onTap: _onItemTapped,
      ),
      body: IndexedStack(
        index: _selectedIndex,
        children: _pages,
      ),
    );
  }
}
