import 'package:flutter/material.dart';
import 'package:medzair_app/medecin/missions.dart';
import 'bar_chart.dart';
import 'chart_data.dart';
import 'package:charts_flutter/flutter.dart' as charts;

class Dashboard extends StatefulWidget {
  const Dashboard({Key? key}) : super(key: key);

  @override
  State<Dashboard> createState() => _DashboardState();
}

class _DashboardState extends State<Dashboard> {
  final Color primaryColor = const Color(0xFF3BABB5);
  final Color secondaryColor = const Color(0xFF82DBD9);
  final Color accentColor = const Color(0xFF2F8F9D);
  final Color backgroundColor = const Color(0xFFB4E8E4);

  // Sample data for the chart
  final data = [
    ChartData(
      month: "Février",
      online: 30,
      inPerson: 20,
      barColor: charts.ColorUtil.fromDartColor(Colors.blue),
    ),
    ChartData(
      month: "Mars",
      online: 25,
      inPerson: 15,
      barColor: charts.ColorUtil.fromDartColor(Colors.blue),
    ),
    ChartData(
      month: "Avril",
      online: 20,
      inPerson: 10,
      barColor: charts.ColorUtil.fromDartColor(Colors.blue),
    ),
    ChartData(
      month: "Mai",
      online: 15,
      inPerson: 5,
      barColor: charts.ColorUtil.fromDartColor(Colors.blue),
    ),
    ChartData(
      month: "Juin",
      online: 10,
      inPerson: 5,
      barColor: charts.ColorUtil.fromDartColor(Colors.blue),
    ),
    ChartData(
      month: "Juillet",
      online: 10,
      inPerson: 5,
      barColor: charts.ColorUtil.fromDartColor(Colors.blue),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView(
        padding: const EdgeInsets.only(
            top: 30.0, left: 16.0, right: 16.0, bottom: 16.0),
        children: [
          Row(
            children: [
              const CircleAvatar(
                radius: 20,
                backgroundImage: AssetImage('images/medecin.png'),
                backgroundColor: Color(0xFF3BABB5),
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
            child: Text('Bienvenue, Dr. John Doe',
                style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold)),
          ),
          const SizedBox(height: 36),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              const Text('Rendez-vous à venir',
                  style: TextStyle(fontSize: 17, fontWeight: FontWeight.bold)),
              TextButton(
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const MissionsPage(),
                    ),
                  );
                },
                child: Text('Voir Tout'),
                style: TextButton.styleFrom(primary: primaryColor),
              ),
            ],
          ),
          ListView.builder(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            padding: EdgeInsets.zero,
            itemCount: 2,
            itemBuilder: (context, index) {
              final appointmentTime =
                  DateTime.now().add(Duration(hours: index));
              final patientName = 'Hôpital ${index + 1}';

              return Card(
                elevation: 2,
                child: ListTile(
                  leading: CircleAvatar(child: Text(patientName[0])),
                  title: Text(patientName),
                  subtitle: Text('Heure: ${appointmentTime.toString()}'),
                  onTap: () {},
                ),
              );
            },
          ),
          BarChart(data: data)
        ],
      ),
    );
  }
}
