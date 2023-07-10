import 'package:flutter/material.dart';
import 'package:charts_flutter/flutter.dart' as charts;
import 'chart_data.dart';

class BarChart extends StatelessWidget {
  final List<ChartData> data;

  BarChart({required this.data});

  @override
  Widget build(BuildContext context) {
    List<charts.Series<ChartData, String>> series = [
      charts.Series(
        id: "Online",
        data: data,
        domainFn: (ChartData series, _) => series.month,
        measureFn: (ChartData series, _) => series.online,
        colorFn: (ChartData series, _) => series.barColor,
      ),
      charts.Series(
        id: "In Person",
        data: data,
        domainFn: (ChartData series, _) => series.month,
        measureFn: (ChartData series, _) => series.inPerson,
        colorFn: (ChartData series, _) => series.barColor,
      )
    ];

    return Container(
      height: 400,
      padding: EdgeInsets.all(20),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(8.0),
          child: Column(
            children: <Widget>[
              Text(
                "Appointment Statistic",
                style: Theme.of(context).textTheme.bodyText1,
              ),
              Expanded(
                child: charts.BarChart(
                  series,
                  animate: true,
                  barGroupingType: charts.BarGroupingType.grouped,
                ),
              )
            ],
          ),
        ),
      ),
    );
  }
}
