const MedecinDao = require("../dao/MedecinDao");

class GestionMedecin{
  
    static AjouterMedecin(medecin){
        MedecinDao.addMedecin(medecin);
    }

    static SupprimerMedecin(medecin){
        MedecinDao.deleteMedecin(email);
    }
    static searchMedecinByRpps(rpps){
        return MedecinDao.searchMedecins(rpps);
    }

    static modifierMedecin(medecinString){
    //    MedecinDao.modifyMedecin(medecin.id, {name:newName,imagePath:newImagePath, data:newData,region:newRegion})
    const medecin = JSON.parse(medecinString);

        // Access id property 
        const medecinId = medecin.id; 

      const updatedData = {
        name: medecin.name,
        lastname:medecin.lastname,
        password:medecin.password,
        phone:medecin.phone,
        speciality:medecin.speciality,
        // imagePath: medecin.selectedImage, 
        email:medecin.email,
        birthday: medecin.birthday, 
      };
      MedecinDao.modifyMedecin(medecinId, updatedData);

      
    }
    static loadAllMedecin(){
        return MedecinDao.loadAllMedecins();
       }

}

module.exports = GestionMedecin;