'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Artist, ArtistFormData } from '@/lib/types';

interface ArtistContextType {
  artists: Artist[];
  addArtist: (artistData: ArtistFormData) => void;
  updateArtistStatus: (id: string, status: Artist['status']) => void;
  deleteArtist: (id: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterCategory: string;
  setFilterCategory: (category: string) => void;
  filterStatus: string;
  setFilterStatus: (status: string) => void;
}

const ArtistContext = createContext<ArtistContextType | undefined>(undefined);

export const useArtist = () => {
  const context = useContext(ArtistContext);
  if (!context) {
    throw new Error('useArtist must be used within an ArtistProvider');
  }
  return context;
};

const generateMockArtists = (): Artist[] => [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1234567890',
    category: 'Singer/Vocalist',
    city: 'Los Angeles',
    state: 'California',
    fee: 2500,
    experience: 'Advanced (6-10 years)',
    skills: ['Live Performance', 'Studio Recording', 'Composition'],
    bio: 'Professional vocalist with over 8 years of experience in jazz and contemporary music. Performed at major venues across California and has collaborated with renowned artists.',
    portfolio: 'https://sarahjohnson.com',
    availability: ['Weekends', 'Evenings'],
    submittedAt: new Date('2024-01-15'),
    status: 'approved'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    email: 'marcus.rodriguez@email.com',
    phone: '+1987654321',
    category: 'Musician',
    city: 'Nashville',
    state: 'Tennessee',
    fee: 1800,
    experience: 'Expert (10+ years)',
    skills: ['Live Performance', 'Composition', 'Teaching', 'Audio Production'],
    bio: 'Multi-instrumentalist specializing in guitar and piano. Has toured internationally and produced music for various artists. Currently teaching at Nashville Music Academy.',
    portfolio: 'https://marcusmusic.com',
    availability: ['Weekdays', 'Weekends', 'Tours/Travel'],
    submittedAt: new Date('2024-01-12'),
    status: 'pending'
  },
  {
    id: '3',
    name: 'Emma Chen',
    email: 'emma.chen@email.com',
    phone: '+1555123456',
    category: 'Dancer',
    city: 'New York',
    state: 'New York',
    fee: 1500,
    experience: 'Intermediate (3-5 years)',
    skills: ['Live Performance', 'Teaching', 'Social Media'],
    bio: 'Contemporary and hip-hop dancer with experience in music videos and live performances. Passionate about teaching dance to young artists and creating engaging content.',
    portfolio: 'https://emmadance.com',
    availability: ['Evenings', 'Weekends'],
    submittedAt: new Date('2024-01-10'),
    status: 'approved'
  },
  {
    id: '4',
    name: 'David Thompson',
    email: 'david.thompson@email.com',
    phone: '+1444567890',
    category: 'Photographer',
    city: 'Austin',
    state: 'Texas',
    fee: 3200,
    experience: 'Advanced (6-10 years)',
    skills: ['Video Production', 'Social Media', 'Marketing', 'Event Planning'],
    bio: 'Professional photographer specializing in concert and event photography. Has worked with major music festivals and artists, creating stunning visual content that captures the essence of live performances.',
    portfolio: 'https://davidphoto.com',
    availability: ['Weekdays', 'Weekends', 'Holidays', 'Tours/Travel'],
    submittedAt: new Date('2024-01-08'),
    status: 'rejected'
  }
];

export const ArtistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  useEffect(() => {
    // Initialize with mock data
    setArtists(generateMockArtists());
  }, []);

  const addArtist = (artistData: ArtistFormData) => {
    const newArtist: Artist = {
      ...artistData,
      id: Date.now().toString(),
      submittedAt: new Date(),
      status: 'pending'
    };
    setArtists(prev => [newArtist, ...prev]);
  };

  const updateArtistStatus = (id: string, status: Artist['status']) => {
    setArtists(prev => 
      prev.map(artist => 
        artist.id === id ? { ...artist, status } : artist
      )
    );
  };

  const deleteArtist = (id: string) => {
    setArtists(prev => prev.filter(artist => artist.id !== id));
  };

  return (
    <ArtistContext.Provider value={{
      artists,
      addArtist,
      updateArtistStatus,
      deleteArtist,
      searchTerm,
      setSearchTerm,
      filterCategory,
      setFilterCategory,
      filterStatus,
      setFilterStatus
    }}>
      {children}
    </ArtistContext.Provider>
  );
};