import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.contactForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      this.contactService.submitContactForm(this.contactForm.value).subscribe({
        next: (success) => {
          if (success) {
            Swal.fire({
              icon: 'success',
              title: 'Message Sent!',
              text: 'Thank you for contacting us. We will get back to you soon.',
              confirmButtonText: 'OK'
            }).then(() => {
              this.contactForm.reset();
              this.isSubmitting = false;
            });
          }
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'There was a problem sending your message. Please try again later.',
            confirmButtonText: 'OK'
          });
          this.isSubmitting = false;
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
