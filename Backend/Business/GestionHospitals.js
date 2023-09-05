const HospitalDao = require("../dao/HospitalDao");

class GestionHospital{
   
    static AjouterHospital(hospital){
        HospitalDao.addHospital(hospital);
    }

    static SupprimerHospital(email){
       this.hospitals=this.hospitals.filter(hospital=>hospital.email!=email);
       HospitalDao.deleteHospital(email);
      }
    
      static ModifierHospital(email, newName, newImagePath, newData, newRegion) {
        const hospitalToModify = this.hospitals.find((hospital) => hospital.email === email);
        const hospitalsToUpdate = HospitalDao.searchHospitals(email);
        this.modifyHospitalInDao(hospital.id, {name:newName,imagePath:newImagePath, data:newData,region:newRegion})
        
        if (hospitalToModify) {
          hospitalToModify.name = newName;
          hospitalToModify.imagePath = newImagePath;
          hospitalToModify.data = newData;
          hospitalToModify.region = newRegion;
        } else {
          console.log("Hospital not found with the provided email.");
        }
      }

       
      static loadAllHospitals(){
        this.hospitals=HospitalDao.loadAllHospitals();
       }

}

module.exports = GestionHospital;