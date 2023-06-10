import {Component, ViewChild, ViewEncapsulation, OnInit} from '@angular/core';
import {QrScannerComponent} from 'angular2-qrscanner';
import { DataService } from '../service/Data.service';
import { Router  } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-qr-check',
  templateUrl: './qr-check.component.html',
  styleUrls: ['./qr-check.component.css']
})
export class QrCheckComponent implements OnInit{

  constructor(private dataService: DataService,private http: HttpClient,private router: Router){}

   @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;
   ngAfterViewInit(){
      this.qrScannerComponent.getMediaDevices().then(devices => {
            console.log(devices);
            const videoDevices: MediaDeviceInfo[] = [];
            for (const device of devices) {
                if (device.kind.toString() === 'videoinput') {
                    videoDevices.push(device);
                }
            }
            if (videoDevices.length > 0){
                let choosenDev;
                for (const dev of videoDevices){
                    if (dev.label.includes('front')){
                        choosenDev = dev;
                        break;
                    }
                   
                }
                if (choosenDev) {
                  
                    this.qrScannerComponent.chooseCamera.next(choosenDev);
                } else {
                    this.qrScannerComponent.chooseCamera.next(videoDevices[0]);
                }
            }
        });

        this.qrScannerComponent.capturedQr.subscribe(result => {
            var actual = JSON.parse(atob(result))
            this.dataService.setData(actual);
            this.router.navigate(['/info']);
        });
  }
    ngOnInit() {
        
    }
}
