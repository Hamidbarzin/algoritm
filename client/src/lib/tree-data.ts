interface TreeItem {
  name: string;
  type: 'folder' | 'file';
  description?: string;
  section?: string;
  children?: TreeItem[];
  content?: string;
}

export const backendTree: TreeItem[] = [
  {
    name: 'backend',
    type: 'folder',
    description: 'کامپوننت‌های سمت سرور',
    section: 'backend',
    children: [
      {
        name: 'controllers',
        type: 'folder',
        description: 'کنترلرهای API',
        section: 'backend',
        children: [
          {
            name: 'AuthController.js',
            type: 'file',
            description: 'کنترلر احراز هویت',
            section: 'backend',
            content: `// AuthController.js

export class AuthController {
  constructor(authService, userRepository) {
    this.authService = authService;
    this.userRepository = userRepository;
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const authResult = await this.authService.authenticate(username, password);
      
      if (authResult.success) {
        res.status(200).json({
          token: authResult.token,
          user: authResult.user
        });
      } else {
        res.status(401).json({ message: 'نام کاربری یا رمز عبور اشتباه است' });
      }
    } catch (error) {
      console.error('خطا در لاگین:', error);
      res.status(500).json({ message: 'خطای سرور در فرایند احراز هویت' });
    }
  }

  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      
      // بررسی وجود کاربر قبلی
      const existingUser = await this.userRepository.findByUsernameOrEmail(username, email);
      if (existingUser) {
        return res.status(409).json({ message: 'این نام کاربری یا ایمیل قبلاً ثبت شده است' });
      }
      
      // ثبت کاربر جدید
      const newUser = await this.authService.registerUser(username, email, password);
      
      res.status(201).json({
        message: 'ثبت نام با موفقیت انجام شد',
        userId: newUser.id
      });
    } catch (error) {
      console.error('خطا در ثبت نام:', error);
      res.status(500).json({ message: 'خطای سرور در فرایند ثبت نام' });
    }
  }
}`
          },
          {
            name: 'TradeController.js',
            type: 'file',
            description: 'کنترلر معاملات',
            section: 'backend',
            content: `// TradeController.js

export class TradeController {
  constructor(tradeService, marketDataService) {
    this.tradeService = tradeService;
    this.marketDataService = marketDataService;
  }

  async placeBuyOrder(req, res) {
    try {
      const { userId, symbol, amount, price, orderType } = req.body;
      
      // بررسی قیمت فعلی بازار
      const currentMarketData = await this.marketDataService.getCurrentPrice(symbol);
      
      // ایجاد سفارش خرید
      const orderResult = await this.tradeService.createBuyOrder({
        userId,
        symbol,
        amount,
        price: orderType === 'market' ? currentMarketData.price : price,
        orderType,
        timestamp: new Date()
      });
      
      res.status(201).json({
        message: 'سفارش خرید با موفقیت ثبت شد',
        order: orderResult
      });
    } catch (error) {
      console.error('خطا در ثبت سفارش خرید:', error);
      res.status(500).json({ message: 'خطای سرور در ثبت سفارش خرید' });
    }
  }

  async placeSellOrder(req, res) {
    try {
      const { userId, symbol, amount, price, orderType } = req.body;
      
      // بررسی موجودی کاربر
      const userBalance = await this.tradeService.getUserBalance(userId, symbol);
      if (userBalance < amount) {
        return res.status(400).json({ message: 'موجودی ناکافی برای انجام معامله' });
      }
      
      // بررسی قیمت فعلی بازار
      const currentMarketData = await this.marketDataService.getCurrentPrice(symbol);
      
      // ایجاد سفارش فروش
      const orderResult = await this.tradeService.createSellOrder({
        userId,
        symbol,
        amount,
        price: orderType === 'market' ? currentMarketData.price : price,
        orderType,
        timestamp: new Date()
      });
      
      res.status(201).json({
        message: 'سفارش فروش با موفقیت ثبت شد',
        order: orderResult
      });
    } catch (error) {
      console.error('خطا در ثبت سفارش فروش:', error);
      res.status(500).json({ message: 'خطای سرور در ثبت سفارش فروش' });
    }
  }
}`
          },
          {
            name: 'MarketController.js',
            type: 'file',
            description: 'کنترلر اطلاعات بازار',
            section: 'backend'
          }
        ]
      },
      {
        name: 'services',
        type: 'folder',
        description: 'سرویس‌های بیزنس لاجیک',
        section: 'backend',
        children: [
          {
            name: 'AuthService.js',
            type: 'file',
            description: 'سرویس احراز هویت',
            section: 'backend'
          },
          {
            name: 'TradeService.js',
            type: 'file',
            description: 'سرویس معاملات',
            section: 'backend'
          },
          {
            name: 'MarketDataService.js',
            type: 'file',
            description: 'سرویس اطلاعات بازار',
            section: 'backend'
          }
        ]
      },
      {
        name: 'repositories',
        type: 'folder',
        description: 'دسترسی به پایگاه داده',
        section: 'backend',
        children: [
          {
            name: 'UserRepository.js',
            type: 'file',
            description: 'مدیریت داده‌های کاربران',
            section: 'backend'
          },
          {
            name: 'OrderRepository.js',
            type: 'file',
            description: 'مدیریت داده‌های سفارشات',
            section: 'backend'
          },
          {
            name: 'TransactionRepository.js',
            type: 'file',
            description: 'مدیریت داده‌های تراکنش‌ها',
            section: 'backend'
          }
        ]
      },
      {
        name: 'models',
        type: 'folder',
        description: 'مدل‌های داده',
        section: 'backend',
        children: [
          {
            name: 'User.js',
            type: 'file',
            description: 'مدل کاربر',
            section: 'backend'
          },
          {
            name: 'Order.js',
            type: 'file',
            description: 'مدل سفارش',
            section: 'backend'
          },
          {
            name: 'Transaction.js',
            type: 'file',
            description: 'مدل تراکنش',
            section: 'backend'
          }
        ]
      },
      {
        name: 'routes',
        type: 'folder',
        description: 'مسیرهای API',
        section: 'backend',
        children: [
          {
            name: 'auth.js',
            type: 'file',
            description: 'مسیرهای احراز هویت',
            section: 'backend'
          },
          {
            name: 'trade.js',
            type: 'file',
            description: 'مسیرهای معاملات',
            section: 'backend'
          },
          {
            name: 'market.js',
            type: 'file',
            description: 'مسیرهای اطلاعات بازار',
            section: 'backend'
          }
        ]
      },
      {
        name: 'middleware',
        type: 'folder',
        description: 'میان‌افزارها',
        section: 'backend',
        children: [
          {
            name: 'auth.js',
            type: 'file',
            description: 'میان‌افزار احراز هویت',
            section: 'backend'
          },
          {
            name: 'errorHandler.js',
            type: 'file',
            description: 'میان‌افزار مدیریت خطاها',
            section: 'backend'
          },
          {
            name: 'logger.js',
            type: 'file',
            description: 'میان‌افزار ثبت رویدادها',
            section: 'backend'
          }
        ]
      },
      {
        name: 'config',
        type: 'folder',
        description: 'تنظیمات پروژه',
        section: 'backend',
        children: [
          {
            name: 'database.js',
            type: 'file',
            description: 'تنظیمات پایگاه داده',
            section: 'backend'
          },
          {
            name: 'server.js',
            type: 'file',
            description: 'تنظیمات سرور',
            section: 'backend'
          },
          {
            name: 'auth.js',
            type: 'file',
            description: 'تنظیمات احراز هویت',
            section: 'backend'
          }
        ]
      },
      {
        name: 'app.js',
        type: 'file',
        description: 'فایل اصلی برنامه',
        section: 'backend'
      },
      {
        name: 'server.js',
        type: 'file',
        description: 'راه‌اندازی سرور',
        section: 'backend'
      }
    ]
  }
];

export const frontendTree: TreeItem[] = [
  {
    name: 'frontend',
    type: 'folder',
    description: 'کامپوننت‌های سمت کاربر',
    section: 'frontend',
    children: [
      {
        name: 'src',
        type: 'folder',
        description: 'کد منبع فرانت‌اند',
        section: 'frontend',
        children: [
          {
            name: 'components',
            type: 'folder',
            description: 'کامپوننت‌های React',
            section: 'frontend',
            children: [
              {
                name: 'Dashboard',
                type: 'folder',
                description: 'کامپوننت‌های داشبورد',
                section: 'frontend',
                children: [
                  {
                    name: 'MarketOverview.tsx',
                    type: 'file',
                    description: 'نمای کلی بازار',
                    section: 'frontend',
                    content: `// MarketOverview.tsx
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { CryptoPrice } from '../common/CryptoPrice';
import { MarketTrends } from './MarketTrends';
import { useMarketData } from '../../hooks/useMarketData';

interface MarketData {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

export const MarketOverview: React.FC = () => {
  const { data, isLoading, error } = useMarketData();
  const [topGainers, setTopGainers] = useState<MarketData[]>([]);
  const [topLosers, setTopLosers] = useState<MarketData[]>([]);

  useEffect(() => {
    if (data) {
      // ترتیب‌بندی داده‌ها برای یافتن بیشترین سود و ضرر
      const sorted = [...data].sort((a, b) => b.change24h - a.change24h);
      setTopGainers(sorted.slice(0, 5));
      setTopLosers(sorted.slice(-5).reverse());
    }
  }, [data]);

  if (isLoading) {
    return <div className="loading-spinner">در حال بارگذاری...</div>;
  }

  if (error) {
    return <div className="error-message">خطا در دریافت اطلاعات بازار</div>;
  }

  return (
    <div className="market-overview">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">نمای کلی بازار</h2>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-green-600 mb-2">بیشترین رشد 24 ساعته</h3>
              <div className="space-y-2">
                {topGainers.map((coin) => (
                  <CryptoPrice
                    key={coin.symbol}
                    symbol={coin.symbol}
                    name={coin.name}
                    price={coin.price}
                    change={coin.change24h}
                  />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-600 mb-2">بیشترین کاهش 24 ساعته</h3>
              <div className="space-y-2">
                {topLosers.map((coin) => (
                  <CryptoPrice
                    key={coin.symbol}
                    symbol={coin.symbol}
                    name={coin.name}
                    price={coin.price}
                    change={coin.change24h}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">روند بازار</h3>
            <MarketTrends />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};`
                  },
                  {
                    name: 'Portfolio.tsx',
                    type: 'file',
                    description: 'مدیریت پورتفولیو',
                    section: 'frontend'
                  },
                  {
                    name: 'TradingView.tsx',
                    type: 'file',
                    description: 'نمای معاملات',
                    section: 'frontend'
                  }
                ]
              },
              {
                name: 'Chart',
                type: 'folder',
                description: 'کامپوننت‌های نمودار',
                section: 'frontend',
                children: [
                  {
                    name: 'PriceChart.tsx',
                    type: 'file',
                    description: 'نمودار قیمت',
                    section: 'frontend'
                  },
                  {
                    name: 'VolumeChart.tsx',
                    type: 'file',
                    description: 'نمودار حجم معاملات',
                    section: 'frontend'
                  },
                  {
                    name: 'TechnicalIndicators.tsx',
                    type: 'file',
                    description: 'اندیکاتورهای تکنیکال',
                    section: 'frontend'
                  }
                ]
              },
              {
                name: 'Trade',
                type: 'folder',
                description: 'کامپوننت‌های معاملات',
                section: 'frontend',
                children: [
                  {
                    name: 'OrderForm.tsx',
                    type: 'file',
                    description: 'فرم ثبت سفارش',
                    section: 'frontend'
                  },
                  {
                    name: 'OrderBook.tsx',
                    type: 'file',
                    description: 'دفترچه سفارشات',
                    section: 'frontend'
                  },
                  {
                    name: 'TradeHistory.tsx',
                    type: 'file',
                    description: 'تاریخچه معاملات',
                    section: 'frontend'
                  }
                ]
              },
              {
                name: 'Auth',
                type: 'folder',
                description: 'کامپوننت‌های احراز هویت',
                section: 'frontend',
                children: [
                  {
                    name: 'Login.tsx',
                    type: 'file',
                    description: 'ورود کاربران',
                    section: 'frontend'
                  },
                  {
                    name: 'Register.tsx',
                    type: 'file',
                    description: 'ثبت نام کاربران',
                    section: 'frontend'
                  },
                  {
                    name: 'Profile.tsx',
                    type: 'file',
                    description: 'پروفایل کاربر',
                    section: 'frontend'
                  }
                ]
              },
              {
                name: 'Layout',
                type: 'folder',
                description: 'کامپوننت‌های لایه',
                section: 'frontend',
                children: [
                  {
                    name: 'Header.tsx',
                    type: 'file',
                    description: 'هدر سایت',
                    section: 'frontend'
                  },
                  {
                    name: 'Sidebar.tsx',
                    type: 'file',
                    description: 'نوار کناری',
                    section: 'frontend'
                  },
                  {
                    name: 'Footer.tsx',
                    type: 'file',
                    description: 'فوتر سایت',
                    section: 'frontend'
                  }
                ]
              }
            ]
          },
          {
            name: 'hooks',
            type: 'folder',
            description: 'هوک‌های سفارشی',
            section: 'frontend',
            children: [
              {
                name: 'useAuth.ts',
                type: 'file',
                description: 'مدیریت احراز هویت',
                section: 'frontend'
              },
              {
                name: 'useMarketData.ts',
                type: 'file',
                description: 'دریافت داده‌های بازار',
                section: 'frontend'
              },
              {
                name: 'useTrading.ts',
                type: 'file',
                description: 'مدیریت معاملات',
                section: 'frontend'
              }
            ]
          },
          {
            name: 'services',
            type: 'folder',
            description: 'سرویس‌های ارتباط با API',
            section: 'frontend',
            children: [
              {
                name: 'api.ts',
                type: 'file',
                description: 'تنظیمات پایه API',
                section: 'frontend'
              },
              {
                name: 'authService.ts',
                type: 'file',
                description: 'سرویس احراز هویت',
                section: 'frontend'
              },
              {
                name: 'marketService.ts',
                type: 'file',
                description: 'سرویس داده‌های بازار',
                section: 'frontend'
              },
              {
                name: 'tradeService.ts',
                type: 'file',
                description: 'سرویس معاملات',
                section: 'frontend'
              }
            ]
          },
          {
            name: 'store',
            type: 'folder',
            description: 'مدیریت state برنامه',
            section: 'frontend',
            children: [
              {
                name: 'slices',
                type: 'folder',
                description: 'slices ریداکس',
                section: 'frontend',
                children: [
                  {
                    name: 'authSlice.ts',
                    type: 'file',
                    description: 'مدیریت state احراز هویت',
                    section: 'frontend'
                  },
                  {
                    name: 'marketSlice.ts',
                    type: 'file',
                    description: 'مدیریت state بازار',
                    section: 'frontend'
                  },
                  {
                    name: 'tradeSlice.ts',
                    type: 'file',
                    description: 'مدیریت state معاملات',
                    section: 'frontend'
                  }
                ]
              },
              {
                name: 'index.ts',
                type: 'file',
                description: 'پیکربندی store',
                section: 'frontend'
              }
            ]
          },
          {
            name: 'utils',
            type: 'folder',
            description: 'توابع کمکی',
            section: 'frontend',
            children: [
              {
                name: 'formatters.ts',
                type: 'file',
                description: 'فرمت‌دهی داده‌ها',
                section: 'frontend'
              },
              {
                name: 'validators.ts',
                type: 'file',
                description: 'اعتبارسنجی داده‌ها',
                section: 'frontend'
              },
              {
                name: 'helpers.ts',
                type: 'file',
                description: 'توابع کمکی عمومی',
                section: 'frontend'
              }
            ]
          },
          {
            name: 'pages',
            type: 'folder',
            description: 'صفحات اصلی',
            section: 'frontend',
            children: [
              {
                name: 'Home.tsx',
                type: 'file',
                description: 'صفحه اصلی',
                section: 'frontend'
              },
              {
                name: 'Dashboard.tsx',
                type: 'file',
                description: 'داشبورد کاربر',
                section: 'frontend'
              },
              {
                name: 'Market.tsx',
                type: 'file',
                description: 'صفحه بازار',
                section: 'frontend'
              },
              {
                name: 'Trade.tsx',
                type: 'file',
                description: 'صفحه معاملات',
                section: 'frontend'
              },
              {
                name: 'Wallet.tsx',
                type: 'file',
                description: 'کیف پول',
                section: 'frontend'
              }
            ]
          },
          {
            name: 'assets',
            type: 'folder',
            description: 'فایل‌های استاتیک',
            section: 'frontend',
            children: [
              {
                name: 'images',
                type: 'folder',
                description: 'تصاویر',
                section: 'frontend'
              },
              {
                name: 'icons',
                type: 'folder',
                description: 'آیکون‌ها',
                section: 'frontend'
              },
              {
                name: 'styles',
                type: 'folder',
                description: 'استایل‌ها',
                section: 'frontend'
              }
            ]
          },
          {
            name: 'App.tsx',
            type: 'file',
            description: 'کامپوننت اصلی برنامه',
            section: 'frontend'
          },
          {
            name: 'index.tsx',
            type: 'file',
            description: 'نقطه ورود برنامه',
            section: 'frontend'
          }
        ]
      },
      {
        name: 'public',
        type: 'folder',
        description: 'فایل‌های عمومی',
        section: 'frontend',
        children: [
          {
            name: 'index.html',
            type: 'file',
            description: 'HTML اصلی',
            section: 'frontend'
          },
          {
            name: 'favicon.ico',
            type: 'file',
            description: 'آیکون سایت',
            section: 'frontend'
          },
          {
            name: 'manifest.json',
            type: 'file',
            description: 'منیفست PWA',
            section: 'frontend'
          }
        ]
      },
      {
        name: 'config',
        type: 'folder',
        description: 'تنظیمات فرانت‌اند',
        section: 'frontend',
        children: [
          {
            name: 'webpack.config.js',
            type: 'file',
            description: 'تنظیمات وب‌پک',
            section: 'frontend'
          },
          {
            name: 'jest.config.js',
            type: 'file',
            description: 'تنظیمات تست',
            section: 'frontend'
          },
          {
            name: 'tsconfig.json',
            type: 'file',
            description: 'تنظیمات TypeScript',
            section: 'frontend'
          }
        ]
      },
      {
        name: 'package.json',
        type: 'file',
        description: 'تنظیمات و وابستگی‌ها',
        section: 'frontend'
      },
      {
        name: 'README.md',
        type: 'file',
        description: 'راهنمای پروژه',
        section: 'frontend'
      }
    ]
  }
];

export const aiTree: TreeItem[] = [
  {
    name: 'ai',
    type: 'folder',
    description: 'سرویس‌های هوش مصنوعی',
    section: 'ai',
    children: [
      {
        name: 'models',
        type: 'folder',
        description: 'مدل‌های یادگیری ماشین',
        section: 'ai',
        children: [
          {
            name: 'price_prediction',
            type: 'folder',
            description: 'پیش‌بینی قیمت',
            section: 'ai',
            children: [
              {
                name: 'lstm_model.py',
                type: 'file',
                description: 'مدل LSTM برای پیش‌بینی قیمت',
                section: 'ai',
                content: `# lstm_model.py

import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping

class LSTMPricePredictor:
    def __init__(self, sequence_length=60):
        self.sequence_length = sequence_length
        self.model = None
        self.scaler = MinMaxScaler(feature_range=(0, 1))
        
    def preprocess_data(self, price_data):
        """قیمت‌های خام را پیش‌پردازش کرده و به سکانس‌های مناسب برای LSTM تبدیل می‌کند"""
        # نرمال‌سازی داده‌ها
        scaled_data = self.scaler.fit_transform(price_data.reshape(-1, 1))
        
        x_train = []
        y_train = []
        
        # ایجاد سکانس‌های داده
        for i in range(self.sequence_length, len(scaled_data)):
            x_train.append(scaled_data[i-self.sequence_length:i, 0])
            y_train.append(scaled_data[i, 0])
            
        # تبدیل به آرایه‌های نامپای
        x_train, y_train = np.array(x_train), np.array(y_train)
        
        # تغییر شکل برای LSTM [samples, time steps, features]
        x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))
        
        return x_train, y_train
    
    def build_model(self, input_shape):
        """ایجاد معماری مدل LSTM"""
        model = Sequential()
        
        # لایه اول LSTM با برگشت سکانس
        model.add(LSTM(units=50, return_sequences=True, input_shape=input_shape))
        model.add(Dropout(0.2))
        
        # لایه دوم LSTM
        model.add(LSTM(units=50, return_sequences=False))
        model.add(Dropout(0.2))
        
        # لایه‌های متراکم
        model.add(Dense(units=25))
        model.add(Dense(units=1))
        
        # کامپایل مدل
        model.compile(optimizer='adam', loss='mean_squared_error')
        
        self.model = model
        return model
    
    def train(self, price_data, epochs=50, batch_size=32, validation_split=0.2):
        """آموزش مدل با داده‌های قیمت"""
        # پیش‌پردازش داده‌ها
        x_train, y_train = self.preprocess_data(price_data)
        
        # ساخت مدل اگر قبلاً ساخته نشده است
        if self.model is None:
            self.build_model((x_train.shape[1], 1))
        
        # تنظیم توقف زودهنگام برای جلوگیری از overfitting
        early_stopping = EarlyStopping(
            monitor='val_loss', 
            patience=10, 
            restore_best_weights=True
        )
        
        # آموزش مدل
        history = self.model.fit(
            x_train, y_train,
            epochs=epochs,
            batch_size=batch_size,
            validation_split=validation_split,
            callbacks=[early_stopping],
            verbose=1
        )
        
        return history
    
    def predict(self, input_data):
        """پیش‌بینی قیمت‌های آینده"""
        # اطمینان از ابعاد مناسب ورودی
        if len(input_data) < self.sequence_length:
            raise ValueError(f"داده‌های ورودی باید حداقل {self.sequence_length} نقطه داشته باشند")
        
        # استفاده از آخرین sequence_length نقطه داده
        latest_data = input_data[-self.sequence_length:]
        
        # نرمال‌سازی داده‌ها
        scaled_data = self.scaler.transform(latest_data.reshape(-1, 1))
        
        # ایجاد نمونه پیش‌بینی
        x_test = np.array([scaled_data[:, 0]])
        x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
        
        # پیش‌بینی
        predicted_price = self.model.predict(x_test)
        
        # برگرداندن به مقیاس اصلی
        predicted_price = self.scaler.inverse_transform(predicted_price)
        
        return predicted_price[0, 0]
    
    def predict_next_n_days(self, input_data, n_days):
        """پیش‌بینی n روز آینده به صورت پیوسته"""
        predictions = []
        curr_sequence = input_data[-self.sequence_length:].copy()
        
        for _ in range(n_days):
            # پیش‌بینی روز بعدی
            next_pred = self.predict(curr_sequence)
            predictions.append(next_pred)
            
            # به‌روزرسانی سکانس برای پیش‌بینی بعدی
            curr_sequence = np.append(curr_sequence[1:], next_pred)
            
        return np.array(predictions)`
              },
              {
                name: 'transformer_model.py',
                type: 'file',
                description: 'مدل Transformer برای پیش‌بینی قیمت',
                section: 'ai'
              },
              {
                name: 'ensemble_model.py',
                type: 'file',
                description: 'مدل ترکیبی برای پیش‌بینی دقیق‌تر',
                section: 'ai'
              }
            ]
          },
          {
            name: 'sentiment_analysis',
            type: 'folder',
            description: 'تحلیل احساسات',
            section: 'ai',
            children: [
              {
                name: 'bert_sentiment.py',
                type: 'file',
                description: 'مدل BERT برای تحلیل احساسات',
                section: 'ai'
              },
              {
                name: 'news_classifier.py',
                type: 'file',
                description: 'طبقه‌بندی اخبار',
                section: 'ai'
              },
              {
                name: 'social_media_analyzer.py',
                type: 'file',
                description: 'تحلیل پست‌های شبکه‌های اجتماعی',
                section: 'ai'
              }
            ]
          },
          {
            name: 'technical_analysis',
            type: 'folder',
            description: 'تحلیل تکنیکال خودکار',
            section: 'ai',
            children: [
              {
                name: 'pattern_recognition.py',
                type: 'file',
                description: 'تشخیص الگوهای نموداری',
                section: 'ai'
              },
              {
                name: 'indicator_analyzer.py',
                type: 'file',
                description: 'تحلیل اندیکاتورهای تکنیکال',
                section: 'ai'
              },
              {
                name: 'support_resistance.py',
                type: 'file',
                description: 'محاسبه سطوح حمایت و مقاومت',
                section: 'ai'
              }
            ]
          }
        ]
      },
      {
        name: 'services',
        type: 'folder',
        description: 'سرویس‌های هوش مصنوعی',
        section: 'ai',
        children: [
          {
            name: 'prediction_service.py',
            type: 'file',
            description: 'سرویس پیش‌بینی قیمت',
            section: 'ai'
          },
          {
            name: 'sentiment_service.py',
            type: 'file',
            description: 'سرویس تحلیل احساسات',
            section: 'ai'
          },
          {
            name: 'technical_service.py',
            type: 'file',
            description: 'سرویس تحلیل تکنیکال',
            section: 'ai'
          },
          {
            name: 'recommendation_service.py',
            type: 'file',
            description: 'سرویس توصیه معاملات',
            section: 'ai'
          }
        ]
      },
      {
        name: 'data',
        type: 'folder',
        description: 'مدیریت داده‌ها',
        section: 'ai',
        children: [
          {
            name: 'data_collectors',
            type: 'folder',
            description: 'جمع‌آوری داده‌ها',
            section: 'ai',
            children: [
              {
                name: 'market_data_collector.py',
                type: 'file',
                description: 'جمع‌آوری داده‌های بازار',
                section: 'ai'
              },
              {
                name: 'news_collector.py',
                type: 'file',
                description: 'جمع‌آوری اخبار',
                section: 'ai'
              },
              {
                name: 'social_media_collector.py',
                type: 'file',
                description: 'جمع‌آوری داده‌های شبکه‌های اجتماعی',
                section: 'ai'
              }
            ]
          },
          {
            name: 'data_processors',
            type: 'folder',
            description: 'پردازش داده‌ها',
            section: 'ai',
            children: [
              {
                name: 'market_data_processor.py',
                type: 'file',
                description: 'پردازش داده‌های بازار',
                section: 'ai'
              },
              {
                name: 'text_processor.py',
                type: 'file',
                description: 'پردازش متن',
                section: 'ai'
              },
              {
                name: 'feature_extractor.py',
                type: 'file',
                description: 'استخراج ویژگی‌ها',
                section: 'ai'
              }
            ]
          },
          {
            name: 'data_store.py',
            type: 'file',
            description: 'ذخیره‌سازی داده‌ها',
            section: 'ai'
          },
          {
            name: 'data_loader.py',
            type: 'file',
            description: 'بارگذاری داده‌ها',
            section: 'ai'
          }
        ]
      },
      {
        name: 'api',
        type: 'folder',
        description: 'API هوش مصنوعی',
        section: 'ai',
        children: [
          {
            name: 'prediction_api.py',
            type: 'file',
            description: 'API پیش‌بینی قیمت',
            section: 'ai'
          },
          {
            name: 'sentiment_api.py',
            type: 'file',
            description: 'API تحلیل احساسات',
            section: 'ai'
          },
          {
            name: 'technical_api.py',
            type: 'file',
            description: 'API تحلیل تکنیکال',
            section: 'ai'
          },
          {
            name: 'recommendation_api.py',
            type: 'file',
            description: 'API توصیه معاملات',
            section: 'ai'
          }
        ]
      },
      {
        name: 'utils',
        type: 'folder',
        description: 'ابزارهای کمکی',
        section: 'ai',
        children: [
          {
            name: 'data_utils.py',
            type: 'file',
            description: 'توابع کمکی داده‌ها',
            section: 'ai'
          },
          {
            name: 'model_utils.py',
            type: 'file',
            description: 'توابع کمکی مدل‌ها',
            section: 'ai'
          },
          {
            name: 'evaluation_utils.py',
            type: 'file',
            description: 'توابع ارزیابی',
            section: 'ai'
          }
        ]
      },
      {
        name: 'config',
        type: 'folder',
        description: 'تنظیمات',
        section: 'ai',
        children: [
          {
            name: 'model_config.py',
            type: 'file',
            description: 'تنظیمات مدل‌ها',
            section: 'ai'
          },
          {
            name: 'api_config.py',
            type: 'file',
            description: 'تنظیمات API',
            section: 'ai'
          },
          {
            name: 'data_config.py',
            type: 'file',
            description: 'تنظیمات داده‌ها',
            section: 'ai'
          }
        ]
      },
      {
        name: 'main.py',
        type: 'file',
        description: 'فایل اصلی سرویس هوش مصنوعی',
        section: 'ai'
      },
      {
        name: 'requirements.txt',
        type: 'file',
        description: 'وابستگی‌های پایتون',
        section: 'ai'
      }
    ]
  }
];

export const combinedTree = [...backendTree, ...frontendTree, ...aiTree];