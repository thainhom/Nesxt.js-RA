import { Contact } from '../entities/contact.entity';

export class ContactResponse {
  contact_id: number;

  full_name: string;

  email: string;

  content?: string;

  status: number;

  constructor(contact: Contact) {
    this.contact_id = contact.contact_id;
    this.full_name = contact.full_name;
    this.email = contact.email;
    this.content = contact.content;
    this.status = contact.status;
  }
}
