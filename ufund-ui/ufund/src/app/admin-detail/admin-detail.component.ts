import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Need } from '../need/need';
import { NeedService } from '../need.service';

@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrl: './admin-detail.component.css'
})

export class AdminDetailComponent implements OnInit{
  need: Need | undefined;

  constructor(
    private route: ActivatedRoute,
    private needService: NeedService,
    private loation: Location
  ) {}

  ngOnInit(): void {
    this.getNeed();
  }

  getNeed(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.needService.getNeed(id)
      .subscribe(need => this.need = need);
  }

  goBack(): void {
    this.loation.back();
  }

  save(): void {
    if (this.need) {
      this.needService.updateNeed(this.need)
        .subscribe(() => this.goBack());
    }
  }
}
