import express, { Request, Response, NextFunction } from 'express';
import { registerRoutes } from './routes';
import { setupVite, serveStatic, log } from './vite';
import http from 'http';

/**
 * Server configuration and initialization
 */
class Server {
  private app: express.Application;
  private port: number;
  private server: http.Server;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3004', 10);
    this.configureMiddlewares();
  }

  /**
   * Configure base middlewares and request logging
   */
  private configureMiddlewares(): void {
    // Request parsing middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    // Request logging middleware
    this.app.use(this.loggerMiddleware);
  }

  /**
   * Middleware for request logging
   */
  private loggerMiddleware(req: Request, res: Response, next: NextFunction): void {
    const start = Date.now();
    const { method, path } = req;
    
    res.on('finish', () => {
      const duration = Date.now() - start;
      const statusCode = res.statusCode;
      const statusText = statusCode >= 400 ? '❌' : '✅';
      log(`${statusText} ${method} ${path} - ${statusCode} [${duration}ms]`);
    });
    
    next();
  }

  /**
   * Configure error handling middleware
   */
  private setupErrorHandler(): void {
    this.app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      const isDevelopment = process.env.NODE_ENV === 'development';
      const statusCode = err.status || 500;
      
      log(`❌ Error: ${err.message} (${statusCode})`);
      
      res.status(statusCode).json({
        error: {
          message: err.message || 'Internal Server Error',
          ...(isDevelopment && { stack: err.stack })
        }
      });
    });
  }

  /**
   * Setup static file serving based on environment
   */
  private async setupStaticServing(): Promise<void> {
    if (process.env.NODE_ENV === 'development') {
      await setupVite(this.app, this.server);
      log('⚡ Vite Dev Server attached');
    } else {
      serveStatic(this.app);
      log('📦 Serving static files');
    }
  }

  /**
   * Handle server startup errors
   */
  private handleServerErrors(): void {
    this.server.on('error', (err: NodeJS.ErrnoException) => {
      if (err.code === 'EADDRINUSE') {
        log(`⚠️ Port ${this.port} is already in use`);
        log('💡 Try:');
        log(`1. Change PORT (currently ${this.port})`);
        log(`2. Run: "kill -9 $(lsof -t -i:${this.port})"`);
        log('3. Wait 1 minute for port to release');
      } else {
        log(`‼️ Critical server error: ${err.message}`);
      }
      
      process.exit(1);
    });
  }

  /**
   * Start the server and initialize all components
   */
  public async start(): Promise<void> {
    try {
      // Register API routes
      this.server = await registerRoutes(this.app);
      
      // Setup error handling
      this.setupErrorHandler();
      
      // Configure static file serving
      await this.setupStaticServing();
      
      // Configure error handling for the server
      this.handleServerErrors();
      
      // Start listening for requests
      this.server.listen(this.port, '0.0.0.0', () => {
        log('');
        log('🚀 Server started successfully');
        log(`🔗 URL: http://localhost:${this.port}`);
        log(`⚙️ Environment: ${process.env.NODE_ENV || 'development'}`);
        log('');
      });
    } catch (error) {
      log('🔥 Failed to start server:');
      console.error(error);
      process.exit(1);
    }
  }
}

// Initialize and start the server
const server = new Server();
server.start().catch(error => {
  log('💥 Unhandled error during server initialization:');
  console.error(error);
  process.exit(1);
});