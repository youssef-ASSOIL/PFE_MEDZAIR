class DemandeMedcinB{
  
    
      static addDemandeMedcinB(demandeMedcinBData) {
        DemandeMedcinB.addDemandeMedecin(demandeMedcinBData);
      }
    
      static async deleteDemandeMedcinB(demandeMedcinBId) {
       
        DemandeMedcinB.deleteDemandeMedecin(demandeMedcinBId);
      }
    
     
      static loadAllDemandeMedcinBs() {
        return DemandeMedcinB.loadAllDemandeMedecins();
          
      }

}

  
module.exports = DemandeMedcinB;