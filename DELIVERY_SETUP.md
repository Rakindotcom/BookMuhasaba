# Steadfast Courier Integration Setup

## 🚚 Features Added

### Admin Dashboard Now Includes:
- **3 Tabs**: Pending → Confirmed → Shipped Orders
- **Delivery Management**: Create deliveries for confirmed orders
- **Status Tracking**: Real-time delivery status updates
- **Steadfast API Integration**: Automated courier service

## 🔑 API Configuration

### 1. Get Steadfast API Credentials
Contact Steadfast Courier to get:
- API Key
- Secret Key

### 2. Environment Setup
1. Copy `.env.local.example` to `.env.local`
2. Add your actual API credentials:
```
VITE_STEADFAST_API_KEY=your_actual_api_key
VITE_STEADFAST_SECRET_KEY=your_actual_secret_key
```

## 📋 Order Flow

### Customer Journey:
1. **Customer** places order → Status: `pending`
2. **Admin** confirms order → Status: `confirmed`
3. **Admin** creates delivery → Status: `shipped`
4. **System** tracks delivery → Status: `delivered`

### Admin Actions:
- **Pending Tab**: Confirm new orders
- **Confirmed Tab**: Create deliveries via Steadfast
- **Shipped Tab**: Track delivery status

## 🎯 Delivery Features

### For Confirmed Orders:
- **Create Delivery**: Sends order to Steadfast Courier
- **Tracking Code**: Generated automatically
- **Status Updates**: Real-time delivery tracking

### Delivery Statuses:
- `in_review` - Order submitted to courier
- `delivered` - Successfully delivered
- `cancelled` - Delivery cancelled
- `hold` - On hold

## 🔧 Technical Details

### API Integration:
- **Base URL**: `https://portal.packzy.com/api/v1`
- **Authentication**: API Key + Secret Key in headers
- **Order Creation**: `/create_order` endpoint
- **Status Checking**: `/status_by_trackingcode/{code}` endpoint

### Data Flow:
1. Order confirmed → Steadfast API call
2. Response → Update Firestore with delivery info
3. Status check → Update order status
4. Real-time updates → Admin dashboard

## 🚀 Usage

1. **Login** to admin dashboard
2. **Confirm** pending orders
3. **Create delivery** for confirmed orders
4. **Track status** in shipped orders tab

The system automatically handles API calls and status updates!