# SkillScope-SmartSkillProfiler
WebApp Powered by Google's advanced AI model for intelligent, personalized skill insights


## 🚀 Overview

SkillScope is a modern web application that leverages Google's advanced Gemini 1.5 Flash AI model to analyze professional skills and provide personalized career insights. Users input their experience and skills to receive AI-generated profile summaries, skill recommendations, and confidence assessments.

## 🤖 AI Technology

### **Google Gemini 1.5 Flash**
- **Model**: `gemini-1.5-flash` via Google AI Studio API
- **Capabilities**: Advanced natural language understanding and generation
- **Performance**: Fast response times with high-quality analysis
- **Cost-Effective**: Generous free tier with excellent rate limits
- **Strengths**: 
  - Superior context understanding
  - Accurate professional skill assessment
  - Reliable JSON response formatting
  - Excellent career guidance generation

### **Why Gemini 1.5 Flash?**
- ✅ **Free Tier Friendly** - Generous usage limits
- ✅ **Fast Processing** - Optimized for speed
- ✅ **High Quality** - Advanced reasoning capabilities
- ✅ **Reliable** - Consistent JSON output formatting
- ✅ **Professional Focus** - Excellent for career analysis

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and dev server

### **Backend & Infrastructure**
- **Supabase** - Backend-as-a-Service platform
- **Supabase Edge Functions** - Serverless functions (Deno runtime)
- **PostgreSQL** - Robust relational database
- **Row Level Security (RLS)** - Database security

### **AI Integration**
- **Google Gemini 1.5 Flash** - AI model for skill analysis
- **Google AI Studio API** - Direct API integration
- **JSON Response Parsing** - Structured data extraction
- **Error Handling** - Robust API error management

### **Development Tools**
- **TypeScript** - Type-safe JavaScript (Edge Functions)
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixes

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │    │  Supabase Edge   │    │  Google Gemini  │
│                 │    │    Functions     │    │   1.5 Flash     │
│  • Form Input   │───▶│                  │───▶│                 │
│  • Results UI   │    │  • Data Process  │    │  • AI Analysis  │
│  • Routing      │    │  • API Calls     │    │  • Skill Eval   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        ▼                        │
         │              ┌──────────────────┐               │
         │              │   PostgreSQL     │               │
         └──────────────│    Database      │◀──────────────┘
                        │                  │
                        │ • User Data      │
                        │ • Analysis       │
                        │ • Results        │
                        └──────────────────┘
```

## 📊 Database Schema

```sql
CREATE TABLE skill_analyses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_name text NOT NULL,
  user_email text NOT NULL,
  primary_skill text NOT NULL,
  experience_description text NOT NULL,
  ai_profile_summary text,
  ai_suggested_skills jsonb,
  ai_confidence integer,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
```

## 🔄 Data Flow

1. **User Input** → Form submission with personal and skill data
2. **Edge Function** → Processes data and calls Gemini 1.5 Flash API
3. **AI Analysis** → Gemini generates profile summary and skill recommendations
4. **Database Storage** → Results saved to PostgreSQL with RLS
5. **Results Display** → AI insights presented to user

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Google AI Studio API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd skillscope-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Add your Supabase and Google AI Studio credentials
   ```

4. **Configure Supabase**
   - Create a new Supabase project
   - Run the database migrations
   - Add `GEMINI_API_KEY` to Edge Function environment variables

5. **Start development server**
   ```bash
   npm run dev
   ```

## 🔧 Configuration

### Environment Variables

**Frontend (.env)**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Edge Function (Supabase Dashboard)**
```env
GEMINI_API_KEY=your_google_ai_studio_api_key
```

### Google AI Studio Setup
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Create a new API key
3. Add the key to your Supabase Edge Function environment variables

## 📁 Project Structure

```
skillscope-app/
├── src/
│   ├── components/          # React components
│   │   ├── LandingPage.jsx  # Home page
│   │   ├── FormPage.jsx     # Skill input form
│   │   ├── ResultsPage.jsx  # AI analysis results
│   │   └── AIInfoModal.jsx  # AI technology info
│   ├── context/             # React context
│   │   └── SkillContext.jsx # Global state management
│   ├── lib/                 # Utilities
│   │   └── supabase.js      # Supabase client
│   └── index.css           # Global styles
├── supabase/
│   ├── functions/          # Edge Functions
│   │   └── analyze-skill/  # Gemini AI integration
│   └── migrations/         # Database schema
├── public/                 # Static assets
└── package.json           # Dependencies
```

## 🔒 Security Features

- **Row Level Security (RLS)** - Database access control
- **Environment Variables** - Secure API key storage
- **CORS Protection** - Cross-origin request security
- **Input Validation** - Form data sanitization
- **Error Handling** - Graceful failure management

## 🎯 Features

### Core Functionality
- ✅ **AI-Powered Analysis** - Gemini 1.5 Flash skill evaluation
- ✅ **Profile Generation** - Automated professional summaries
- ✅ **Skill Recommendations** - AI-suggested growth areas
- ✅ **Confidence Scoring** - Analysis reliability metrics
- ✅ **Data Persistence** - Secure result storage

### User Experience
- ✅ **Responsive Design** - Mobile-first approach
- ✅ **Progressive Forms** - Step-by-step data collection
- ✅ **Real-time Validation** - Instant feedback
- ✅ **Loading States** - Clear processing indicators
- ✅ **Error Handling** - User-friendly error messages

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Build command
npm run build

# Publish directory
dist
```

## 📈 Performance

- **Fast AI Processing** - Gemini 1.5 Flash optimized for speed
- **Edge Functions** - Global serverless deployment
- **Efficient Database** - Indexed queries and RLS
- **Optimized Frontend** - Vite build optimization
- **CDN Delivery** - Static asset optimization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🙏 Acknowledgments

- **Google Gemini 1.5 Flash** - Advanced AI capabilities
- **Supabase** - Backend infrastructure and Edge Functions
- **React & Tailwind CSS** - Modern frontend development
- **Lucide Icons** - Beautiful iconography
---

**Built with ❤️ using Google Gemini 1.5 Flash AI**

*Discover your professional potential with intelligent skill analysis*
