import { MatDialogConfig } from '@angular/material/dialog';
import { OnInit } from '@angular/core';
import { AbstractControl } from "@angular/forms";

export class Global {
    //For ASP.Net WebAPI
    public apiLogin: string = "http://localhost:2321";
    public apiUrl: string = "http://localhost:2321/api";
    public imageUrl: string = "http://localhost:2321/UploadFile";

    public dialogConfig;
    constructor() {
        this.dialogConfig = new MatDialogConfig();
        this.dialogConfig.disableClose = true;
        this.dialogConfig.autoFocus = true;
        this.dialogConfig.width = '11%'
        // dialogConfig.position = {
        //   top: '0',
        //   left: '0'
        // };
    }
    //export class PasswordValidation {
    static MatchPassword(AC: AbstractControl) {
        let password = AC.get("password").value; // to get value in input tag
        let confirm_password = AC.get("confirm_password").value; // to get value in input tag
        if (password != confirm_password) {
            AC.get("confirm_password").setErrors({ MatchPassword: true });
        } else {
            return null;
        }

    }
    //}

}