import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Ilogin } from '../../../../src/app/Components/login-design/login-design.interface'
import { CommanService } from '../../../../src/app/Shared/service/comman.service';
import { AlertIcon,AlertMessage } from '../../../../src/app/Components/login-design/swt-alert.enum';
import { showWarningMessage} from '../../Shared/utilities/swal_utilities';
import { EncryptionService } from '../../../../src/app/Shared/service/encryption.service';
import { AuthService } from '../../../../src/app/Shared/guard/auth.service';

@Component({
  selector: 'app-login-design',
  templateUrl: './login-design.component.html',
  styleUrls: ['./login-design.component.scss']
})
export class LoginDesignComponent implements OnInit {
  private authTokenKey: string = 'authToken';

  public login:Ilogin={
    emailId: '',
    password: ''
  };
  public showCred:boolean = false;
  public loginForm: any 
  public response: any;
  data: any;
  candidateId:any;
  constructor(public router: Router,private authService:AuthService, private commanService: CommanService,private encryptionService: EncryptionService) {}

  ngOnInit(): void {
  }
 
  
  onSubmit() {
    let token='token'
  //this.authService.login(token);
   this.commanService.login(this.login,token).subscribe(alldata => {
      this.response = alldata;
    let token = this.response.token;
      // Check if encryption service is available
      if (this.encryptionService) {
        // Encrypt and store data in local storage
        const encryptedData = {
          batchId: this.encryptionService.encrypt(this.response.data.batchId),
          quizId: this.encryptionService.encrypt(this.response.data.quizId),
          quizTemplateId: this.encryptionService.encrypt(this.response.data.quizTemplateId),
          candidateId: this.encryptionService.encrypt(this.response.data.candidateId),
          emailId: this.encryptionService.encrypt(this.response.emailId),
        };

        // Store the encrypted values in local storage
        localStorage.setItem('encryptedData', JSON.stringify(encryptedData));
          if (this.response.statusCode === 200) {
            this.authService.login(token);
          if (this.response.data?.candidateId) {
            this.router.navigate(['/landing']);
          } else if (this.response.data?.organizationProfileId) {
            this.router.navigate(['/dashboard/home']);
        }  else if (this.response.data === "Login Expired.") {
          localStorage.removeItem(this.authTokenKey)
          showWarningMessage(this.response.data);
        } else {
          this.router.navigate(['/login']);
        }
  
      }
      else if (this.response.statusCode === 201) {
        showWarningMessage(this.response.data);
      }
    }
     
    });
  }
  
  
}
