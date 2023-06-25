import 'package:flutter/material.dart';
import 'package:medzair_app/medecin/missions.dart'; // Import the MissionsPage if not already imported

class OffresPage extends StatefulWidget {
  const OffresPage({Key? key}) : super(key: key);

  @override
  State<OffresPage> createState() => _OffresPageState();
}

class _OffresPageState extends State<OffresPage> {
  late List<bool> _isSelected = [true, false];

  void _onToggle(int index) {
    setState(() {
      for (int buttonIndex = 0;
          buttonIndex < _isSelected.length;
          buttonIndex++) {
        if (buttonIndex == index) {
          _isSelected[buttonIndex] = true; // Toggle the selected button
        } else {
          _isSelected[buttonIndex] = false; // Deselect the other buttons
        }
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.only(top: 30.0, left: 16.0, right: 16.0),
        children: [
          Row(
            children: [
              const CircleAvatar(
                radius: 20,
                backgroundImage: AssetImage('images/medecin.png'),
                backgroundColor: Color.fromARGB(255, 130, 231, 240),
              ),
              const SizedBox(width: 8),
              const Spacer(),
              IconButton(
                onPressed: () {
                  // Handle notifications icon press
                },
                icon: const Icon(Icons.timer),
              ),
              IconButton(
                onPressed: () {
                  // Handle appointments icon press
                },
                icon: const Icon(Icons.notifications),
              ),
            ],
          ),
          const SizedBox(height: 16),
          const Center(
            child: Text(
              'Welcome, Dr. John Doe',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
          ),
          const SizedBox(height: 36),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text(
                'Today\'s Appointments',
                style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                ),
              ),
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                        const  MissionsPage(), // Replace with the appropriate route for the MissionsPage
                    ),
                  );
                },
                child: Text('View All'),
                style: TextButton.styleFrom(
                  primary: Theme.of(context).primaryColor,
                ),
              ),
            ],
          ),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            padding: EdgeInsets.zero, // Remove padding between text and cards
            itemCount: 2, // Replace with actual appointment count
            itemBuilder: (context, index) {
              // Replace with appointment data
              final appointmentTime =
                  DateTime.now().add(Duration(hours: index));
              final patientName = 'Hopital ${index + 1}';

              return Card(
                elevation: 2,
                child: ListTile(
                  leading: CircleAvatar(
                    child: Text(patientName[0]),
                  ),
                  title: Text(patientName),
                  subtitle: Text('Time: ${appointmentTime.toString()}'),
                  onTap: () {
                    // Handle appointment tap
                  },
                ),
              );
            },
          ),
          SizedBox(height: 16),
          const Text(
                'Offres',
                style: TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.bold,
                ),
              ),
          Center(
            child: ToggleButtons(
              isSelected: _isSelected,
              onPressed: _onToggle,
              borderRadius: BorderRadius.circular(16),
              children: [
                Container(
                  width: 140, // Set the desired width
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Text('Disponibles'),
                  ),
                ),
                Container(
                  width: 140, // Set the desired width
                  child: Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Text('Déclinées'),
                  ),
                ),
              ],
            ),
          ),
          SizedBox(height: 16),
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 300),
            transitionBuilder: (child, animation) => SlideTransition(
              position: Tween<Offset>(
                begin: const Offset(1.0, 0.0),
                end: Offset.zero,
              ).animate(animation),
              child: child,
            ),
            child: _isSelected[0]
                ? _buildDisponiblesContent()
                : _buildDeclineesContent(),
          ),
        ],
      ),
    );
  }

  Widget _buildDisponiblesContent() {
    // Replace with your content for "Disponibles"
    return Container(
      alignment: Alignment.center,
      child: const Text('Disponibles Content'),
    );
  }

  Widget _buildDeclineesContent() {
    // Replace with your content for "Déclinées"
    return Container(
      alignment: Alignment.center,
      child: const Text('Déclinées Content'),
    );
  }
}
