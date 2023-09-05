const MedecinDao = require("../dao/MedecinDao");

class GesionMedecin{
  
    static AjouterMedecin(medecin){
        MedecinDao.addMedecin(medecin);
    }

    static SupprimerMedecin(medecin){
        MedecinDao.deleteMedecin(email);
    }

    static modifierMedecin(medecin){
       const hospitalsToUpdate = MedecinDao.searchMedecins(email);
       MedecinDao.modifyMedecin(hospitalsToUpdate.id, {name:newName,imagePath:newImagePath, data:newData,region:newRegion})
    }
    static loadAllMedecin(){
        return MedecinDao.loadAllMedecins();
       }

}

module.exports = GesionMedecin;