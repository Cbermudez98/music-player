import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-switchlang',
  templateUrl: './switchlang.component.html',
  styleUrls: ['./switchlang.component.scss']
})
export class SwitchlangComponent implements OnInit {
  public currentLang = "Es";
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
  }

  changeLang() {
    if (localStorage.getItem("lang") === "es") {
      localStorage.setItem("lang", "en")
      this.translate.use("en");
    } else {
      localStorage.setItem("lang", "es")
      this.translate.use("es");
    }
  }
}
