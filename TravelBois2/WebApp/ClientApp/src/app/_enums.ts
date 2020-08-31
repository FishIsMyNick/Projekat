export function GetStringValues(e) {
    let len =  Object.keys(e).length / 2;
    let ret = new Array<string>();
    for (let i = 0; i < len; i++){
      ret.push(e[i].toString());
    }
    return ret;
}
export enum Period {
    dan = 1,
    nedelja,
    mesec,
    godina
}

export enum TipPrtljaga {
    rucni,
    mali,
    veliki
}

export enum Klase {
    business,
    first,
    economy
}

export enum TipVozila {
    Karavan,
    Sport,
    Kupe,
    Kombi,
    Hecbek,
    Sedan,
    MUV_SUV,
    Kabriolet,
    Wagon,
}

export enum RentPrikaz {
    listaKompanija = 1,
    kompanija,
    kola,
    ocenjivanje
}

export enum Meseci {
    January,
    February,
    March,
    April,
    May,
    June,
    Jully,
    August,
    September,
    October,
    November,
    December
}