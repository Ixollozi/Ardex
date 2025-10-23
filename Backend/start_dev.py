#!/usr/bin/env python3
"""
Development server script that starts both Django and Next.js
"""
import os
import sys
import subprocess
import time
import threading
import signal
from pathlib import Path

# Global process reference for cleanup
nextjs_process = None

def signal_handler(sig, frame):
    """Handle Ctrl+C gracefully"""
    print("\n🛑 Shutting down servers...")
    if nextjs_process:
        nextjs_process.terminate()
    sys.exit(0)

def run_nextjs():
    """Start Next.js development server"""
    global nextjs_process
    print("⚛️ Starting Next.js server...")
    frontend_dir = Path(__file__).parent.parent / "Frontend"
    
    # Install dependencies if needed
    if not (frontend_dir / "node_modules").exists():
        print("📦 Installing Next.js dependencies...")
        subprocess.run(["npm", "install"], cwd=frontend_dir, shell=True)
    
    # Start Next.js
    nextjs_process = subprocess.Popen(
        ["npm", "run", "dev"], 
        cwd=frontend_dir,
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

def run_django():
    """Start Django development server"""
    print("🚀 Starting Django server...")
    os.chdir(Path(__file__).parent)
    subprocess.run([sys.executable, "manage.py", "runserver", "0.0.0.0:8000"])

if __name__ == "__main__":
    # Set up signal handler
    signal.signal(signal.SIGINT, signal_handler)
    
    print("🎯 Starting Ardex development servers...")
    print("📝 Django will be available at: http://localhost:8000")
    print("⚛️ Next.js will be available at: http://localhost:3000")
    print("🌐 Frontend will be proxied through Django at: http://localhost:8000")
    print("🔧 Admin panel: http://localhost:8000/admin")
    print("📡 API endpoints: http://localhost:8000/api/")
    print("\n" + "="*60)
    
    # Start Next.js in background thread
    nextjs_thread = threading.Thread(target=run_nextjs, daemon=True)
    nextjs_thread.start()
    
    # Wait a bit for Next.js to start
    print("⏳ Waiting for Next.js to start...")
    time.sleep(5)
    
    # Start Django (main thread)
    try:
        run_django()
    except KeyboardInterrupt:
        signal_handler(None, None)
