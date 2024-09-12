import { EntrepriseDTO } from "./entrepriseDTO.model";
import { FonctionDTO } from "./fonctionDTO.model";

export class TuteurDTO {
    
    nomTuteur: string;
    prenomTuteur: string;
    emailTuteur: string;
    telTuteur: string;
    entrepriseDTO: EntrepriseDTO;
    fonctionDTO: FonctionDTO;
  
    constructor(
      nomTuteur: string,
      prenomTuteur: string,
      emailTuteur: string,
      telTuteur: string,
      entrepriseDTO: EntrepriseDTO,
      fonctionDTO: FonctionDTO,
    ) {
      this.nomTuteur = nomTuteur;
      this.prenomTuteur = prenomTuteur;
      this.emailTuteur = emailTuteur;
      this.telTuteur = telTuteur;
      this.entrepriseDTO = entrepriseDTO;
      this.fonctionDTO = fonctionDTO;
    }
  }