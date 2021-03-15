export class BrzaRezervacija {
    idLeta: number;
    cenaSedista: number;
    idSedista: string;
    id: number;
  
    constructor(idLeta: number, idSedista: string, cenaSedista: number) {
      this.idLeta = idLeta;
      this.idSedista = idSedista;
      this.cenaSedista = cenaSedista;
    }
  }
  