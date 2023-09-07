const MedecinDao = require("../dao/MedecinDao");

class GestionMedecin{
  
    static AjouterMedecin(medecin){
        MedecinDao.addMedecin(medecin);
    }

    static SupprimerMedecin(medecinId){
        MedecinDao.deleteMedecin(medecinId);
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
        firstName: medecin.firstName,
        lastName:medecin.lastName,
        password:medecin.password,
        phone:medecin.phone,
        speciality:medecin.speciality,
        rpps:medecin.rpps,
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