import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  public hostaddress: any = '?';
  public youraddress: any = '?';
  public location: any = '?';
  public latency: any = '? ms';


  ngOnInit() {
    setInterval(async () => {
      this.latency  = await new Promise((resolve, reject) => {
        let started = new Date().getTime();
        let url = '../assets/files/data.json?t=' + +new Date();

        fetch(url)
          .then(function (response) {
            let ended = new Date().getTime();
            let milliseconds = ended - started;
            const ele = document.getElementById('latency');
            resolve(milliseconds + ' ms');
          })
          .catch(function (error) {
            //console.log(error);
            //clearInterval(timerLatency)
            resolve('? ms');
          });
      });
    }, 1000);
    this.getVisitorInfos();
  }
  async getVisitorInfos() {
    let visitorInfos: any;

    this.hostaddress = window.location.host;

    if (localStorage.getItem('visitorInfos') == null) {
      await fetch('https://ipinfo.io/json')
        .then(async function (response) {
          visitorInfos = await response.json();
          localStorage.setItem('visitorInfos', JSON.stringify(visitorInfos));
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      visitorInfos = JSON.parse('' + localStorage.getItem('visitorInfos'));
    }

    this.youraddress = visitorInfos.ip ?? '?';
    this.location = visitorInfos.country
      ? visitorInfos.country + ', ' + visitorInfos.city
      : '?';
  }
}
