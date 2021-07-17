import { FormGroup, FormControl, FormArray } from '@angular/forms';

export class CustomValidations {

    constructor() {
    }


    /**
   * @description To validate each field individually
   * @param data data coming from the subscription of value changes from each form
   *  initialization,contains object with all the from fields.
   * @param formGroup full form details with type 'formGroup'
   * @param formFields initialization of each form fields with empty values (class,interface)
   * @param validationMessages The messages which need to be displayed after
   *  getting any of the error
   */
    validate(data: any, formGroup: FormGroup, formFields, validationMessages): void {
        // tslint:disable-next-line:curly
        if (!formGroup) return;
        // tslint:disable-next-line:forin
        for (const field in formFields) {
            formFields[field] = '';
            const input = formGroup.get(field);
            if (input.invalid && input.dirty || input.invalid && input.touched) {
                // tslint:disable-next-line:forin
                for (const errors in input.errors) {
                    // console.log(errors, input);

                    formFields[field] = validationMessages[field][errors];
                }
            } else {
                formFields[field] = false;
            }
        }
    }

    /**
     * @description To validate all the from fields when submit button is pressed before the form becomes valid
     * @param formGroup full form details with type 'formGroup'
     * @param formFields initialization of each form fields with empty values (class,interface)
     * @param validationMessages The messages which need to be displayed after
     *  getting any of the error
     */
    validateAllFormFields(formGroup: FormGroup, formFields, validationMessages) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl || FormArray) {
                control.markAsTouched({ onlySelf: true });
                if (control.invalid) {
                    // console.log('let check the error', control.errors, field);
                    // tslint:disable-next-line:forin
                    for (const errors in control.errors) {
                        formFields[field] = validationMessages[field][errors];
                    }
                } else {
                    formFields[field] = false;
                }
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control, formFields, validationMessages);
            }
        });
    }

    clearOnRouteChange(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                obj[key] = '';
            }
        }
    }
}

export class FormFields {
    static loginForm = {
        email: '',
        password:''
    }
    static registerForm = {
        organizationName: '',
        eventName: ''
    }

}
export class ValidationMessages {
    static loginMessages = {
        email: {
            required: 'Required'
        },
        password: {
            required: 'Required'
        }
    }
    static registerMessages = {
        organizationName: {
            required: 'Required',
            pattern: ''
        },
        eventName: {
            required: 'Required',
            pattern: 'Should be only Alphabets , numbers and _ are allowed'
        }
    }

}