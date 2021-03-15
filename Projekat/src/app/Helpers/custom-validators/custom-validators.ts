import { FormControl } from '@angular/forms';

export function NoSpecialChars(control: FormControl) {
    let pattern = /[\[\]\{\}()!@\#$%^&*_\-=+\\/|.,:;"'?><]/gi; // can change regex with your requirement
    //if validation fails, return error name & value of true
    if (pattern.test(control.value)) {
        return { validString: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}

export function NoSpace(control: FormControl) {
    let pattern = /[ ]/gi; // can change regex with your requirement
    //if validation fails, return error name & value of true
    if (pattern.test(control.value)) {
        return { validString: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}
export function NoFullstop(control: FormControl) {
    let pattern = /[.]/gi; // can change regex with your requirement
    //if validation fails, return error name & value of true
    if (pattern.test(control.value)) {
        return { validString: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}

export function ValidateNumber(control: FormControl) {
    //if validation fails, return error name & value of true
    if (control.value < 0) {
        return { validString: true };
    }
    //otherwise, if the validation passes, we simply return null
    return null;
}

export function ValidatePassword(control: FormControl) {
    let pattern = /[1234567890]/gi; // can change regex with your requirement
    //da li ima bar jedan broj
    if (pattern.test(control.value)) {
        return null;
    }
    //nema, ne moze
    return { validString: true };
}