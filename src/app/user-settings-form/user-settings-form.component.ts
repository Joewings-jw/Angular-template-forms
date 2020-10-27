import { Component, OnInit } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { Observable } from 'rxjs';
import { DataService } from '../data/data.service';
import { UserSettings } from '../data/userSettings';


@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  user_settings: UserSettings = {
    name: null,
    emailOffers:true,
    interfaceStyle:'light',
    subscriptionType:'Monthly',
    notes:'Really soon'
  }


  start_date: Date;
  post_error: boolean=false;
  post_error_message = '';
  subscription_types:Observable<string[]>;
  single_model = "on";
 

  constructor(private data_service:DataService) { }

  ngOnInit(){
    this.subscription_types = this.data_service.get_subscription_types();
    this.start_date =  new Date();
  }

  on_blur(field: NgModel){
    console.log('in oblur: ', field.valid)
  }

  on_http_error(errorResponse:any){
    console.log('error', errorResponse);
    this.post_error = true;
    this.post_error_message = errorResponse.error.errorMessage;
  }
  on_submit(form: NgForm){
    console.log('in onsubmit: ', form.valid);

    if(form.valid){
      this.data_service.post_user_settingsForm(this.user_settings).subscribe(
        res=> console.log('success', res),
        err=>this.on_http_error(err.error)
      ) 
    }else {
      this.post_error = true;
      this.post_error_message = "Please fix the above error"
      
    }
  }

}
