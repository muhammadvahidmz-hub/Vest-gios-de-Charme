# Vestígios de Charme - Guest House Website

## Overview
A PHP-based website for "Vestígios de Charme" guest house in Figueira da Foz, Portugal (R. Cândido dos Reis 6, 3080-155). Features elegant design with rustic charm, room listings (Duplo 65€, Twin 85€), Stripe payment integration, Flatpickr calendar, availability management system, admin dashboard, and automated email notifications.

## Project Structure
```
/
├── index.html             # Main website with booking form
├── styles.css             # Main stylesheet (navy blue/gold theme)
├── script.js              # JavaScript for booking, gallery, animations
├── admin-dashboard.php    # Admin panel (bookings, calendar, inventory)
├── admin-login.php        # Admin authentication
├── check-availability.php # Real-time availability API
├── create-checkout-session.php # Stripe payment integration
├── payment-success.php    # Booking confirmation after payment
├── send-email.js          # Gmail API for notifications
├── send-contact.php       # Contact form handler
├── db-config.php          # Database connection
├── images/                # Stock photos for website
└── replit.md              # This documentation
```

## Features
- Elegant responsive design with animations (fade-in, slide-up)
- Stripe payment integration (test mode)
- Flatpickr calendar with navy blue/gold theme
- Real-time availability checking with color-coded warnings
- **Simplified Admin Dashboard** with 2 tabs: Reservas | Configurar Disponibilidade
- **Bulk date configuration**: Set availability/prices for long date ranges (up to 1 year)
- Quick range buttons: 7 days, 30 days, 3 months, 6 months, 1 year
- Mark rooms as unavailable in bulk
- Gmail integration for client confirmation and admin notifications
- Photo gallery with lightbox
- Google Maps location embed
- Testimonials section

## Database Tables
- **bookings**: Customer reservations with payment status (includes duplo_count, twin_count, duplo_total, twin_total for mixed room bookings)
- **room_inventory**: Base room counts (duplo, twin)
- **room_availability**: Date-specific availability overrides
- **breakfast_availability**: Date-specific breakfast availability (can disable breakfast for specific dates)

## Admin Access
- URL: /admin-login.php
- Password: admin2024

## Email System
- **Admin notifications**: Sent to muhammadvahid.mz@gmail.com
- **Client confirmations**: Sent via Gmail API with booking details

## Availability System
- Color-coded calendar: Green (3+), Yellow (1-2), Red (sold out), Blue (custom)
- Admins can set availability per specific date
- Real-time availability shown on booking form

## Recent Changes
- December 3, 2025: Added partial breakfast charging - breakfast only charged for days with available service
- December 3, 2025: Breakfast calculated from day after check-in to checkout day (inclusive)
- December 3, 2025: API returns detailed breakfast breakdown (eligibleDates, availableDates, unavailableDates, chargedDays)
- December 3, 2025: Frontend shows visual breakdown of available/unavailable breakfast mornings
- December 3, 2025: Emails include detailed partial breakfast information for both client and admin
- December 3, 2025: Redesigned booking form to allow mixing room types (e.g., 1 Duplo + 2 Twin)
- December 3, 2025: Added individual guest selection per room (max 2 guests per room)
- December 3, 2025: Updated Stripe and email templates for mixed room bookings
- December 3, 2025: Added optional breakfast booking (€8/person/night) with automatic calculation
- December 3, 2025: Updated booking form with rooms selector and breakfast checkbox
- December 3, 2025: Added num_rooms, breakfast_included, breakfast_price columns to database
- December 3, 2025: Fixed booking system - dates now saved in correct format, availability subtracts booked rooms
- December 3, 2025: Fixed Stripe payment status check for test mode
- December 3, 2025: Fixed email confirmation sending to client and admin
- December 3, 2025: Redesigned admin dashboard - simplified to 2 tabs with bulk date configuration
- December 3, 2025: Added bulk availability/price updates for date ranges up to 1 year
- December 3, 2025: Added quick range buttons and "mark as unavailable" feature
- December 1, 2025: Implemented date-specific availability overrides
- November 30, 2025: Added stock images, animations, lightbox, testimonials
- November 28, 2025: Stripe integration, admin dashboard
- November 26, 2025: Gmail integration, initial setup

## User Preferences
- Language: Portuguese
- Email: muhammadvahid.mz@gmail.com (admin notifications)
- Stripe: Test mode enabled
