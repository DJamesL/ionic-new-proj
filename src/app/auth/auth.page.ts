import { Observable } from "rxjs";
import { Component, OnInit } from "@angular/core";
import { AuthGuard } from "./auth.guard";
import { AuthService, AuthResponseData } from "./auth.service";
import { Router } from "@angular/router";
import { LoadingController, AlertController } from "@ionic/angular";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Logging in.." })
      .then(loadingEl => {
        loadingEl.present();
        let authObs: Observable<AuthResponseData>;
        if (this.isLogin) {
          authObs = this.authService.login(email, password);
        } else {
          authObs = this.authService.signup(email, password);
        }
        authObs.subscribe(
          resData => {
            console.log(resData);
            this.isLoading = false;
            loadingEl.dismiss();
            this.router.navigateByUrl("/places/tabs/discover");
          },
          errData => {
            loadingEl.dismiss();
            const code = errData.error.error.message;
            let message = "Could not sign you up, please try again";
            if (code === "EMAIL_EXISTS") {
              message = "This email address is already taken";
            } else if (code === "EMAIL_NOT_FOUND") {
              message = "This email address not yet signed-up";
            } else if (code === "INVALID_PASSWORD") {
              message = "Invalid password, try again";
            }
            this.showAlert(message);
            // console.log(errData);
          }
        );
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email; //email here is the name/tag from html file
    const password = form.value.password;
    console.log(email, password);

    this.authenticate(email, password);

    // if (this.isLogin) {
    //   //send a request to Login server
    //   console.log("Connecting to LOGIN Server");
    // } else {
    //   //send a request to Sign-up server
    //   console.log("Connecting to Sign-up Server");
    //   // this.authService.signup(email, password).subscribe(resData => {
    //   //   console.log(resData);
    //   // });
    // }
  }

  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "Authentication Failed",
        message: message,
        buttons: ["Okay"]
      })
      .then(alertEl => alertEl.present());
  }
}
