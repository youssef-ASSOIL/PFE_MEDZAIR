import 'package:flutter/material.dart';

class DisponibilitesPage extends StatefulWidget {
  const DisponibilitesPage({Key? key}) : super(key: key);

  @override
  State<DisponibilitesPage> createState() => _DisponibilitesPageState();
}

class _DisponibilitesPageState extends State<DisponibilitesPage> {

  late List<List<int>> _dayButtonState;
  late List<List<int>> _nightButtonState;

  @override
  @override
  void initState() {
    super.initState();
    _dayButtonState = List.generate(4, (_) => List.filled(7, 0));
    _nightButtonState = List.generate(4, (_) => List.filled(7, 0));
  }

  void _toggleAvailability(
      int weekIndex, int dayIndex, bool isNightAvailability) {
    setState(() {
      if (isNightAvailability) {
        _nightButtonState[weekIndex][dayIndex] =
            (_nightButtonState[weekIndex][dayIndex] + 1) % 3;
      } else {
        _dayButtonState[weekIndex][dayIndex] =
            (_dayButtonState[weekIndex][dayIndex] + 1) % 3;
      }
    });
  }

  Widget _buildDayAvailabilityButton(
      int weekIndex, int dayIndex, bool isNightAvailability) {
    final buttonState = isNightAvailability
        ? _nightButtonState[weekIndex][dayIndex]
        : _dayButtonState[weekIndex][dayIndex];
    var buttonColor = Colors.white;
    String buttonText = 'Click';

    if (buttonState == 0) {
      buttonText = 'Click';
      buttonColor = Colors.white;
    } else if (buttonState == 1) {
      buttonText = 'Disponible';
      buttonColor = Colors.green;
    } else if (buttonState == 2) {
      buttonText = 'Indisponible';
      buttonColor = Colors.red;
    }

    return ElevatedButton(
      onPressed: () {
        _toggleAvailability(weekIndex, dayIndex, isNightAvailability);
      },
      style: ElevatedButton.styleFrom(
        primary: buttonColor,
      ),
      child: Text(
        buttonText,
        style: TextStyle(
          color: Colors.black,
        ),
      ),
    );
  }

  Widget _buildWeekAvailabilityCard(int weekIndex) {

    final now = DateTime.now();

    final daysOfWeek = <String>[
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday'
    ];

    final startingDayOfWeekIndex = (now.weekday + 6) % 7;
    final adjustedDaysOfWeek = [
      ...daysOfWeek.sublist(startingDayOfWeekIndex),
      ...daysOfWeek.sublist(0, startingDayOfWeekIndex),
    ];

    return Card(
      elevation: 2,
      child: Padding(
        padding: const EdgeInsets.all(5.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const Text(
              '                             Day                             Night',
              style: TextStyle(
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Row(
              children: [
                SizedBox(
                  width: 80,
                  child: Column(
                    children: [
                      for (final dayOfWeek in adjustedDaysOfWeek)
                        Padding(
                          padding: const EdgeInsets.symmetric(vertical: 4.0),
                          child: TextButton(
                            onPressed: () {},
                            style: ButtonStyle(
                              overlayColor:
                                  MaterialStateProperty.all(Colors.transparent),
                              side: MaterialStateProperty.all(BorderSide.none),
                            ),
                            child: Text(
                              dayOfWeek.substring(0, 3),
                              style: const TextStyle(
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                        ),
                    ],
                  ),
                ),
                Expanded(
                  child: Wrap(
                    spacing: 8.0,
                    runSpacing: 8.0,
                    children: List.generate(7, (dayIndex) {
                      return _buildDayAvailabilityButton(
                          weekIndex, dayIndex, false);
                    }),
                  ),
                ),
                Expanded(
                  child: Wrap(
                    spacing: 8.0,
                    runSpacing: 8.0,
                    children: List.generate(7, (dayIndex) {
                      return _buildDayAvailabilityButton(
                          weekIndex, dayIndex, true);
                    }),
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Disponibilités'),
      ),
      body: ListView.builder(
        itemCount: 4,
        itemBuilder: (context, index) {
          return _buildWeekAvailabilityCard(index);
        },
      ),
    );
  }
}
