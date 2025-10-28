import requests
import json

def test_api():
    base_url = "http://localhost:8000"
    
    endpoints = [
        "/api/services/",
        "/api/cases/",
        "/api/pricing/",
        "/api/faq/",
        "/api/contacts/",
        "/api/whyus/"
    ]
    
    print("Testing API endpoints...")
    
    for endpoint in endpoints:
        try:
            url = f"{base_url}{endpoint}"
            print(f"\nTesting: {url}")
            
            response = requests.get(url, timeout=5)
            print(f"Status: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                print(f"Response: {json.dumps(data, indent=2, ensure_ascii=False)[:200]}...")
            else:
                print(f"Error: {response.text}")
                
        except requests.exceptions.RequestException as e:
            print(f"Request failed: {e}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == "__main__":
    test_api()

