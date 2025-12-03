// В продакшене используем относительные пути (пустая строка)
// В разработке используем полный URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL !== undefined 
  ? process.env.NEXT_PUBLIC_API_URL 
  : (typeof window !== 'undefined' ? '' : 'http://localhost:8000');

export interface ServiceSubcategory {
  id: number;
  title: string;
  description: string;
  slug: string;
  order: number;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  image?: string;
  slug: string;
  order: number;
  subcategory?: ServiceSubcategory;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  order: number;
}

export interface CompanyContact {
  id: number;
  company_name?: string; // resolved per language
  email?: string;
  phone?: string;
  address?: string; // resolved per language
  telegram?: string;
}

export interface WhyUsItem {
  id: number;
  title: string;
  description: string;
  icon: string;
  order: number;
  is_active: boolean;
}

export interface PageSeo {
  slug: string;
  title: string;
  description: string;
  seo_title: string;
  meta_description: string;
  telegram_url?: string;
  linkedin_url?: string;
  facebook_url?: string;
  instagram_url?: string;
}

export interface OrderData {
  name: string;
  email?: string;
  phone?: string;
  message: string;
}

export interface WorkStep {
  id: number;
  title: string;
  description: string;
  image?: string;
  order: number;
  is_active: boolean;
}

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // Helper to normalize paginated or array responses
  private normalizeList<T>(data: any): T[] {
    if (Array.isArray(data)) return data as T[];
    if (data && Array.isArray(data.results)) return data.results as T[];
    return [];
  }

  private async request<T>(endpoint: string, language?: string): Promise<T> {
    try {
      let url = `${this.baseUrl}${endpoint}`;
      if (language) {
        const separator = endpoint.includes('?') ? '&' : '?';
        url += `${separator}lang=${language}`;
      }
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  private async postRequest<T>(endpoint: string, data: any): Promise<T> {
    try {
      // Очищаем пустые строки для необязательных полей
      const cleanedData = { ...data };
      if (cleanedData.email === '') {
        cleanedData.email = null;
      }
      if (cleanedData.phone === '') {
        cleanedData.phone = null;
      }
      
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanedData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, errors: ${JSON.stringify(errorData)}`);
      }
      
      return await response.json();
    } catch (error) {
      throw error;
    }
  }

  // Services API
  async getServices(language?: string): Promise<Service[]> {
    try {
      const data = await this.request<any>('/api/services/', language);
      return this.normalizeList<Service>(data);
    } catch (error) {
      console.error('Failed to fetch services:', error);
      // Return fallback data
      return [
        {
          id: 1,
          title: 'Стратегический консалтинг',
          description: 'Разработка долгосрочных стратегий развития бизнеса',
          slug: 'strategic-consulting',
          order: 1
        },
        {
          id: 2,
          title: 'Техническое проектирование',
          description: 'Полный цикл инжиниринга от концепции до реализации',
          slug: 'technical-design',
          order: 2
        }
      ];
    }
  }

  async getServicesPaged(page: number = 1, language?: string): Promise<PaginatedResponse<Service>> {
    try {
      const data = await this.request<any>(`/api/services/?page=${page}`, language);
      if (Array.isArray(data)) {
        return { count: data.length, next: null, previous: null, results: data };
      }
      return data as PaginatedResponse<Service>;
    } catch (error) {
      console.error('Failed to fetch services (paged):', error);
      return { count: 0, next: null, previous: null, results: [] };
    }
  }

  async getService(slug: string, language?: string): Promise<Service | null> {
    try {
      return await this.request<Service>(`/api/services/${slug}/`, language);
    } catch (error) {
      console.error(`Failed to fetch service ${slug}:`, error);
      return null;
    }
  }

  // Work plan API
  async getWorkPlan(language?: string): Promise<WorkStep[]> {
    try {
      const data = await this.request<any>('/api/workplan/', language);
      return this.normalizeList<WorkStep>(data);
    } catch (error) {
      console.error('Failed to fetch work plan:', error);
      return [];
    }
  }

  // FAQ API
  async getFAQ(language?: string): Promise<FAQ[]> {
    try {
      const data = await this.request<any>('/api/faq/', language);
      return this.normalizeList<FAQ>(data);
    } catch (error) {
      console.error('Failed to fetch FAQ:', error);
      // Return fallback data
      return [
        {
          id: 1,
          question: 'Сколько времени занимает реализация проекта?',
          answer: 'Сроки зависят от сложности проекта. Обычно небольшие проекты занимают 2-3 месяца.',
          order: 1
        },
        {
          id: 2,
          question: 'Предоставляете ли вы гарантию на свои услуги?',
          answer: 'Да, мы предоставляем гарантию на все наши услуги.',
          order: 2
        }
      ];
    }
  }

  // Contacts API
  async getContacts(language: string = 'ru'): Promise<CompanyContact | null> {
    try {
      console.log('Fetching contacts from API...');
      const data = await this.request<any>(`/api/contacts/?lang=${language}`);
      const contacts = this.normalizeList<any>(data);
      console.log('Contacts response:', data);
      if (contacts.length === 0) return null;
      const raw = contacts[0];
      const mapped: CompanyContact = {
        id: raw.id,
        company_name: raw.company_name, // API уже возвращает правильную версию
        email: raw.email || undefined,
        phone: raw.phone || undefined,
        address: raw.address, // API уже возвращает правильную версию
        telegram: raw.telegram || undefined,
      };
      return mapped;
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      // Return fallback data
      return {
        id: 1,
        company_name: 'ARDEX',
        email: 'info@ardex.uz',
        phone: '+998 90 123 45 67',
        address: 'г. Ташкент, ул. Навои, 15, Узбекистан',
        telegram: '@ardex_uz'
      };
    }
  }

  async sendOrder(data: OrderData): Promise<{ ok: boolean; sent: boolean }> {
    try {
      return await this.postRequest<{ ok: boolean; sent: boolean }>('/api/contacts/send/', data);
    } catch (error) {
      console.error('Failed to send order:', error);
      return { ok: false, sent: false };
    }
  }

  // WhyUs API
  async getWhyUsItems(language: string = 'ru'): Promise<WhyUsItem[]> {
    try {
      const data = await this.request<any>(`/api/whyus/?lang=${language}`);
      return this.normalizeList<WhyUsItem>(data);
    } catch (error) {
      console.error('Failed to fetch WhyUs items:', error);
      // Return fallback data
      return [
        {
          id: 1,
          title: 'Опыт 15+ лет',
          description: 'Реализовали более 200 успешных проектов в различных отраслях',
          icon: 'Award',
          order: 1,
          is_active: true
        },
        {
          id: 2,
          title: 'Команда экспертов',
          description: 'Сертифицированные специалисты с международным опытом работы',
          icon: 'Users',
          order: 2,
          is_active: true
        },
        {
          id: 3,
          title: 'Гарантия качества',
          description: 'Полное сопровождение проектов от концепции до внедрения',
          icon: 'Shield',
          order: 3,
          is_active: true
        }
      ];
    }
  }

  // Pages SEO API
  async getPageSeo(slug: string, language: string = 'ru'): Promise<PageSeo | null> {
    try {
      const data = await this.request<PageSeo | null>(`/api/pages/${slug}/?lang=${language}`);
      // Если API вернул null или пустой ответ, возвращаем null без ошибки
      return data || null;
    } catch (error) {
      // Тихая обработка - не логируем ошибку, просто возвращаем null
      return null;
    }
  }
}

export const apiClient = new ApiClient();
