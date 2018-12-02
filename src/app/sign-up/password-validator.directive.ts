import { Validator, FormGroup, FormControl, AbstractControl, NG_VALIDATORS } from "@angular/forms";
import { Directive } from "@angular/core";


@Directive ({
    selector: '[validatePassword]',
    providers: [
        {
            provide: NG_VALIDATORS, 
            useExisting: PasswordValidator,
            multi: true
        }
    ]
})
export class PasswordValidator implements Validator {
    
    validate(control: FormControl) {
        let value = control.value;
        if (value.length > 8 && this.hasLowerCase(value) &&
            this.hasUpperCase(value) && this.hasNumeric(value))
            return null;
        
        return {validatePassword: 'true'};
    }

    hasLowerCase(value: string) {
        return (/[a-z]/.test(value));
    }

    hasUpperCase(value: string) { 
        return (/[A-Z]/.test(value));
    }

    hasNumeric(value: string) {
        return (/[0-9]/.test(value));
    }

}