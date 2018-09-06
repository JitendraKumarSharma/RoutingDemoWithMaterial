import { MatDialogConfig } from '@angular/material/dialog';
import { OnInit } from '@angular/core';

export class Global {
    //For ASP.Net WebAPI
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
}