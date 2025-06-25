export interface Artist {
  id: string;
  name: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  state: string;
  fee: number;
  experience: string;
  skills: string[];
  bio: string;
  portfolio: string;
  availability: string[];
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

export interface ArtistFormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  city: string;
  state: string;
  fee: number;
  experience: string;
  skills: string[];
  bio: string;
  portfolio: string;
  availability: string[];
}

export const CATEGORIES = [
  'Musician',
  'Singer/Vocalist',
  'Dancer',
  'Visual Artist',
  'Photographer',
  'Actor/Actress',
  'Comedian',
  'DJ',
  'Other'
] as const;

export const EXPERIENCE_LEVELS = [
  'Beginner (0-2 years)',
  'Intermediate (3-5 years)',
  'Advanced (6-10 years)',
  'Expert (10+ years)'
] as const;

export const SKILLS_OPTIONS = [
  'Live Performance',
  'Studio Recording',
  'Composition',
  'Improvisation',
  'Teaching',
  'Audio Production',
  'Video Production',
  'Social Media',
  'Marketing',
  'Event Planning'
] as const;

export const AVAILABILITY_OPTIONS = [
  'Weekdays',
  'Weekends',
  'Evenings',
  'Daytime',
  'Holidays',
  'Tours/Travel'
] as const;

export const US_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Lakshadweep'
] as const;