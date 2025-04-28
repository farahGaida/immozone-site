import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface ContactMessage {
  email: string;
  subject: string;
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private messages: ContactMessage[] = [];

  constructor() { }

  submitContactForm(message: Omit<ContactMessage, 'timestamp'>): Observable<boolean> {
    // In a real application, this would make an HTTP request to your backend
    // For now, we'll store it in memory
    const newMessage: ContactMessage = {
      ...message,
      timestamp: new Date()
    };
    this.messages.push(newMessage);
    return of(true);
  }

  getMessages(): ContactMessage[] {
    return [...this.messages];
  }
} 