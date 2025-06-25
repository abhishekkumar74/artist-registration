'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, CheckCircle, XCircle, Eye, Trash2, Phone, Mail, Globe, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useArtist } from '@/contexts/ArtistContext';
import { Artist } from '@/lib/types';
import { CATEGORIES } from '@/lib/types';

const StatusBadge = ({ status }: { status: Artist['status'] }) => {
  const variants = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    approved: 'bg-green-100 text-green-800 border-green-200',
    rejected: 'bg-red-100 text-red-800 border-red-200'
  };

  const icons = {
    pending: Calendar,
    approved: CheckCircle,
    rejected: XCircle
  };

  const Icon = icons[status];

  return (
    <Badge className={`${variants[status]} flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
};

const ArtistDetailModal = ({ artist }: { artist: Artist }) => {
  return (
    <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle className="text-2xl font-bold text-gray-900">
          {artist.name}
        </DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        {/* Status and Basic Info */}
        <div className="flex items-center justify-between">
          <StatusBadge status={artist.status} />
          <div className="text-sm text-gray-500">
            Submitted {artist.submittedAt.toLocaleDateString()}
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{artist.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-gray-500" />
              <span className="text-sm">{artist.phone}</span>
            </div>
            {artist.portfolio && (
              <div className="flex items-center gap-2 md:col-span-2">
                <Globe className="h-4 w-4 text-gray-500" />
                <a 
                  href={artist.portfolio} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  {artist.portfolio}
                </a>
              </div>
            )}
          </div>
        </div>

        <Separator />

        {/* Professional Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Professional Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <span className="text-sm font-medium text-gray-500">Category</span>
              <p className="text-sm text-gray-900">{artist.category}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Experience</span>
              <p className="text-sm text-gray-900">{artist.experience}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Location</span>
              <p className="text-sm text-gray-900">{artist.city}, {artist.state}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Performance Fee</span>
              <p className="text-sm text-gray-900">${artist.fee.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Skills */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Skills & Specialties</h3>
          <div className="flex flex-wrap gap-2">
            {artist.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Availability */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
          <div className="flex flex-wrap gap-2">
            {artist.availability.map((time) => (
              <Badge key={time} variant="outline" className="text-xs">
                {time}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Bio */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">Professional Bio</h3>
          <p className="text-sm text-gray-700 leading-relaxed">{artist.bio}</p>
        </div>
      </div>
    </DialogContent>
  );
};

export default function ManagerDashboard() {
  const { 
    artists, 
    updateArtistStatus, 
    deleteArtist,
    searchTerm,
    setSearchTerm,
    filterCategory,
    setFilterCategory,
    filterStatus,
    setFilterStatus
  } = useArtist();

  const filteredArtists = useMemo(() => {
    return artists.filter(artist => {
      const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          artist.city.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !filterCategory || artist.category === filterCategory;
      const matchesStatus = !filterStatus || artist.status === filterStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [artists, searchTerm, filterCategory, filterStatus]);

  const stats = useMemo(() => {
    const total = artists.length;
    const pending = artists.filter(a => a.status === 'pending').length;
    const approved = artists.filter(a => a.status === 'approved').length;
    const rejected = artists.filter(a => a.status === 'rejected').length;

    return { total, pending, approved, rejected };
  }, [artists]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
          <p className="text-lg text-gray-600">Manage artist applications and registrations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Artists</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Calendar className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Approved</p>
                  <p className="text-3xl font-bold text-green-600">{stats.approved}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search artists..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Artists Table */}
        <Card className="backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle>Artist Applications ({filteredArtists.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {filteredArtists.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No artists found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Category</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Location</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Fee</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredArtists.map((artist, index) => (
                      <tr 
                        key={artist.id} 
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                        }`}
                      >
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{artist.name}</div>
                            <div className="text-sm text-gray-500">{artist.email}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-900">{artist.category}</td>
                        <td className="py-4 px-4 text-gray-900">{artist.city}, {artist.state}</td>
                        <td className="py-4 px-4 text-gray-900">${artist.fee.toLocaleString()}</td>
                        <td className="py-4 px-4">
                          <StatusBadge status={artist.status} />
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <ArtistDetailModal artist={artist} />
                            </Dialog>

                            {artist.status === 'pending' && (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => updateArtistStatus(artist.id, 'approved')}
                                  className="bg-green-600 hover:bg-green-700 text-white"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => updateArtistStatus(artist.id, 'rejected')}
                                >
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </>
                            )}

                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => deleteArtist(artist.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}