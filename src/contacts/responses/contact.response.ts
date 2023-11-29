import { Contact } from '../entities/contact.entity';

export class ContactResponse {
  contact_id: number;

  fullname: string;

  email: string;

  content?: string;

  status: number;

  constructor(contact: Contact) {
    this.contact_id = contact.contact_id;
    this.fullname = contact.fullname;
    this.email = contact.email;
    this.content = contact.content;
    this.status = contact.status;
  }
}
