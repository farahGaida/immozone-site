import { Component, OnInit } from '@angular/core';
import { ContactService, ContactMessage } from '../../services/contact.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: [],
  standalone: true,
  imports: [CommonModule]
})
export class ContactListComponent implements OnInit {
  messages: ContactMessage[] = [];

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.messages = this.contactService.getMessages();
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleString();
  }
} 