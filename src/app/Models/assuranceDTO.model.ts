export class AssuranceDTO {
  id: number;
  nomAssurance: string;
  numeroSocietaire: string;

  constructor(id: number, nomAssurance: string, numeroSocietaire: string) {
    this.id = id;
    this.nomAssurance = nomAssurance;
    this.numeroSocietaire = numeroSocietaire;
  }
}