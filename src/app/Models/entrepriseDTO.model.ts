import { FormeJuridiqueDTO } from "./forme-juridiqueDTO.model";
import { AssuranceDTO } from "./assuranceDTO.model";
import { DirigeantDTO } from "./dirigeantDTO.model";
import { VilleDTO } from "./villeDTO.model";


export class EntrepriseDTO {
  raisonSociale: string;
  adresseEntreprise: string;
  telephoneEntreprise: string;
  emailEntreprise: string;
  numeroSiret: string;
  villeDTO: VilleDTO;
  formeJuridiqueDTO: FormeJuridiqueDTO;
  dirigeantDTO: DirigeantDTO;
  assuranceDTO: AssuranceDTO;

  constructor(
    raisonSociale: string,
    adresseEntreprise: string,
    telephoneEntreprise: string,
    emailEntreprise: string,
    numeroSiret: string,
    villeDTO: VilleDTO,
    formeJuridiqueDTO: FormeJuridiqueDTO,
    dirigeantDTO: DirigeantDTO,
    assuranceDTO: AssuranceDTO
  ) {
    this.raisonSociale = raisonSociale;
    this.adresseEntreprise = adresseEntreprise;
    this.telephoneEntreprise = telephoneEntreprise;
    this.emailEntreprise = emailEntreprise;
    this.numeroSiret = numeroSiret;
    this.villeDTO = villeDTO;
    this.formeJuridiqueDTO = formeJuridiqueDTO;
    this.dirigeantDTO = dirigeantDTO;
    this.assuranceDTO = assuranceDTO;
  }
}
  