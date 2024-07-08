import { Component } from '@angular/core';

@Component({
  selector: 'app-session-timer',
  templateUrl: './session-timer.component.html',
  styleUrls: ['./session-timer.component.css']
})
export class SessionTimerComponent {
  private timerId: number | null = null;

  startTimer() {
    this.stopTimer(); // Ensure previous timer is stopped
    this.timerId = window.setTimeout(() => {
      window.location.href = '/session-Expired';
      // this.authService.logoutUser(); // Call logout function on timeout
      this.startTimer(); // Restart the timer for continuous checks
    }, 300000); // 5 minutes in milliseconds
  }

  stopTimer() {
    if (this.timerId) {
      this.logOut()
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  // constructor(private authService: authGuard) {}
  logOut(){
    localStorage.removeItem("roles")
    localStorage.removeItem("Token")
    window.location.href='/login9'
  }
}
