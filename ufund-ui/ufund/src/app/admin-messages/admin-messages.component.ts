import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrl: './admin-messages.component.css'
})
export class AdminMessagesComponent {
  constructor(public messageService: MessageService) {}
}
