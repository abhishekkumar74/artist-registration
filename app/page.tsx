'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Music, Users, Star, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function Home() {
  const features = [
    {
      icon: Music,
      title: 'Artist Registration',
      description: 'Easy-to-use registration form with comprehensive validation and professional presentation.',
      href: '/artist/register'
    },
    {
      icon: Users,
      title: 'Manager Dashboard',
      description: 'Powerful dashboard to review, approve, and manage artist applications with advanced filtering.',
      href: '/manager/dashboard'
    },
    {
      icon: Star,
      title: 'Professional Portfolio',
      description: 'Showcase your talents with detailed profiles including skills, availability, and pricing.'
    },
    {
      icon: CheckCircle,
      title: 'Application Tracking',
      description: 'Real-time status updates and seamless communication between artists and managers.'
    }
  ];

  const stats = [
    { number: '500+', label: 'Artists Registered' },
    { number: '50+', label: 'Categories' },
    { number: '95%', label: 'Approval Rate' },
    { number: '24/7', label: 'Support' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-8">
              <Music className="h-16 w-16 text-blue-600 mx-auto mb-6" />
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                Welcome to{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ArtistHub
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                The premier platform connecting talented artists with opportunities. 
                Streamlined registration, professional management, and seamless collaboration.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link href="/artist/register">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  Register as Artist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/manager/dashboard">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                >
                  Manager Dashboard
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive tools and features designed for modern artist management
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="backdrop-blur-sm bg-white/90 border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        <feature.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                      {feature.href && (
                        <Link href={feature.href} className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-700 font-medium">
                          Get Started
                          <ArrowRight className="ml-1 h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Card className="backdrop-blur-sm bg-white/90 border-0 shadow-xl">
            <CardContent className="p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join our community of talented artists and professional managers. 
                Create your profile today and start your journey.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/artist/register">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    Join as Artist
                    <Music className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/manager/dashboard">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 font-semibold px-8 py-4 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                  >
                    Manage Artists
                    <Users className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}