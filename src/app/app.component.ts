import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timer';
  public timer: number | undefined;
  public isToggleStart: boolean = false;
  public hour: number = 0;
  public min: number = 0;
  public sec: number = 0;
  public ms: number = 0
  public lapRecord:string[] = [];

  public startStop(): void {
    this.isToggleStart = !this.isToggleStart
    if (this.isToggleStart) {
      this.timer = setInterval(() => {
        this.countTimer()
      }, 10);
    } else {
      clearInterval(this.timer);
    }
  }

  public countTimer():void {
    this.ms++;
    if (this.ms > 99) {
      this.ms = 0;
      this.sec++;
      if (this.sec > 59) {
        this.sec = 0;
        this.min++;
        if (this.min > 59) {
          this.min = 0;
          this.hour++;
        }
      }
    }
  }

  public lap(): void {

    this.lapRecord.push(`${this.hour}:${this.min}:${this.sec}:${this.ms}`)
  }
}
