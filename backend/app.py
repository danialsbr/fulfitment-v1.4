from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pandas as pd
from datetime import datetime
from khayyam import JalaliDatetime
import os
import time
import uuid

app = Flask(__name__)
CORS(app)
app.config['UPLOAD_FOLDER'] = 'uploads'
app.secret_key = 'your-secret-key'  # Required for session

# In-memory databases
orders_db = {}
logs_db = []

def add_log(message, status='success', details=None):
    """Add a log entry."""
    log_entry = {
        'id': str(uuid.uuid4()),
        'timestamp': JalaliDatetime.now().strftime("%Y/%m/%d %H:%M:%S"),
        'message': message,
        'status': status,
        'details': details
    }
    logs_db.append(log_entry)
    return log_entry

@app.route('/api/ping', methods=['GET'])
def ping():
    """Simple ping endpoint for health checks."""
    return jsonify({
        'success': True,
        'message': 'pong',
        'timestamp': JalaliDatetime.now().strftime("%Y/%m/%d %H:%M:%S")
    })

@app.route('/api/system/status', methods=['GET'])
def system_status():
    """Get system status."""
    return jsonify({
        'success': True,
        'data': {
            'status': 'operational',
            'message': 'System is running normally',
            'timestamp': JalaliDatetime.now().strftime("%Y/%m/%d %H:%M:%S"),
            'stats': {
                'total_orders': len(orders_db),
                'total_logs': len(logs_db)
            }
        }
    })

@app.route('/api/logs', methods=['GET'])
def get_logs():
    """Get system logs."""
    return jsonify({
        'success': True,
        'data': logs_db,
        'message': 'Logs retrieved successfully'
    })

@app.route('/api/orders', methods=['GET'])
def get_orders():
    """Get all orders."""
    orders_list = []
    for order_id, order_data in orders_db.items():
        for sku, details in order_data['SKUs'].items():
            orders_list.append({
                'id': order_id,
                'sku': sku,
                'title': details['Title'],
                'color': details['Color'],
                'quantity': details['Quantity'],
                'scanned': details['Scanned'],
                'status': 'Fulfilled' if details['Scanned'] >= details['Quantity'] else 'Pending',
                'price': details['Price'],
                'state': order_data.get('State'),
                'city': order_data.get('City'),
                'payment': order_data.get('Payment')
            })
    return jsonify({
        'success': True,
        'data': orders_list,
        'message': 'Orders retrieved successfully'
    })

@app.route('/api/orders/<order_id>', methods=['GET'])
def get_order(order_id):
    """Get a specific order."""
    if order_id not in orders_db:
        return jsonify({
            'success': False,
            'message': 'Order not found'
        }), 404

    return jsonify({
        'success': True,
        'data': orders_db[order_id],
        'message': 'Order retrieved successfully'
    })

@app.route('/api/upload', methods=['POST'])
def upload_file():
    """Upload and process Excel file."""
    if 'file' not in request.files:
        add_log('File upload failed', 'error', 'No file provided')
        return jsonify({
            'success': False,
            'message': 'No file provided'
        }), 400

    file = request.files['file']
    if not file.filename.endswith('.xlsx'):
        add_log('File upload failed', 'error', 'Invalid file format')
        return jsonify({
            'success': False,
            'message': 'Invalid file format'
        }), 400

    try:
        # Create uploads directory if it doesn't exist
        os.makedirs('uploads', exist_ok=True)
        
        # Save file
        file_path = os.path.join('uploads', file.filename)
        file.save(file_path)
        
        # Read Excel file
        df = pd.read_excel(file_path)
        
        # Column mapping (Persian to English)
        column_mapping = {
            'سریال': 'OrderID',
            'لیست سفارشات - کد محصول': 'SKU',
            'لیست سفارشات - شرح محصول': 'Title',
            'رنگ': 'Color',
            'تعداد درخواستی': 'Quantity',
            'لیست سفارشات - قیمت لیبل': 'Price',
            'استان': 'State',
            'شهر': 'City',
            'مبلغ پرداختی': 'Payment'
        }

        # Rename columns if they exist
        for persian_col, english_col in column_mapping.items():
            if persian_col in df.columns:
                df.rename(columns={persian_col: english_col}, inplace=True)
            else:
                df[english_col] = None  # Add missing columns with None values

        # Process orders
        processed_count = 0
        for _, row in df.iterrows():
            order_id = str(row['OrderID'])
            if order_id not in orders_db:
                orders_db[order_id] = {
                    'SKUs': {},
                    'State': row['State'],
                    'City': row['City'],
                    'Payment': f"{int(float(row['Payment'])):,}" if pd.notna(row['Payment']) else None,
                    'Status': 'Pending'
                }
            
            sku = str(row['SKU'])
            orders_db[order_id]['SKUs'][sku] = {
                'Title': row['Title'],
                'Color': row['Color'],
                'Quantity': int(row['Quantity']) if pd.notna(row['Quantity']) else 0,
                'Scanned': 0,
                'Price': f"{int(float(row['Price'])):,}" if pd.notna(row['Price']) else "0",
            }
            processed_count += 1

        add_log('File uploaded successfully', 'success', f'Processed {processed_count} orders')
        return jsonify({
            'success': True,
            'message': 'File uploaded and processed successfully',
            'data': {
                'processed_count': processed_count
            }
        })

    except Exception as e:
        add_log('File processing failed', 'error', str(e))
        return jsonify({
            'success': False,
            'message': f'Error processing file: {str(e)}'
        }), 500

@app.route('/api/scan', methods=['POST'])
def scan_order():
    """Scan an order item."""
    data = request.json
    order_id = data.get('orderId')
    sku = data.get('sku')
    
    if not order_id or not sku:
        return jsonify({
            'success': False,
            'message': 'Missing required fields'
        }), 400
        
    if order_id not in orders_db or sku not in orders_db[order_id]['SKUs']:
        return jsonify({
            'success': False,
            'message': 'Order or SKU not found'
        }), 404
        
    # Update scanned count
    orders_db[order_id]['SKUs'][sku]['Scanned'] += 1
    
    # Update scan timestamp
    orders_db[order_id]['SKUs'][sku]['ScanTimestamp'] = JalaliDatetime.now().strftime("%Y/%m/%d %H:%M")
    
    add_log(
        f'Item scanned: Order {order_id}, SKU {sku}',
        'success',
        f'Scanned count: {orders_db[order_id]["SKUs"][sku]["Scanned"]}'
    )
    
    return jsonify({
        'success': True,
        'message': 'Scan successful'
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)