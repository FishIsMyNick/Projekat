export class OcenaAviokompanije {
    userID: string;
    value: number;
    kompanija: string;
  
    constructor(value: number, userID: string, avio: string) {
      this.userID = userID;
      this.value = value;
      this.kompanija = avio;
    }
  }
  