import '../Models/Medecin.dart';

class GestionMedecin {

  late List<Medecin> medecins;

  GestionMedecin() {
    medecins = [];
  }

  void addMedecin(Medecin medecin) {
    medecins.add(medecin);
  }

  void removeMedecin(Medecin medecin) {
    medecins.remove(medecin);
  }

  void modifyMedecin(String id, Medecin updatedMedecin) {
    int index = findMedecinIndexById(id);
    if (index != -1) {
      medecins[index] = updatedMedecin;
    }
  }

  void deleteMedecin(String id) {
    int index = findMedecinIndexById(id);
    if (index != -1) {
      medecins.removeAt(index);
    }
  }

  int findMedecinIndexById(String id) {
    for (int i = 0; i < medecins.length; i++) {
      if (medecins[i].id == id) {
        return i;
      }
    }
    return -1;
  }
  
}
