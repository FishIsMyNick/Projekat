export class Sediste {
    idLeta: number;
    ime: string;
    prezime: string;
    brojPasosa: string;
    rezervisano: boolean;
    cenaSedista: number;
    idSedista: string;
  
    constructor(idLeta: number, idSedista: string, ime: string, prezime: string, brojPasosa: string, rezervisano: boolean, cenaSedista: number) {
      this.idLeta = idLeta;
      this.idSedista = idSedista;
      this.ime = ime;
      this.prezime = prezime;
      this.brojPasosa = brojPasosa;
      this.rezervisano = rezervisano;
      this.cenaSedista = cenaSedista;
      }
  }
  