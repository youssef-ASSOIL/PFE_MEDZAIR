import 'package:flutter/material.dart'; // Import the MissionsPage if not already imported

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
