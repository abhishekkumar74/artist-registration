# ArtistHub - Artist Management Platform

ArtistHub is a platform designed to connect talented artists with opportunities. It provides a streamlined registration process, 
professional management tools, and seamless collaboration features for artists and managers.

## Features

- **Artist Registration**: Easy-to-use registration form with comprehensive validation and professional presentation.
- **Manager Dashboard**: Powerful dashboard to review, approve, and manage artist applications with advanced filtering.
- **Professional Portfolio**: Showcase artist talents with detailed profiles including skills, availability, and pricing.
- **Application Tracking**: Real-time status updates and seamless communication between artists and managers.

## Project Structure

The project follows a modular structure for better maintainability:

├── app/ # Application pages and layouts │ 
├── artist/ # Artist-specific pages │ 
├── manager/ # Manager-specific pages │ 
├── globals.css # Global styles │ 
├── layout.tsx # Root layout │ 
└── page.tsx # Home page 
├── components/ # Reusable UI components │ 
├── ui/ # UI-specific components 
│ └── Navigation.tsx # Navigation bar 
├── contexts/ # React context providers 
├── hooks/ # Custom React hooks 
├── lib/ # Utility functions and types 
├── public/ # Static assets 
├── styles/ # Tailwind CSS configuration 
├── .next/ # Next.js build output 
├── package.json # Project dependencies and scripts 
├── tailwind.config.ts # Tailwind CSS configuration 
└── tsconfig.json # TypeScript configuration
