# Frontend Documentation

## Architecture Overview

The frontend is built using React with TypeScript and follows a modular architecture pattern. The application is organized into the following main sections:

### Directory Structure

```
src/
├── components/
│   ├── fulfillment/       # Fulfillment-specific components
│   └── layout/            # Layout components (Header, Sidebar)
├── services/              # API and other services
└── types/                 # TypeScript type definitions
```

## Key Components

### Fulfillment Module

1. **OrderScanner (`OrderScanner.tsx`)**
   - Handles order scanning workflow
   - Two-step process: Order ID scan followed by SKU scan
   - Real-time validation and feedback
   - Integration with backend scanning API

2. **OrderList (`OrderList.tsx`)**
   - Displays all orders in a table format
   - Real-time updates using React Query
   - Supports filtering and sorting
   - Shows order status, scan timestamps, and product images

3. **TransferPage (`TransferPage.tsx`)**
   - Manages order shipping/transfer process
   - Supports multiple shipping methods (پست، اسنپ باکس، ماهکس)
   - Only shows fulfilled orders
   - Updates transfer status in real-time

4. **FileUpload (`FileUpload.tsx`)**
   - Handles Excel file uploads
   - Validates file format (.xlsx)
   - Shows upload progress and status
   - Integrates with backend processing

## API Integration

### Base Configuration (`services/api.ts`)

```typescript
const API_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';
```

### Available Endpoints

1. **Orders API**
   ```typescript
   // Get all orders
   GET /api/orders
   
   // Get single order details
   GET /api/orders/:orderId
   
   // Update order status
   PUT /api/orders/:orderId/status
   ```

2. **Scanning API**
   ```typescript
   // Scan order item
   POST /api/scan
   Body: { orderId: string, sku: string }
   ```

3. **Transfer API**
   ```typescript
   // Update transfer status
   PUT /api/orders/:orderId/transfer
   Body: { transferType: string }
   ```

4. **File Upload API**
   ```typescript
   // Upload Excel file
   POST /api/upload
   Body: FormData (file)
   ```

### Data Types

```typescript
interface Order {
  id: string;
  sku: string;
  title: string;
  color: string;
  quantity: number;
  scanned: number;
  status: OrderStatus;
  price: string;
  scanTimestamp?: string;
}

type OrderStatus = 'Fulfilled' | 'Pending' | 'Error';
```

## State Management

- Uses React Query for server state management
- Automatic cache invalidation and updates
- Optimistic updates for better UX

Example:
```typescript
const { data: orders, isLoading } = useQuery({
  queryKey: ['orders'],
  queryFn: fulfillmentApi.getOrders
});

const scanMutation = useMutation({
  mutationFn: fulfillmentApi.scanOrder,
  onSuccess: () => {
    queryClient.invalidateQueries(['orders']);
  }
});
```

## Backend Integration Requirements

The frontend expects the following from the Flask backend:

1. **Order Processing**
   - Excel file parsing
   - Data validation
   - Order status tracking
   - Scan timestamp management

2. **Image Handling**
   - Product image URL generation
   - Image caching (optional)
   - Fallback image support

3. **Transfer Management**
   - Transfer type validation
   - Transfer timestamp tracking
   - Status updates

4. **Response Format**
   ```json
   {
     "success": true,
     "data": {
       // Response data
     },
     "message": "Operation successful",
     "timestamp": "1402/12/25 14:30"
   }
   ```

## Error Handling

The frontend handles various error scenarios:

1. **Network Errors**
   - Retry logic for failed requests
   - User-friendly error messages
   - Offline support (where applicable)

2. **Validation Errors**
   - Input validation
   - File type validation
   - Size limits

3. **Business Logic Errors**
   - Invalid order IDs
   - Already scanned items
   - Invalid transfer types

## RTL Support

The application fully supports RTL (Right-to-Left) layout:

1. **Text Direction**
   ```css
   .rtl-text {
     direction: rtl;
     text-align: right;
   }
   ```

2. **Layout Components**
   - All components are RTL-aware
   - Proper margin/padding handling
   - Correct icon placement

## Performance Considerations

1. **Code Splitting**
   - Route-based code splitting
   - Lazy loading of components
   - Dynamic imports for large modules

2. **Caching**
   - React Query caching
   - Image caching
   - API response caching

3. **Optimizations**
   - Debounced search inputs
   - Virtualized lists for large datasets
   - Optimized re-renders

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use functional components
   - Implement proper error boundaries
   - Write meaningful comments

2. **Testing**
   - Unit tests for components
   - Integration tests for API calls
   - E2E tests for critical flows

3. **Documentation**
   - Keep component documentation updated
   - Document API changes
   - Maintain changelog

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Building**
   ```bash
   npm run build
   ```

## Common Issues and Solutions

1. **CORS Issues**
   - Ensure backend has proper CORS headers
   - Check API_URL configuration

2. **File Upload Problems**
   - Verify file size limits
   - Check supported formats
   - Validate Excel structure

3. **Scanning Issues**
   - Verify order ID format
   - Check SKU validity
   - Ensure proper error handling

## Future Improvements

1. **Features**
   - Batch scanning support
   - Advanced filtering
   - Export functionality
   - Real-time notifications

2. **Technical**
   - PWA support
   - Offline functionality
   - Performance monitoring
   - Analytics integration