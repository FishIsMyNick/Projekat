export class Aerodrom {
    id: number;
    grad: string;
    drzava: string;
    aviokompanija: string;
  
    constructor(gr: string, dr: string, a:string) {
      this.grad = gr;
      this.drzava = dr;
      this.aviokompanija = a;
    }
  }
  