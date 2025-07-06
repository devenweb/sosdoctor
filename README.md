# SOS Doctor

A comprehensive healthcare management system designed to connect patients with medical professionals quickly and efficiently.

## Features

- Patient registration and profile management
- Doctor appointment scheduling
- Emergency medical assistance
- Medical records management
- Real-time communication between patients and doctors
- Prescription management
- Health monitoring and tracking

## Tech Stack

- **Frontend**: React with TypeScript
- **Backend**: Node.js with Express
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/sosdoctor.git
cd sosdoctor
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Fill in your Supabase credentials and other required environment variables.

4. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Project Structure

```
sosdoctor/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Application pages
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   ├── types/         # TypeScript type definitions
│   └── lib/           # Third-party library configurations
├── public/            # Static assets
├── supabase/          # Database migrations and functions
└── docs/              # Project documentation
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@sosdoctor.com or join our Slack channel.

## Roadmap

- [ ] Mobile app development
- [ ] Telemedicine video calls
- [ ] AI-powered symptom checker
- [ ] Integration with wearable devices
- [ ] Multi-language support