import { Company } from './company'

export interface User {
  entry: {
    lastName?: string,
    userStatus?: string,
    jobTitle?: string,
    statusUpdatedAt?: string,
    mobile?: string,
    emailNotificationsEnabled: boolean,
    description?: string,
    telephone?: string,
    enabled: boolean,
    firstName: string,
    skypeId?: string,
    avatarId?: string,
    location?: string,
    company?: Company,
    id: string,
    email?: string
  }
}
