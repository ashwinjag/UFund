import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrl: './user-messages.component.css'
})
export class UserMessagesComponent {
  constructor(public messageService: MessageService) {}
  
}
