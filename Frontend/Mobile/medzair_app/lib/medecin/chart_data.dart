import 'package:charts_flutter/flutter.dart' as charts;

class ChartData {
  final String month;
  final int online;
  final int inPerson;
  final charts.Color barColor;

  ChartData({
    required this.month,
    required this.online,
    required this.inPerson,
    required this.barColor,
  });
}
