const DemandeMedecinDao = require("../dao/DemandeMedcinDao");

class DemandeMedcinB{
  
    
      static addDemandeMedcinB(demandeMedcinBData) {
        DemandeMedecinDao.addDemandeMedecin(demandeMedcinBData);
      }
    
      static async deleteDemandeMedcinB(demandeMedcinBId) {
       
        DemandeMedecinDao.deleteDemandeMedecin(demandeMedcinBId);
      }
    
     
      static loadAllDemandeMedcinBs() {
        return DemandeMedecinDao.loadAllDemandeMedecins();
          
      }

}

  
module.exports = DemandeMedcinB;