import { z } from 'zod';
import { CATEGORIES, EXPERIENCE_LEVELS, SKILLS_OPTIONS, AVAILABILITY_OPTIONS, US_STATES } from './types';

export const artistRegistrationSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^[\+]?[1-9][\d]{0,15}$/, 'Please enter a valid phone number'),
  
  category: z.enum(CATEGORIES, {
    required_error: 'Please select a category'
  }),
  
  city: z.string()
    .min(2, 'City must be at least 2 characters')
    .max(100, 'City must be less than 100 characters'),
  
  state: z.enum(US_STATES, {
    required_error: 'Please select a state'
  }),
  
  fee: z.number()
    .min(0, 'Fee must be a positive number')
    .max(100000, 'Fee must be less than $100,000'),
  
  experience: z.enum(EXPERIENCE_LEVELS, {
    required_error: 'Please select your experience level'
  }),
  
  skills: z.array(z.string())
    .min(1, 'Please select at least one skill')
    .max(10, 'Please select no more than 10 skills'),
  
  bio: z.string()
    .min(50, 'Bio must be at least 50 characters')
    .max(1000, 'Bio must be less than 1000 characters'),
  
  portfolio: z.string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  
  availability: z.array(z.string())
    .min(1, 'Please select at least one availability option')
});

export type ArtistRegistrationFormData = z.infer<typeof artistRegistrationSchema>;