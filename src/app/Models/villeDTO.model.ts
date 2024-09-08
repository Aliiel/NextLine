export class VilleDTO {
  id: number;
  codePostal: string;
  codeInsee: string;
  nomVille: string;

  constructor(id: number, codePostal: string, codeInsee: string, nomVille: string) {
    this.id = id;
    this.codePostal = codePostal;
    this.codeInsee = codeInsee;
    this.nomVille = nomVille;
  }
}