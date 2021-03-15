export class Pozivnica {
    idLeta: number;
    ime: string;
    prezime: string;
    brojPasosa: string;
    rezervisano: boolean;
    cenaSedista: number;
    idSedista: string;
    pozvaoUsername: string;
    id: number;
  
    constructor(idLeta: number, idSedista: string, ime: string, prezime: string, brojPasosa: string, rezervisano: boolean, cenaSedista: number, pozvaoUsername: string) {
      this.idLeta = idLeta;
      this.ime = ime;
      this.prezime = prezime;
      this.brojPasosa = brojPasosa;
      this.rezervisano = rezervisano;
      this.cenaSedista = cenaSedista;
      this.idSedista = idSedista;
      this.pozvaoUsername = pozvaoUsername;
    }
  }
  