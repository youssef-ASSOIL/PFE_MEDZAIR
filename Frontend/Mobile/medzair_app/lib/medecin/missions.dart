import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class MissionsPage extends StatefulWidget {
  const MissionsPage({Key? key}) : super(key: key);

  @override
  State<MissionsPage> createState() => _MissionsPageState();
}

class Appointment {
  final String time;
  final String doctorName;
  final String specialty;

  Appointment({
    required this.time,
    required this.doctorName,
    required this.specialty,
  });
}

class _MissionsPageState extends State<MissionsPage> {
  DateTime selectedDate = DateTime.now();

  List<Appointment> appointments = [
    Appointment(
      time: '12:00 pm',
      doctorName: 'Dr. Melissa Mellis',
      specialty: 'Cardiologist',
    ),
    Appointment(
      time: '11:00 pm',
      doctorName: 'Dr. Joshua Bolt',
      specialty: 'Surgeon',
    ),
    Appointment(
      time: '10:00 pm',
      doctorName: 'Dr. Nik Gromov',
      specialty: 'Traumatologist',
    ),
  ];

  List<Widget> getDaysInMonth() {
    final daysInMonth =
        DateTime(selectedDate.year, selectedDate.month + 1, 0).day;
    final buttons = List.generate(daysInMonth, (index) {
      final day = index + 1;
      final dayText = DateFormat.E().format(
        DateTime(selectedDate.year, selectedDate.month, day),
      );
      return Column(
        children: [
          Text(
            dayText,
            style: TextStyle(fontSize: 12, fontWeight: FontWeight.bold),
          ),
          ElevatedButton(
            onPressed: () {
              setState(() {
                selectedDate = DateTime(
                  selectedDate.year,
                  selectedDate.month,
                  day,
                );
              });
            },
            style: ElevatedButton.styleFrom(
              primary: selectedDate.day == day
                  ? Color.fromARGB(255, 115, 220, 230) // Apply the color when selected
                  : const Color.fromARGB(255, 249, 250, 250), // Default button color
            ),
            child: Text(day.toString()),
          ),
        ],
      );
    });
    return buttons;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Remplacement'),
      ),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                IconButton(
                  onPressed: () {
                    setState(() {
                      selectedDate =
                          selectedDate.subtract(const Duration(days: 1));
                    });
                  },
                  icon: const Icon(Icons.arrow_back_ios),
                ),
                TextButton(
                  onPressed: () async {
                    final date = await showDatePicker(
                      context: context,
                      initialDate: selectedDate,
                      firstDate:
                          DateTime.now().subtract(const Duration(days: 365)),
                      lastDate: DateTime.now().add(const Duration(days: 365)),
                    );
                    if (date != null) {
                      setState(() {
                        selectedDate = date;
                      });
                    }
                  },
                  child: Text(DateFormat.yMMMMd().format(selectedDate)),
                ),
                IconButton(
                  onPressed: () {
                    setState(() {
                      selectedDate = selectedDate.add(const Duration(days: 1));
                    });
                  },
                  icon: const Icon(Icons.arrow_forward_ios),
                ),
              ],
            ),
            const SizedBox(height: 10),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: getDaysInMonth(),
              ),
            ),
            const SizedBox(height: 10),
            ListView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              itemCount: appointments.length,
              itemBuilder: (context, index) {
                final appointment = appointments[index];
                return ListTile(
                  leading:
                      const CircleAvatar(), // Replace with doctor's profile picture
                  title: Text(appointment.doctorName),
                  subtitle: Text(appointment.specialty),
                  trailing: Text(appointment.time),
                  onTap: () {},
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
