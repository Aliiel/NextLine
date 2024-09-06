import { FormeJuridiqueDTO } from "./forme-juridiqueDTO.model";
import { AssuranceDTO } from "./assuranceDTO.model";
import { DirigeantDTO } from "./dirigeantDTO.model";
import { VilleDTO } from "./villeDTO.model";


export class EntrepriseDTO {
    raisonSociale: string;
    adresseEntreprise: string;
    numeroSiret: string;
    telephoneEntreprise: string;
    emailEntreprise: string;
    formeJuridiqueDTO: FormeJuridiqueDTO;
    assuranceDTO?: AssuranceDTO;
    dirigeantDTO?: DirigeantDTO;
    villeDTO: VilleDTO;
  
    constructor(

      raisonSociale: string,
      adresseEntreprise: string,
      telephoneEntreprise: string,
      emailEntreprise: string,
      formeJuridiqueDTO: FormeJuridiqueDTO,
      villeDTO: VilleDTO,
      numeroSiret: string,
      assuranceDTO?: AssuranceDTO,
      dirigeantDTO?: DirigeantDTO,
      id?: number
    ) 
    {
      this.raisonSociale = raisonSociale;
      this.adresseEntreprise = adresseEntreprise;
      this.numeroSiret = numeroSiret;
      this.telephoneEntreprise = telephoneEntreprise;
      this.emailEntreprise = emailEntreprise;
      this.formeJuridiqueDTO = formeJuridiqueDTO;
      this.assuranceDTO = assuranceDTO;
      this.dirigeantDTO = dirigeantDTO;
      this.villeDTO = villeDTO;
    }
  }
  