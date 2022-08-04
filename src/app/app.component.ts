import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'timer';
  public readonly LAP_RECORD:string = 'lap';
  public timer: number | undefined;
  public isToggleStart: boolean = false;
  public hour: number = 0;
  public min: number = 0;
  public sec: number = 0;
  public ms: number = 0
  public lapRecord: string[] = [];

  constructor() {
    let lapRecord:string = localStorage.getItem(this.LAP_RECORD) || '[]';
    this.lapRecord = JSON.parse(lapRecord);
  }

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

  public countTimer(): void {
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
    this.lapRecord.push(`${this.hour < 10 ? '0' + this.hour : this.hour}:${(this.min < 10 ? '0' + this.min : this.min)}:${this.sec < 10 ? '0' + this.sec : this.sec}:${this.ms < 10 ? '0' + this.ms : this.ms}`)
    this.updateLocalStorage(this.lapRecord);
  }

  public reset(): void {
    this.hour = 0;
    this.min = 0;
    this.sec = 0;
    this.ms = 0;
    this.lapRecord = [];
    this.updateLocalStorage(this.lapRecord);
  }

  public updateLocalStorage(saveRecord: string[]): void {
    localStorage.setItem(this.LAP_RECORD, JSON.stringify(saveRecord));
  }
}
