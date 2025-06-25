'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { Music, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { FloatingLabelInput } from '@/components/ui/floating-label-input';
import { FloatingLabelTextarea } from '@/components/ui/floating-label-textarea';
import { useArtist } from '@/contexts/ArtistContext';
import { artistRegistrationSchema, ArtistRegistrationFormData } from '@/lib/validations';
import { CATEGORIES, EXPERIENCE_LEVELS, SKILLS_OPTIONS, AVAILABILITY_OPTIONS, US_STATES } from '@/lib/types';

export default function ArtistRegister() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addArtist } = useArtist();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    watch,
    reset
  } = useForm<ArtistRegistrationFormData>({
    resolver: zodResolver(artistRegistrationSchema),
    defaultValues: {
      skills: [],
      availability: []
    }
  });

  const watchedSkills = watch('skills') || [];
  const watchedAvailability = watch('availability') || [];

  const onSubmit = async (data: ArtistRegistrationFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    addArtist(data);
    setIsSubmitted(true);
    setIsSubmitting(false);
    
    // Reset form after 3 seconds and redirect
    setTimeout(() => {
      reset();
      setIsSubmitted(false);
      router.push('/manager/dashboard');
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
            <p className="text-gray-600 mb-4">
              Thank you for registering. Your application has been submitted and is pending review.
            </p>
            <p className="text-sm text-gray-500">
              Redirecting to dashboard in a few seconds...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Music className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Artist Registration</h1>
          <p className="text-lg text-gray-600">Join our community of talented artists</p>
        </div>

        <Card className="backdrop-blur-sm bg-white/90">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Tell us about yourself</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FloatingLabelInput
                  label="Full Name *"
                  {...register('name')}
                  error={errors.name?.message}
                  disabled={isSubmitting}
                />
                
                <FloatingLabelInput
                  label="Email Address *"
                  type="email"
                  {...register('email')}
                  error={errors.email?.message}
                  disabled={isSubmitting}
                />
                
                <FloatingLabelInput
                  label="Phone Number *"
                  type="tel"
                  {...register('phone')}
                  error={errors.phone?.message}
                  disabled={isSubmitting}
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Category *</label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                        <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select your category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-sm text-red-600">{errors.category.message}</p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FloatingLabelInput
                  label="City *"
                  {...register('city')}
                  error={errors.city?.message}
                  disabled={isSubmitting}
                />
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">State *</label>
                  <Controller
                    name="state"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                        <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select your state" />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.state && (
                    <p className="text-sm text-red-600">{errors.state.message}</p>
                  )}
                </div>
              </div>

              {/* Professional Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Experience Level *</label>
                  <Controller
                    name="experience"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value} disabled={isSubmitting}>
                        <SelectTrigger className={errors.experience ? 'border-red-500' : ''}>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          {EXPERIENCE_LEVELS.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.experience && (
                    <p className="text-sm text-red-600">{errors.experience.message}</p>
                  )}
                </div>

                <FloatingLabelInput
                  label="Performance Fee ($) *"
                  type="number"
                  min="0"
                  step="50"
                  {...register('fee', { valueAsNumber: true })}
                  error={errors.fee?.message}
                  disabled={isSubmitting}
                />
              </div>

              {/* Skills */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Skills & Specialties *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                  {SKILLS_OPTIONS.map((skill) => (
                    <div key={skill} className="flex items-center space-x-2">
                      <Controller
                        name="skills"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id={skill}
                            checked={watchedSkills.includes(skill)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...watchedSkills, skill]);
                              } else {
                                field.onChange(watchedSkills.filter((s) => s !== skill));
                              }
                            }}
                            disabled={isSubmitting}
                          />
                        )}
                      />
                      <label
                        htmlFor={skill}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {skill}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.skills && (
                  <p className="text-sm text-red-600">{errors.skills.message}</p>
                )}
              </div>

              {/* Availability */}
              <div className="space-y-3">
                <label className="text-sm font-medium text-gray-700">Availability *</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {AVAILABILITY_OPTIONS.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Controller
                        name="availability"
                        control={control}
                        render={({ field }) => (
                          <Checkbox
                            id={option}
                            checked={watchedAvailability.includes(option)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...watchedAvailability, option]);
                              } else {
                                field.onChange(watchedAvailability.filter((a) => a !== option));
                              }
                            }}
                            disabled={isSubmitting}
                          />
                        )}
                      />
                      <label
                        htmlFor={option}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
                {errors.availability && (
                  <p className="text-sm text-red-600">{errors.availability.message}</p>
                )}
              </div>

              {/* Bio */}
              <FloatingLabelTextarea
                label="Professional Bio *"
                {...register('bio')}
                error={errors.bio?.message}
                disabled={isSubmitting}
                placeholder="Tell us about your artistic journey, achievements, and what makes you unique..."
              />

              {/* Portfolio */}
              <FloatingLabelInput
                label="Portfolio/Website URL"
                type="url"
                {...register('portfolio')}
                error={errors.portfolio?.message}
                disabled={isSubmitting}
                placeholder="https://your-portfolio.com"
              />

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting Registration...
                    </>
                  ) : (
                    <>
                      <Music className="mr-2 h-5 w-5" />
                      Submit Registration
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}