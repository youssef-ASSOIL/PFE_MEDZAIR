const HospitalDao = require("../dao/HospitalDao");
const MedecinAccepted = require("../dao/MedecinAccepted");

class GestionHospital{
   
    static AjouterHospital(hospital){
        HospitalDao.addHospital(hospital);
    }

    static SupprimerHospital(email){
      HospitalDao.deleteHospital(email);
      }
     
    
      static ModifierHospital(hospitalString) {
        const hospital = JSON.parse(hospitalString);
        
        const hospitalId = hospital.id; 
       
        const updatedData = {
            name: hospital.name,
            imagePath:hospital.imagePath,
            region:hospital.region,
            email:hospital.email,
          };
          HospitalDao.modifyHospital(hospitalId,updatedData);
        
      }
      


      static SearchHospitalByMail(mail){
        return HospitalDao.searchHospitalByMail(mail);
      }
      static SearchbyUserMail(userMail){
        return HospitalDao.searchHopitalInfo(userMail);
      }
      
      static loadAllHospitals(){
        return HospitalDao.loadAllHospitals();
       }
       static MedecinAcceptedHospitalDemande(){
          return MedecinAccepted.loadAcceptedMedecin();
       }
       static loadAcceptedMedecinWithEmail(mail){
          return MedecinAccepted.loadAcceptedMedecinWithEmail(mail);
       }
}

module.exports = GestionHospital;