import { Component, OnInit} from '@angular/core';
import { Need } from '../need/need';
import { NeedService } from '../need.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-add-remove',
  templateUrl: './admin-add-remove.component.html',
  styleUrl: './admin-add-remove.component.css'
})
export class AdminAddRemoveComponent implements OnInit {
    cupboardNeeds: Need[] = [];
    needsInBundle: Need[] = [];

    constructor(private needService: NeedService, private authService: AuthService, private router: Router) { 
    }

    ngOnInit(): void {
        this.loadCupboard();
    }

    loadCupboard(): void {
      this.needService.getNeeds().subscribe(needs => {
        this.cupboardNeeds = needs;
      });
    }

    addNeed(): void {
      const need: Need = {
        id: 0,
        name: 'new need',
        cost: 0,
        quantity: 1,
        type: 'type'
      };

      this.cupboardNeeds.unshift(need);

      this.needService.addNeed(need).subscribe(newNeed => {
        const idx = this.cupboardNeeds.indexOf(need);
        if (idx > -1) {
          this.cupboardNeeds[idx] = newNeed;
        }
      });
    }

    updateNeed(need: Need): void {
      this.needService.updateNeed(need).subscribe();
    }

    deleteNeed(id: number): void {
      this.needService.deleteNeed(id).subscribe(() => {
        this.cupboardNeeds = this.cupboardNeeds.filter((need) => need.id !== id);
      });
    }

    createBundle(): void {
      let bundleType = this.needsInBundle.map(need => need.name).join(', ')
      const bundleNeed: Need = {
        id: 0,
        name: 'bundle',
        cost: 0,
        quantity: 1,
        type: `bundle:${bundleType}`
      };
      this.cupboardNeeds.unshift(bundleNeed);

      this.needService.addNeed(bundleNeed).subscribe(newNeed => {
        const idx = this.cupboardNeeds.indexOf(bundleNeed);
        if (idx > -1) {
          this.cupboardNeeds[idx] = newNeed;
        }
      });
    }

    getNamesInBundle(need: Need): String[] {
      return need.type.substring(7).split(',') //needs start after bundle:
    }

    isBundle(need: Need): boolean {
      return need.type.startsWith('bundle:');
    }
}
