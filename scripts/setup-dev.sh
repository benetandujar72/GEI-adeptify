
#!/bin/bash

# 🎓 GEI ADEPTIFY - Development Environment Setup Script
# ====================================================

echo "🚀 Setting up GEI Adeptify Development Environment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env file exists
if [ ! -f ".env" ]; then
    print_error ".env file not found! Please create it from .env.example"
    exit 1
fi

print_status "Environment file found ✅"

# Install backend dependencies
print_status "Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    print_success "Backend dependencies installed"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Install frontend dependencies
print_status "Installing frontend dependencies..."
cd ../frontend
if [ -f "package.json" ]; then
    npm install
    if [ $? -eq 0 ]; then
        print_success "Frontend dependencies installed"
    else
        print_error "Failed to install frontend dependencies"
        exit 1
    fi
else
    print_warning "Frontend package.json not found, skipping..."
fi

cd ..

# Create directories if they don't exist
print_status "Creating necessary directories..."
mkdir -p logs
mkdir -p uploads
mkdir -p temp
print_success "Directories created"

# Set up database (if needed)
print_status "Database setup information:"
echo "  - Database URL: Check your .env file"
echo "  - Make sure PostgreSQL is running"
echo "  - Database will be created automatically on first run"

print_success "🎉 Development environment setup complete!"
print_status "Next steps:"
echo "  1. Make sure PostgreSQL and Redis are running"
echo "  2. Update .env with your actual API keys"
echo "  3. Run 'npm run dev' to start the application"

echo ""
print_status "🔧 Quick commands:"
echo "  - Start backend: cd backend && npm run start:dev"
echo "  - Start frontend: cd frontend && npm run dev"
echo "  - Run tests: cd backend && npm run test"
echo "  - Build project: npm run build"
