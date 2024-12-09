import { Component } from '@angular/core';

import { Need } from './need';
import { NeedService } from '../need.service';

@Component({
  selector: 'app-need',
  templateUrl: './need.component.html',
  styleUrl: './need.component.css'
})
export class NeedComponent {
  needs: Need [] = [];

  constructor(private needService: NeedService) { }  

  ngOnInit(): void {
    this.getNeeds();
  }

  getNeeds(): void {
    this.needService.getNeeds()
    .subscribe(needs => this.needs = needs);
  }

  add(name: string): void {
    name = name.trim();
    if(!name) {return;}
    this.needService.addNeed({ name } as Need)
    .subscribe(need => {
      this.needs.push(need);
    });
  }

  delete(need: Need): void {
    this.needs = this.needs.filter(n => n !== need);
    this.needService.deleteNeed(need.id).subscribe();
  }
}
