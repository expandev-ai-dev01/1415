# Ensina Dino - Backend API

Backend API for Ensina Dino educational platform about dinosaurs.

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Architecture**: REST API

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # API version 1
│       ├── external/       # Public endpoints
│       └── internal/       # Authenticated endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
├── instances/              # Service instances
├── tests/                  # Global test utilities
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
npm install
```

### Environment Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
npm run lint:fix
```

## API Documentation

### Health Check

```
GET /health
```

Returns API health status.

### API Endpoints

All API endpoints are versioned and available under:

```
/api/v1/external/*  - Public endpoints
/api/v1/internal/*  - Authenticated endpoints
```

## Development Guidelines

- Follow TypeScript strict mode
- Use path aliases (@/) for imports
- Implement proper error handling
- Write tests for all business logic
- Follow REST API conventions
- Document all endpoints with TSDoc comments

## License

ISC