# Supabase Setup Guide

This guide will help you set up Supabase integration for the Ooru Chutneypudi project.

## Prerequisites

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project in your dashboard

## Configuration Steps

### 1. Get Supabase Credentials

After creating your project:
1. Go to your project dashboard
2. Navigate to **Settings** → **API**
3. Copy your:
   - **Project URL** (starts with `https://`)
   - **anon/public key** (starts with `eyJ`)

### 2. Environment Configuration

1. Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

### 3. Database Setup

1. In your Supabase dashboard, go to **SQL Editor**
2. Create a new query and paste the content from `lib/test-products.sql`
3. Run the SQL script to create the `test_products` table with sample data

### 4. Test the Integration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser to `http://localhost:3000`
3. You should see:
   - Hero section at the top
   - Product showcase section showing chutney products from your Supabase database
   - Loading state while fetching data
   - Error message if connection fails

## Troubleshooting

### Common Issues:

1. **"Invalid API key" error**
   - Verify your `NEXT_PUBLIC_SUPABASE_ANON_KEY` is correct
   - Make sure there are no extra spaces in the `.env.local` file

2. **"relation test_products does not exist"**
   - Run the SQL script in `lib/test-products.sql` in your Supabase SQL Editor
   - Make sure the table was created successfully

3. **Network errors**
   - Check that your `NEXT_PUBLIC_SUPABASE_URL` is correct
   - Ensure your project is not paused

4. **No products showing**
   - Check the browser console for detailed error messages
   - Verify Row Level Security policies allow public read access

## Features Implemented

- ✅ Supabase client setup with TypeScript types
- ✅ Environment variable configuration
- ✅ Product fetch functionality with loading/error states
- ✅ Responsive product grid with animations
- ✅ Spice level indicators and categorization
- ✅ Error handling and user feedback

## Next Steps

Once the basic integration is working, you can:
- Add more product fields (images, nutritional info, etc.)
- Implement user authentication
- Add shopping cart functionality
- Create admin panel for product management
- Add real-time subscriptions for live updates
