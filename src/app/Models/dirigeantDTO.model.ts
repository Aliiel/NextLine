export class DirigeantDTO {
  id: number;
  nomDirigeant: string;
  prenomDirigeant: string;
  emailDirigeant: string;

  constructor(id: number, nomDirigeant: string, prenomDirigeant: string, emailDirigeant: string) {
    this.id = id;
    this.nomDirigeant = nomDirigeant;
    this.prenomDirigeant = prenomDirigeant;
    this.emailDirigeant = emailDirigeant;
  }
}