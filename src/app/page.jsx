'use client';

import React from 'react';
import { Box } from '@mui/material';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HowToPlaySection } from '@/components/landing/HowToPlaySection';
import { CallToAction } from '@/components/landing/CallToAction';

export default function LandingPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Navbar title="Preguntas Anónimas" />
      
      <Box component="main" sx={{ flex: 1 }}>
        <HeroSection />
        <FeaturesSection />
        <HowToPlaySection />
        <CallToAction />
      </Box>

      <Footer />
    </Box>
  );
}