import { Injectable, NotFoundException } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../entities/contact.entity';
import { CreateContactRequest } from '../requests/create-contact.request';
import { ContactResponse } from '../responses/contact.response';
import { UpdateContactRequest } from '../requests/update-contact.request';
import { Pagination } from 'src/utilities/Pagination';
import { ContactStatus } from '../enums/enum-status.enum';
import { SearchContactRequest } from '../requests/search-contact.request';

// Tài liệu: https://docs.nestjs.com/providers#services
@Injectable()
export class ContactService {
  private static contacts: Array<Contact> = [];

  constructor(
    @InjectRepository(Contact)
    private contactRepository: Repository<Contact>,
  ) {}

  async search(searchRequest: SearchContactRequest): Promise<Pagination> {
    const result = await this.contactRepository.findAndCount({
      relations: {},
      where: {
        full_name: ILike(`%${searchRequest.keyword || ''}%`),
      },
      order: { contact_id: 'DESC' }, // ORDER BY
      take: searchRequest.limit, // Tương đương LIMIT
      skip: searchRequest.getOffset(), // Tương đương OFFSET
    });

    return new Pagination(result[1], result[0]);
  }

  async create(
    createContact: CreateContactRequest,
    user_id: number,
  ): Promise<void> {
    const contact: Contact = new Contact();
    contact.contact_id = createContact.contact_id;
    contact.full_name = createContact.full_name;
    contact.email = createContact.email;
    contact.content = createContact.content;
    contact.status = ContactStatus.NEW_CONTACT;
    contact.created_by_id = user_id;
    contact.updated_by_id = user_id;
    await this.contactRepository.save(contact);
  }

  async find(contact_id: number): Promise<ContactResponse> {
    const contact: Contact = await this.contactRepository.findOneBy({
      contact_id,
    });

    // Kiểm tra người dùng có tồn tại hay không ?
    if (!contact) {
      throw new NotFoundException();
    }

    return new ContactResponse(contact);
  }

  async update(
    contact_id: number,
    updateContact: UpdateContactRequest,
  ): Promise<ContactResponse> {
    const contact: Contact = await this.contactRepository.findOneBy({
      contact_id,
    });

    // Kiểm tra người dùng có tồn tại hay không ?
    if (!contact) {
      throw new NotFoundException();
    }
    const updatecontactResponse = {
      ...contact,
      content: updateContact.content,
      status: updateContact.status,
    };

    await this.contactRepository.update(
      { contact_id: contact_id },
      updatecontactResponse,
    );

    return await this.find(contact_id);
  }

  async delete(contact_id: number): Promise<void> {
    const contact: Contact = await this.contactRepository.findOneBy({
      contact_id,
    });

    // Kiểm tra người dùng có tồn tại hay không ?
    if (!contact) {
      throw new NotFoundException();
    }

    this.contactRepository.softRemove({ contact_id });
  }
}
