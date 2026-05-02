# Training Dashboard

A self-hosted training plan and metrics dashboard for endurance athletes. Track your running, cycling, and swimming activities from Strava, monitor recovery and strain from Whoop, and visualize your training stress balance (CTL/ATL/TSB).

## Features

- **Activity Tracking**: Sync running, cycling, and swimming activities from Strava
- **Recovery Monitoring**: Import recovery scores, HRV, and sleep data from Whoop
- **Training Plan**: Manage weekly workouts with intensity and duration targets
- **Fitness Metrics**: Visual charts for CTL (fitness), ATL (fatigue), and TSB (balance)
- **Dark Mode**: Athletic-focused dark theme with light mode support
- **Self-Hosted**: Deploy locally or on platforms like Dokploy
- **Data Privacy**: All data stored locally in SQLite

## Technology Stack

- **Frontend**: Next.js 14+ with TypeScript and Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with better-sqlite3
- **Data Sync**: Node.js scripts with Axios and OAuth2
- **Charts**: Recharts for data visualization
- **Deployment**: Docker + docker-compose

## Prerequisites

- Node.js 18+ or Docker
- Strava API OAuth App credentials
- Whoop API credentials (development access)

## Quick Start (Local Development)

### 1. Clone and Setup

```bash
cd training-dashboard
npm install
```

### 2. Create Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:
```
STRAVA_CLIENT_ID=your_strava_client_id
STRAVA_CLIENT_SECRET=your_strava_client_secret
STRAVA_REFRESH_TOKEN=your_strava_refresh_token
WHOOP_CLIENT_ID=your_whoop_client_id
WHOOP_CLIENT_SECRET=your_whoop_client_secret
WHOOP_REFRESH_TOKEN=your_whoop_refresh_token
DATABASE_PATH=./data/training.db
```

### 3. Initialize Database

```bash
npm run db:init
```

### 4. Start Development Server

```bash
npm run dev
```

Visit http://localhost:3000

## Setting Up OAuth Credentials

### Strava

1. Go to https://www.strava.com/settings/api
2. Create a new application
3. Set "Authorization Callback Domain" to your domain (e.g., `localhost` for local dev)
4. Get your Client ID and Secret
5. Connect your account via the Settings page to get refresh token

### Whoop

1. Request developer access at https://developer.whoop.com
2. Create an application
3. Set redirect URI to `http://localhost:3000/api/auth/whoop/callback`
4. Get your Client ID and Secret
5. Connect your account via the Settings page

## Database Schema

### activities
- Strava workout data
- Fields: distance_km, duration_seconds, avg_hr, max_hr, avg_pace, elevation_m, calories, suffer_score

### whoop_recovery
- Whoop metrics by date
- Fields: recovery_score, hrv, rhr, sleep_score, sleep_hours, strain_score

### training_plan
- Planned workouts
- Fields: workout_type, sport, target_duration_minutes, target_intensity, completed

### oauth_tokens
- Encrypted OAuth credentials (stored locally)

## API Routes

### Data Sync
- `POST /api/sync` - Trigger manual data refresh
- `GET /api/activities` - Get activities (query: days=30, type=Run)
- `GET /api/recovery` - Get Whoop recovery data
- `GET /api/plan` - Get training plan

### Metrics
- `GET /api/metrics` - Get CTL/ATL/TSB calculations

### OAuth
- `GET /api/auth/strava/callback` - Strava OAuth callback
- `GET /api/auth/whoop/callback` - Whoop OAuth callback

## Pages

- `/` - Dashboard with summary metrics and this week's plan
- `/plan` - Full training plan calendar (filterable by sport)
- `/metrics` - Charts for fitness trends and recovery
- `/settings` - OAuth connections and manual sync

## CLI Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Build for production
npm start              # Start production server

# Database
npm run db:init        # Initialize SQLite database

# Data Sync
npm run sync:strava    # Sync Strava activities only
npm run sync:whoop     # Sync Whoop recovery only
npm run sync:all       # Sync both sources

# Other
npm run lint           # Run ESLint
npm run type-check     # Run TypeScript check
```

## Training Metrics Explained

### CTL (Chronic Training Load)
- Represents your **fitness level**
- Built up gradually over weeks of training
- Higher CTL = better endurance fitness
- 42-day exponential moving average

### ATL (Acute Training Load)
- Represents your **recent fatigue**
- Based on the last 7 days of training
- High ATL = you're fatigued and need recovery
- 7-day exponential moving average

### TSB (Training Stress Balance)
- **TSB = CTL - ATL**
- Positive TSB: you're recovered and ready to train hard
- Negative TSB: high fatigue, recovery needed
- Best race performance typically when TSB is -10 to +5

### TSS (Training Stress Score)
- Score assigned to each workout based on duration and intensity
- Higher TSS = harder, longer workouts
- Used to calculate CTL and ATL

## Docker Deployment

### Build Image
```bash
docker build -t training-dashboard .
```

### Run with Docker Compose
```bash
# Create .env file with your credentials
cp .env.example .env

# Start the service
docker-compose up -d

# Check logs
docker-compose logs -f training-dashboard

# Stop
docker-compose down
```

The app will be available at `http://localhost:3000`

### Dokploy Deployment

1. Create new service in Dokploy
2. Connect your GitHub repo or use Docker image
3. Set environment variables (STRAVA_*, WHOOP_*)
4. Configure volume mount for `/app/data`
5. Deploy

## Daily Auto-Sync

By default, data syncs daily at 5:00 AM UTC. Edit `CRON_SCHEDULE` in your environment:

```
# Format: minute hour day month dayOfWeek
CRON_SCHEDULE=0 5 * * *    # Every day at 5am
CRON_SCHEDULE=0 6 * * 1-5  # Weekdays at 6am
```

## Troubleshooting

### OAuth Connection Issues
- Verify redirect URIs match exactly in OAuth app settings
- Check that Client ID and Secret are correct
- Ensure HTTPS is used in production

### Sync Failures
- Check database path is writable
- Verify API credentials haven't expired
- Review server logs for error messages

### Missing Data
- Strava: Activities may take a few minutes to appear
- Whoop: Ensure sufficient historical data exists
- Check sync logs in terminal

## Development

### Project Structure
```
training-dashboard/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   ├── components/          # React components
│   ├── page.tsx            # Home page
│   ├── plan/               # Training plan page
│   ├── metrics/            # Metrics page
│   ├── settings/           # Settings page
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── scripts/                 # Data sync scripts
│   ├── fetch-strava.ts    # Strava fetcher
│   ├── fetch-whoop.ts     # Whoop fetcher
│   ├── sync-all.ts        # Sync orchestrator
│   ├── db.ts              # Database utilities
│   └── init-db.ts         # Database initialization
├── public/                  # Static assets
├── training-plan.json      # Sample training plan
├── Dockerfile              # Docker build config
├── docker-compose.yml      # Docker compose config
└── README.md               # This file
```

### Type Safety
The project is fully typed with TypeScript. Database operations use proper types.

### Styling
Tailwind CSS with custom components defined in `app/globals.css`:
- `.card` - Default card styling
- `.btn-primary` - Primary button
- `.btn-secondary` - Secondary button
- `.badge-*` - Status badges
- `.metric-box` - Metric container

## Performance Considerations

- Database queries are indexed on frequently-filtered columns (date, strava_id)
- Chart data limited to 42 days by default (configurable)
- OAuth tokens cached in database to minimize API calls
- Pagination built into Strava activity fetcher (30 per page)

## Security Notes

- OAuth tokens stored in local database (not exposed to browser)
- No external API calls from frontend (all proxied through backend)
- Environment variables required for all credentials
- Suitable for personal self-hosted use

## Future Enhancements

- [ ] Support for TrainingPeaks, FitBit integrations
- [ ] Workout recommendations based on metrics
- [ ] Goal setting and progress tracking
- [ ] Custom training plan builder UI
- [ ] Advanced filtering and search
- [ ] Export data to CSV/JSON
- [ ] Mobile app

## License

MIT License - feel free to modify for personal use

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API credentials and environment variables
3. Check Docker logs
4. Test API routes directly at `/api/*`
