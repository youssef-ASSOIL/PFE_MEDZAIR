import 'package:cloud_firestore/cloud_firestore.dart';

import '../Models/Medecin.dart';

class DataBaseAccess{
  


Future<void> addMedcin(Medecin medcin) async {
   

    try {
      await FirebaseFirestore.instance.collection('Medecin').add(medcin.toJson());
      
    } catch (error) {
      print('Error adding Medecin: $error');
      // Handle network or other errors
    }
  }
  

}