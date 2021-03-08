import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validator, Validators } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class FormsService {
  constructor() {}

  noEmptySpaceValidator(control: FormControl) {
    const isWhitespace = (control.value || "").trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { emptySpace: true };
  }

  fieldHasError(form: FormGroup, formControlName: string): boolean {
    return (
      !form.get(formControlName).valid && form.get(formControlName).touched
    );
  }

  onlyAlphabetCharactersValidator() {
    return Validators.pattern("^[a-zA-Z ]*$");
  }
}
